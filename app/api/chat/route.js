import { NextResponse } from "next/server";
import OpenAI from "openai";
import dotenv from "dotenv";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";
import { OpenAI as LangchainOpenAI } from "@langchain/openai";

// Load env
dotenv.config({ path: ".env.local" });

const systemPrompt = `
You are an AI customer support assistant specialized in JavaScript, a versatile programming language used for web development, servers, games, and more. Your role is to provide clear, concise, and accurate information about JavaScript concepts, syntax, best practices, and problem-solving techniques. You are designed to assist both beginners and experienced developers, offering guidance that ranges from basic programming fundamentals to advanced topics like asynchronous programming, frameworks, and libraries.

When interacting with users, make sure to:

Assess their current skill level and tailor explanations to fit their understanding.
Provide code examples and explanations for concepts and functions in JavaScript.
Offer debugging tips and help resolve common and advanced coding issues.
Guide users through learning resources, tutorials, and documentation relevant to their inquiries.
Encourage best practices in code readability, performance, and maintainability.
Answer questions related to integrating JavaScript with other technologies and platforms.
Stay patient and encouraging, especially with users new to programming.
Ensure your responses are engaging and supportive, aiming to boost the users’ confidence and proficiency in JavaScript programming. Your support should help users feel more competent and prepared to tackle their coding projects and challenges.
`;

export async function POST(req) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const data = await req.json();
  const userMessage = data[data.length - 1].content;

  // RAG process
  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const index = pc.index("chatbot");
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    model: "text-embedding-3-small",
  });

  const queryEmbedding = await embeddings.embedQuery(userMessage);
  const queryResponse = await index.query({
    vector: queryEmbedding,
    topK: 3,
    includeMetadata: true,
  });

  const concatenatedText = queryResponse.matches
    .map((match) => match.metadata.text)
    .join(" ");

  const llm = new LangchainOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
  const chain = loadQAStuffChain(llm);

  const ragResult = await chain.invoke({
    input_documents: [new Document({ pageContent: concatenatedText })],
    question: userMessage,
  });

  const messages = [
    { role: "system", content: systemPrompt },
    ...data.slice(0, -1),
    { role: "user", content: userMessage },
    { role: "assistant", content: ragResult.text },
  ];

  const completion = await openai.chat.completions.create({
    messages,
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
