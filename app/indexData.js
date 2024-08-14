import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Initialize Pinecone and OpenAI Embeddings
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

async function chunkText(text, chunkSize = 8000) {
  const sentences = text.split('. ');
  let chunks = [];
  let currentChunk = '';

  for (let sentence of sentences) {
    if (currentChunk.length + sentence.length + 1 <= chunkSize) {
      currentChunk += sentence + '. ';
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = sentence + '. ';
    }
  }
  if (currentChunk) chunks.push(currentChunk.trim());

  return chunks;
}

async function indexData() {
  try {
    const filePath = path.join(process.cwd(), "public", "javascript_tutorial_content.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    let documents = [];

    for (let key in jsonData) {
      const content = jsonData[key];
      const chunks = await chunkText(content);

      for (let chunk of chunks) {
        const embedding = await embeddings.embedQuery(chunk);
        documents.push({
          id: `${key}-${documents.length}`,
          values: embedding,
          metadata: { text: chunk }
        });
      }
    }

    // Ensure documents array is passed correctly
    await index.upsert(documents);

    console.log("Indexing complete!");

  } catch (error) {
    console.error("Error indexing data:", error);
  }
}

indexData();
