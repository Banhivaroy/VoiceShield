"""
Audio feature extraction for VoiceSpoofCNNV3.
Uses the EXACT logic from Banhiva's deepfake.ipynb training script:
Windowing, hop lengths, n_fft=1024, hop_length=256, n_mels=64, fmin=20, fmax=8000, standard scaling.
"""

import numpy as np
import librosa
import soundfile as sf
import io

V3_TARGET_SR = 16000

def v3_get_windows_from_bytes(data: bytes, window_seconds=2, hop_seconds=1, file_ext: str = '.wav'):
    """
    Exact implementation of v3_get_windows, but reading from bytes.
    Splits audio into multiple 2-second windows with 1-second hop.
    file_ext: original file extension (e.g. '.m4a', '.mp3') used to correctly
              decode compressed formats that soundfile cannot handle from a buffer.
    """
    buf = io.BytesIO(data)
    try:
        audio, sr = sf.read(buf, dtype="float32", always_2d=False)
        if audio.ndim > 1:
            audio = np.mean(audio, axis=1)
        if sr != V3_TARGET_SR:
            audio = librosa.resample(audio, orig_sr=sr, target_sr=V3_TARGET_SR)
    except Exception:
        import tempfile
        import os
        # Preserve the original extension so librosa can identify the container format
        ext = file_ext if file_ext.startswith('.') else f'.{file_ext}'
        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
            tmp.write(data)
            tmp_path = tmp.name

        try:
            audio, _ = librosa.load(tmp_path, sr=V3_TARGET_SR, mono=True)
        finally:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
        
    audio = audio.astype(np.float32)

    window_length = window_seconds * V3_TARGET_SR
    hop_length = hop_seconds * V3_TARGET_SR

    if len(audio) <= window_length:
        padded = np.pad(audio, (0, window_length - len(audio)))
        return [padded.astype(np.float32)]

    windows = []
    for start in range(0, len(audio) - window_length + 1, hop_length):
        windows.append(audio[start : start + window_length].astype(np.float32))

    # Include final window
    if (len(audio) - window_length) % hop_length != 0:
        windows.append(audio[-window_length:].astype(np.float32))

    return windows

def v3_audio_to_features(audio: np.ndarray) -> np.ndarray:
    """
    Exact feature pipeline from Banhiva's training script.
    """
    mel = librosa.feature.melspectrogram(
        y=audio,
        sr=V3_TARGET_SR,
        n_fft=1024,
        hop_length=256,
        n_mels=64,
        fmin=20,
        fmax=8000
    )

    mel_db = librosa.power_to_db(mel, ref=np.max)

    # Standard scaling
    mel_db = (mel_db - mel_db.mean()) / (mel_db.std() + 1e-8)

    delta = librosa.feature.delta(mel_db, order=1)
    delta_delta = librosa.feature.delta(mel_db, order=2)

    features = np.stack([mel_db, delta, delta_delta], axis=0)

    return features.astype(np.float32)
