import { type } from "arktype";

// https://www.jsondiff.com/ find all shared properties names

export const ModelTypesSchema = type.enumerated(
  "Checkpoint",
  "TextualInversion",
  "Hypernetwork",
  "AestheticGradient",
  "LORA",
  "Controlnet",
  "Poses",
  "LoCon",
  "DoRA",
  "Other",
  "MotionModule",
  "Upscaler",
  "VAE",
  "Wildcards",
  "Workflows",
  "Detection",
);
export type ModelTypes = typeof ModelTypesSchema.infer;
// @ts-ignore: type inference issue
export const ModelTypesArray = ModelTypesSchema.json.map((obj: { unit: string }) => obj.unit);

export const ModelsRequestPeriodSchema = type.enumerated(
  "AllTime",
  "Day",
  "Week",
  "Month",
  "Year",
);
export type ModelsRequestPeriod = typeof ModelsRequestPeriodSchema.infer;
// @ts-ignore: type inference issue
export const ModelsRequestPeriodArray = ModelsRequestPeriodSchema.json.map((obj: { unit: string }) => obj.unit);

export const AllowCommercialUseSchema = type.enumerated(
  "Image",
  "RentCivit",
  "Rent",
  "Sell",
  "None",
);
export type AllowCommercialUse = typeof AllowCommercialUseSchema.infer;
// @ts-ignore: type inference issue
export const AllowCommercialUseArray = AllowCommercialUseSchema.json.map((obj: { unit: string }) => obj.unit);

export const ModelsRequestSortSchema = type.enumerated(
  "Highest Rated",
  "Most Downloaded",
  "Newest",
);
export type ModelsRequestSort = typeof ModelsRequestSortSchema.infer;
// @ts-ignore: type inference issue
export const ModelsRequestSortArray = ModelsRequestSortSchema.json.map((obj: { unit: string }) => obj.unit);

export const NsfwLevelSchema = type.enumerated(
  "None",
  "Soft",
  "Mature",
  "X",
  "Blocked",
);
export type NsfwLevel = typeof NsfwLevelSchema.infer;
// @ts-ignore: type inference issue
export const NsfwLevelArray = NsfwLevelSchema.json.map((obj: { unit: string }) => obj.unit);

export const CheckpointTypeSchema = type.enumerated("Merge", "Trained");
export type CheckpointType = typeof CheckpointTypeSchema.infer;
// @ts-ignore: type inference issue
export const CheckpointTypeArray = CheckpointTypeSchema.json.map((obj: { unit: string }) => obj.unit);

export const BaseModelsSchema = type.enumerated(
  "Aura Flow",
  "CogVideoX",
  "Flux .1 D",
  "Flux .1 S",
  "HiDream",
  "Hunyuan 1",
  "Hunyuan Video",
  "Illustrious",
  "Kolors",
  "LTXV",
  "Lumina",
  "Mochi",
  "NoobAI",
  "ODOR",
  "Open AI",
  "Other",
  "PixArt E",
  "PixArt a",
  "Playground v2",
  "Pony",
  "SD 1.4",
  "SD 1.5",
  "SD 1.5 Hyper",
  "SD 1.5 LCM",
  "SD 2.0",
  "SD 2.0 768",
  "SD 2.1",
  "SD 2.1 768",
  "SD 2.1 Unclip",
  "SD 3",
  "SD 3.5",
  "SD 3.5 Large",
  "SD 3.5 Large Turbo",
  "SD 3.5 Medium",
  "SDXL 0.9",
  "SDXL 1.0",
  "SDXL 1.0 LCM",
  "SDXL Distilled",
  "SDXL Hyper",
  "SDXL Lightning",
  "SDXL Turbo",
  "SDXL Turbo",
  "SVD",
  "SVD XT",
  "Stable Cascade",
  "WAN Video",
);
export type BaseModels = typeof BaseModelsSchema.infer;
// @ts-ignore: type inference issue
export const BaseModelsArray = BaseModelsSchema.json.map((obj: { unit: string }) => obj.unit);

if (import.meta.main) {
  console.log("BaseModelsArray:", BaseModelsArray);
  // console.log("ModelTypesArray:", ModelTypesArray);
  // console.log("ModelsRequestPeriodArray:", ModelsRequestPeriodArray);
  // console.log("AllowCommercialUseArray:", AllowCommercialUseArray);
  // console.log("ModelsRequestSortArray:", ModelsRequestSortArray);
  // console.log("NsfwLevelArray:", NsfwLevelArray);
  // console.log("CheckpointTypeArray:", CheckpointTypeArray);
}