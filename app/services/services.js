import dotenv from "dotenv";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";
import { OpenAI as LangchainOpenAI } from "@langchain/openai";

// Load env
dotenv.config({ path: ".env.local" });

  async function createIndex(fitness){
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
  
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      batchSize: 100,
      model: "text-embedding-3-small",
    });
  
    // gets reference to my chatbot index in pinecone
    const indexName = "chatbot";
    const index = pc.index(indexName);


    // creates list of embeddings from my fitness array
    const fitnessEmbeddings = await embeddings.embedDocuments(fitness);
    // converts embeddings to vectors
    const fitnessVectors = fitnessEmbeddings.map((embedding, i) => ({
      id: fitness[i],
      values: embedding,
      metadata: {
        text: fitness[i],
      },
    }));
    await index.upsert(fitnessVectors);
  }

  async function rag(query){
    try {
      const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY});
      const index = pc.index("chatbot");
      const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
        model: "text-embedding-3-small",
      });
      const queryEmbedding = await new OpenAIEmbeddings().embedQuery(query);

      const queryResponse = await index.query({
        vector: queryEmbedding,
        topK: 3,
        includeMetadata: true,
      });

      // gets all the top answers
      const concatenatedText = queryResponse.matches
      .map((match) => match.metadata.text)
      .join(" ");

      const llm = new LangchainOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
      });
      const chain = loadQAStuffChain(llm);
    
      // chooses the best answer out of top answers
      const result = await chain.invoke({
        input_documents: [new Document({ pageContent: concatenatedText })],
        question: query,
      });

      return result.text

    } catch (error) {
      console.error("Error in RAG process:", error);
      return "Sorry, an error occurred while processing your query.";
    }
  }

  const fitness = [
    "running and biking are good cardio exercises",
    "a high protein diet is good for building muscle",
    "weight lifting helps build muscle and losing fat",
    "a good workout split is push, pull, legs",
  ];

  rag("what is a good workout split?").then(console.log);
  


