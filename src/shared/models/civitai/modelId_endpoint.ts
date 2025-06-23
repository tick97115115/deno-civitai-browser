import {
  AllowCommercialUseSchema,
  BaseModelsSchema,
  CheckpointTypeSchema,
  ModelsRequestPeriodSchema,
  ModelsRequestSortSchema,
  ModelTypesSchema,
} from "./base.ts";
import { Creators_CreatorSchema } from "./creators_endpoint.ts";
import { type } from "arktype";

export const ModelId_FileHashesSchema = type({
  "SHA256?": "string",
  "CRC32?": "string",
  "BLAKE3?": "string",
  "AutoV3?": "string",
  "AutoV2?": "string",
  "AutoV1?": "string",
});
export type ModelId_FileHashes = typeof ModelId_FileHashesSchema.infer;

export const ModelId_FileSchema = type({
  id: "number.integer",
  sizeKB: "number",
  name: "string",
  type: "string",
  metadata: {
    "fp?": "string | null", // '"fp8" | "fp16" | "fp32"',
    "size?": "string | null", // '"full" | "pruned"',
    "format?": "string", // '"SafeTensor" | "PickleTensor" | "Other" | "Diffusers" | "GGUF"',
  },
  scannedAt: "string | null", //ISO 8061
  "hashes?": ModelId_FileHashesSchema,
  downloadUrl: "string.url",
});
export type ModelId_File = typeof ModelId_FileSchema.infer;

export const ModelId_ImageSchema = type({
  //   id: "number.integer",
  url: "string",
  nsfwLevel: "number.integer",
  width: "number.integer",
  height: "number.integer",
  hash: "string",
  type: "string",
});
export type ModelId_Image = typeof ModelId_ImageSchema.infer;

export const modelId_ModelVersionSchema = type({
  id: "number.integer",
  index: "number.integer", // the position in modelId.modelVersions array.
  name: "string",
  baseModel: "string",
  "baseModelType?": "string | null",
  publishedAt: "string.date | null", //ISO 8061
  availability: "'EarlyAccess' | 'Public'",
  nsfwLevel: "number.integer",
  "description?": "string | null", //html doc strings
  "trainedWords?": "string[]",
  stats: {
    downloadCount: "number.integer",
    ratingCount: "number.integer",
    rating: "number",
    thumbsUpCount: "number.integer",
    thumbsDownCount: "number.integer",
  },
  // covered: 'boolean', // have cover image or not
  files: ModelId_FileSchema.array(),
  images: ModelId_ImageSchema.array(),
});
export type ModelId_ModelVersion = typeof modelId_ModelVersionSchema.infer;

export const ModelId_ModelSchema = type({
  id: "number.integer",
  name: "string",
  description: "string | null",
  // allowNoCredit: 'boolean',
  // allowCommercialUse: allowCommercialUse.array(),
  // allowDerivatives: 'boolean',
  // allowDifferentLicense: 'boolean',
  type: ModelTypesSchema,
  poi: "boolean",
  nsfw: "boolean",
  nsfwLevel: "number.integer",
  // cosmetic: "null",
  "creator?": Creators_CreatorSchema, // sometimes the user might deleted their account, left this field be null.
  stats: {
    downloadCount: "number.integer",
    favoriteCount: "number.integer",
    thumbsUpCount: "number.integer",
    thumbsDownCount: "number.integer",
    commentCount: "number.integer",
    ratingCount: "number.integer",
    rating: "number",
    tippedAmountCount: "number.integer",
  },
  tags: "string[]",
  modelVersions: modelId_ModelVersionSchema.array(),
});
export type ModelId_Model = typeof ModelId_ModelSchema.infer;

export const ModelId_ResponseSchema = type({
  items: ModelId_ModelSchema.array(),
  metadata: {
    "totalItems?": "number.integer",
    "currentPage?": "number.integer",
    "pageSize?": "number.integer",
    "totalPages?": "number.integer",
    "nextPage?": "string.url",
    "prevPage?": "string.url",
  },
});
export type ModelId_Response = typeof ModelId_ResponseSchema.infer;

export const ModelId_RequestOptsSchema = type({
  "limit?": "number.integer", // The number of results to be returned per page. This can be a number between 1 and 100. By default, each page will return 100 results
  "page?": "number.integer", // The page from which to start fetching models
  "query?": "string", // Search query to filter models by name
  "tag?": "string[]", // Search query to filter models by tag
  "username?": "string", // Search query to filter models by user
  "types?": ModelTypesSchema.array(), // The type of model you want to filter with. If none is specified, it will return all types
  "sort?": ModelsRequestSortSchema, // The order in which you wish to sort the results
  "period?": ModelsRequestPeriodSchema, // The time frame in which the models will be sorted
  "rating?": "number.integer", // The rating you wish to filter the models with. If none is specified, it will return models with any rating
  "favorites?": "boolean", // (AUTHED) Filter to favorites of the authenticated user (this requires an API token or session cookie)
  "hidden?": "boolean", // (AUTHED) Filter to hidden models of the authenticated user (this requires an API token or session cookie)
  "primaryFileOnly?": "boolean", // Only include the primary file for each model (This will use your preferred format options if you use an API token or session cookie)
  "allowNoCredit?": "boolean", // Filter to models that require or don't require crediting the creator
  "allowDerivatives?": "boolean", // Filter to models that allow or don't allow creating derivatives
  "allowDifferentLicenses?": "boolean", // Filter to models that allow or don't allow derivatives to have a different license
  "allowCommercialUse?": AllowCommercialUseSchema.array(), // Filter to models based on their commercial permissions
  "nsfw?": "boolean", // If false, will return safer images and hide models that don't have safe images
  "supportsGeneration?": "boolean", // If true, will return models that support generation
  "checkpointType?": CheckpointTypeSchema,
  "baseModels?": BaseModelsSchema.array(),
  "token?": "string", // required for search models
});
export type ModelId_RequestOpts = typeof ModelId_RequestOptsSchema.infer;
