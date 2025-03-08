import { z } from "zod";
import {
  TrainModel,
  GenerateImage,
  GenerateImagesFromPack,
  promptSchema,
  packSchema,
} from "./types";

export type TrainModelInput = z.infer<typeof TrainModel>;
export type GenerateImageInput = z.infer<typeof GenerateImage>;
export type GenerateImagesFromPackInput = z.infer<typeof GenerateImagesFromPack>;
export type Prompt = z.infer<typeof promptSchema>;
export type PackFormValues = z.infer<typeof packSchema>;
export interface Pack extends PackFormValues {
  id: string;
  createdAt: string;
  updatedAt: string;
}
