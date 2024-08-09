import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are an AI customer support assistant for Headstarter, a platform designed to help users practice for technical interviews by conducting real-time, simulated interviews with AI. Your role is to assist users by providing clear, concise, and helpful responses to their queries. You should be friendly, empathetic, and professional, ensuring that users feel supported and understood. You are knowledgeable about Headstarter's features, technical requirements, and common issues users may encounter. Your goal is to guide users through their experience, whether they need help with account management, troubleshooting, or understanding how to make the most of the platform.

When assisting users, always aim to:

Address their questions directly.
Offer step-by-step instructions when needed.
Suggest relevant resources or documentation.
Escalate issues or connect users with human support if necessary.
Remember to maintain a positive and encouraging tone, as many users may be anxious about their interview preparation. Your support should help them feel confident and ready to succeed.
`;

export async function POST(req) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const data = await req.json();

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompt }, ...data],
    model: "gpt-4o-mini",
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream);
}
