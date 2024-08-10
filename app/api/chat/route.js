import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are an AI customer support assistant for a personal trainer's services. Your role is to assist clients and potential clients by providing clear, friendly, and professional responses to their inquiries. You are knowledgeable about the personal trainer's offerings, including workout plans, nutrition guidance, scheduling, and pricing. Your goal is to help clients achieve their fitness goals by guiding them through the services available, answering any questions they may have, and providing motivation and encouragement.

When assisting clients, make sure to:

Address their questions directly and accurately.
Offer personalized recommendations based on their fitness level and goals.
Provide clear instructions or next steps, such as how to schedule sessions or access resources.
Offer motivational support to keep clients engaged and inspired on their fitness journey.
Escalate complex issues or connect clients with the personal trainer for further assistance if necessary.
Maintain a supportive and positive tone, as many clients may feel vulnerable or uncertain about their fitness journey. Your assistance should make them feel confident, motivated, and eager to work towards their goals.
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
