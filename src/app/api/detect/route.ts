import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const apiKey = process.env.AURIGIN_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: 'AURIGIN_API_KEY is not set in the server environment.' },
        { status: 500 }
      );
    }

    // Call the Aurigin AI API directly
    const apiResponse = await fetch('https://api.aurigin.ai/v1/predict', {
      method: 'POST',
      body: formData,
      headers: {
        'x-api-key': apiKey,
      },
    });

    const apiData = await apiResponse.json();
    
    // Log raw response so user can check it
    console.log('RAW AURIGIN API RESPONSE:', JSON.stringify(apiData, null, 2));

    if (!apiResponse.ok) {
      return NextResponse.json(
        { ok: false, error: apiData.message || apiData.error || 'External API error' },
        { status: apiResponse.status }
      );
    }

    // Check if the response contains valid global data
    if (!apiData.global || typeof apiData.global.score === 'undefined') {
      const reason = apiData.global?.reason || 'Unknown error. Score is missing from response.';
      return NextResponse.json(
        { ok: false, error: `Aurigin API failed to analyze the audio: ${reason}` },
        { status: 400 }
      );
    }

    // The API might return null for result if it failed, so we check that
    if (apiData.global.result === null) {
      return NextResponse.json(
        { ok: false, error: `Aurigin API could not determine result: ${apiData.global.reason}` },
        { status: 400 }
      );
    }

    // Map the Aurigin response format to what the UI expects
    const spoof_prob = Number(apiData.global.score);
    const confidence = Number(apiData.global.confidence ?? 0);
    const is_spoof = spoof_prob >= 0.86;

    const result = {
      ok: true,
      prediction: is_spoof ? 'spoof' : 'bonafide',
      verdict_label: is_spoof ? 'AI CLONED VOICE DETECTED' : 'AUTHENTIC HUMAN VOICE',
      spoof_probability: Number(spoof_prob.toFixed(4)),
      confidence: Number(confidence.toFixed(4)),
      threshold: 0.86,
      latency_ms: apiData.processing_time ? Math.round(apiData.processing_time * 1000) : 0,
      model: apiData.model || "Aurigin AI API",
      window_scores: []
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error proxying to Aurigin API:', error);
    return NextResponse.json(
      { ok: false, error: 'Cannot connect to deepfake detection service.' },
      { status: 503 }
    );
  }
}
