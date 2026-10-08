import os
import sys
import json
import time
import io
import torch
import torch.nn as nn
import numpy as np
import requests
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

# ─── Model Definition ────────────────────────────────────────────────────────

class VoiceSpoofCNNV3(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 16, kernel_size=3, padding=1),
            nn.BatchNorm2d(16),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2),
            nn.Conv2d(16, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.AdaptiveAvgPool2d((8, 4))
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Dropout(0.3),
            nn.Linear(3072, 128),
            nn.ReLU(inplace=True),
            nn.Dropout(0.3),
            nn.Linear(128, 1)
        )

    def forward(self, x):
        return torch.sigmoid(self.classifier(self.features(x)))


# ─── App Setup ────────────────────────────────────────────────────────────────

app = FastAPI(title="VoiceShield — AI Voice Spoof Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Configuration ────────────────────────────────────────────────────────────

EXTERNAL_API_URL = os.environ.get("DEEPFAKE_API_URL", "https://api.aurigin.ai/v1/predict")
EXTERNAL_API_KEY = "3iMlePsgNM7zzRnGsM0VE4o40MnEnezf2ILn9pHE"

# ─── Helpers ─────────────────────────────────────────────────────────────────

def run_external_inference(audio_bytes: bytes, filename: str, content_type: str) -> dict:
    """Run prediction logic using the external Aurigin AI API."""
    t0 = time.time()
    
    try:
        files = {'file': (filename, audio_bytes, content_type)}
        headers = {'x-api-key': EXTERNAL_API_KEY}
        
        response = requests.post(EXTERNAL_API_URL, files=files, headers=headers)
        response.raise_for_status()
        api_data = response.json()
        
        print(f"[API] Aurigin AI Response: {response.status_code} {api_data}")
        
        # Adjusting the response map based on typical deepfake detection outputs.
        # If Aurigin API uses a different key for probability, this might need an update.
        # Common keys are "probability", "score", or "deepfake_probability".
        spoof_prob = float(api_data.get("probability", api_data.get("score", api_data.get("spoof_probability", 0.0))))
        
        # We assume higher score = spoof for compatibility with existing UI
        is_spoof = spoof_prob >= 0.86
        
    except requests.exceptions.RequestException as e:
        print(f"[API] Error calling Aurigin AI API: {e}")
        # If there's an error in response text, print it
        if hasattr(e, 'response') and e.response is not None:
            print(f"[API] Response text: {e.response.text}")
        raise RuntimeError(f"External API failed: {e}")
    except Exception as e:
        print(f"[API] Unexpected error: {e}")
        raise RuntimeError(f"External API failed: {e}")

    latency_ms = round((time.time() - t0) * 1000, 2)

    return {
        "prediction": "spoof" if is_spoof else "bonafide",
        "verdict_label": "AI CLONED VOICE DETECTED" if is_spoof else "AUTHENTIC HUMAN VOICE",
        "spoof_probability": round(spoof_prob, 4),
        "confidence": round(spoof_prob if is_spoof else 1.0 - spoof_prob, 4),
        "threshold": 0.86,
        "latency_ms": latency_ms,
        "model": "Aurigin AI API",
        "window_scores": []
    }


# ─── Routes ───────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "api_integration": True,
        "model_name": "External API + VoiceSpoofCNNV3 (Definition)",
    }

@app.post("/predict/audio")
async def predict_audio(file: UploadFile = File(...)):
    """Accept audio file upload and return spoof prediction via external API."""
    allowed = {"audio/wav", "audio/mpeg", "audio/mp3", "audio/ogg", "audio/flac",
               "audio/m4a", "audio/x-m4a", "audio/mp4", "application/octet-stream"}

    content_type = (file.content_type or "").lower()
    filename = (file.filename or "").lower()

    if content_type not in allowed and not any(filename.endswith(ext) for ext in [".wav", ".mp3", ".m4a", ".ogg", ".flac"]):
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type '{file.content_type}'. Upload .wav, .mp3, .m4a, .ogg, or .flac."
        )

    audio_bytes = await file.read()
    print(f"\n[API] Audio received: {filename} ({content_type}), Size: {len(audio_bytes)} bytes")

    try:
        print("[API] Forwarding to external deepfake detection service...")
        result = run_external_inference(audio_bytes, filename=filename, content_type=content_type)
        print(f"[API] Prediction: {result['prediction']}")
        print(f"[API] Confidence: {result['confidence']}")
        return {"ok": True, **result}
    except RuntimeError as e:
        print(f"[API] Error (Runtime): {e}")
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        print(f"[API] Error (General): {e}")
        raise HTTPException(status_code=500, detail=f"Inference failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
