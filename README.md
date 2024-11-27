Image Analysis Application with Amazon Rekognition

## Description
This Next.js application leverages Amazon Rekognition's powerful AI capabilities to analyze images and detect objects, scenes, and faces. Users can upload images through a simple, intuitive interface, and receive detailed analysis results including detected labels and confidence scores.

## Features
- Image upload and analysis
- Object and scene detection
- Real-time processing
- Confidence score display
- Secure AWS integration
- Responsive UI with shadcn/ui components

## Technical Stack
- Next.js (App Router)
- TypeScript
- Amazon Rekognition
- AWS SDK
- shadcn/ui components
- Tailwind CSS

## Prerequisites
- AWS Account with Rekognition access
- Node.js installed
- Environment variables configured:
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY
    - AWS_REGION

## Getting Started
- Clone the repository
- Install dependencies
- Configure AWS credentials
- Run the development server

## Security Note
This application uses server-side API routes to securely interact with AWS services, ensuring that credentials are never exposed to the client side.