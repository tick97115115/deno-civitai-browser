import { type } from "arktype";

// https://www.jsondiff.com/ find all shared properties names

export const ModelTypesArray: Array<string> = [
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
] as const;
export const ModelTypesSchema = type.enumerated(
  ...ModelTypesArray,
);
export type ModelTypes = typeof ModelTypesSchema.infer;

export const ModelsRequestPeriodArray = [
  "AllTime",
  "Day",
  "Week",
  "Month",
  "Year",
] as const;
export const ModelsRequestPeriodSchema = type.enumerated(
  ...ModelsRequestPeriodArray,
);
export type ModelsRequestPeriod = typeof ModelsRequestPeriodSchema.infer;

export const AllowCommercialUseArray = [
  "Image",
  "RentCivit",
  "Rent",
  "Sell",
  "None",
] as const;
export const AllowCommercialUseSchema = type.enumerated(
  ...AllowCommercialUseArray,
);
export type AllowCommercialUse = typeof AllowCommercialUseSchema.infer;

export const ModelsRequestSortArray = [
  "Highest Rated",
  "Most Downloaded",
  "Newest",
];
export const ModelsRequestSortSchema = type.enumerated(
  ...ModelsRequestSortArray,
);
export type ModelsRequestSort = typeof ModelsRequestSortSchema.infer;

export const NsfwLevelArray = [
  "None",
  "Soft",
  "Mature",
  "X",
  "Blocked",
] as const;
export const NsfwLevelSchema = type.enumerated(...NsfwLevelArray);
export type NsfwLevel = typeof NsfwLevelSchema.infer;

export const CheckpointTypeArray = ["Merge", "Trained"] as const;
export const CheckpointTypeSchema = type.enumerated(...CheckpointTypeArray);
export type CheckpointType = typeof CheckpointTypeSchema.infer;

export const BaseModelsArray = [
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
] as const;
export const BaseModelsSchema = type.enumerated(...BaseModelsArray);
export type BaseModels = typeof BaseModelsSchema.infer;
