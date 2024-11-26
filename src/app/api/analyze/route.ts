import { NextRequest, NextResponse } from 'next/server';
import { RekognitionClient, DetectLabelsCommand } from "@aws-sdk/client-rekognition";

const rekognition = new RekognitionClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();

    const command = new DetectLabelsCommand({
      Image: { Bytes: Buffer.from(buffer) },
      MaxLabels: 10,
      MinConfidence: 70,
    });

    const response = await rekognition.send(command);

    return NextResponse.json({ labels: response.Labels });
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json({ error: 'Error analyzing image' }, { status: 500 });
  }
}

