import { z } from "zod";

export const TrainModel = z.object({
  name: z.string(),
  type: z.enum(["Man", "Woman", "Others"]),
  age: z.number(),
  ethinicity: z.enum([
    "White",
    "Black",
    "Asian_American",
    "East_Asian",
    "South_East_Asian",
    "South_Asian",
    "Middle_Eastern",
    "Pacific",
    "Hispanic",
  ]),
  eyeColor: z.enum(["Brown", "Blue", "Hazel", "Gray"]),
  bald: z.boolean(),
  zipUrl: z.string(),
});

export const GenerateImage = z.object({
  prompt: z.string(),
  modelId: z.string(),
  num: z.number(),
});

export const GenerateImagesFromPack = z.object({
  modelId: z.string(),
  packId: z.string(),
});
export const promptSchema = z.object({
  id: z.string().optional(),
  prompt: z.string(),
});

export const packSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  imageUrl1: z.string().url("Please enter a valid URL"),
  imageUrl2: z.string().url("Please enter a valid URL"),
  prompts: z.array(promptSchema),
});


