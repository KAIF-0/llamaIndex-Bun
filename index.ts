import { z } from "zod";
import { agent } from "@llamaindex/workflow";
import { tool } from "llamaindex";
import { openai } from "@llamaindex/openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(Bun.env.GEMINI_API_KEY as string);
const model = gemini.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const testTool = tool({
  name: "test-tool",
  description: "A test tool",
  parameters: z.object({ 
    name: z.string(),
  }),
  execute: async ({ name }: { name: string }) => {
    return `Hello, ${name}!`;
  },
});

const testAgent = agent({
  name: "test-agent",
  description: "A test agent",
//   llm: model,
  tools: [testTool],
});

const response = await testAgent.run("test");

console.log(response);
