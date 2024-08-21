import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {}
const { text } = await generateText({
  model: openai("gpt-4-turbo"),
  prompt: "Write a vegetarian lasagna recipe for 4 people.",
});
