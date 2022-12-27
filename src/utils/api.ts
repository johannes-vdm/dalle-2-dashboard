import { Configuration, OpenAIApi } from "openai"

export const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
export const configuration = new Configuration({
  apiKey: apiKey,
});
export const openai = new OpenAIApi(configuration);

export async function generateImage(prompt: string) {
  return openai.createImage({
    prompt: prompt,
    n: 5,
    size: "512x512",
  })
}
