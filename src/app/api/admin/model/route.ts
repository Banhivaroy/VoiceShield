import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const mlResponse = await fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!mlResponse.ok) {
      throw new Error(`ML backend error! status: ${mlResponse.status}`);
    }

    const data = await mlResponse.json();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error('Error proxying to ML service:', error);
    return NextResponse.json({ ok: false, error: 'Failed to connect to ML model' }, { status: 500 });
  }
}
