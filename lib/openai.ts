import OpenAI from 'openai';

// Initialize but don't throw at the top level to avoid crashing the whole route/module
// if the environment variable is missing during static analysis or build steps.
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
