import { type } from "arktype";
import {
  AllowCommercialUseSchema,
  BaseModelsSchema,
  CheckpointTypeSchema,
  ModelsRequestPeriodSchema,
  ModelsRequestSortSchema,
  ModelTypesSchema,
} from "../base/misc.ts";
import { Models_ModelSchema } from "..//civitai/models_endpoint.ts";

export const LocalModels_RequestOptsSchema = type({
  limit: "number.integer", // The number of results to be returned per page. This can be a number between 1 and 100. By default, each page will return 100 results
  page: "number.integer", // The page from which to start fetching models
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
export type LocalModels_RequestOpts =
  typeof LocalModels_RequestOptsSchema.infer;

export const LocalModels_ResponseSchema = type({
  items: Models_ModelSchema.array(),
  metadata: {
    totalItems: "number.integer",
    currentPage: "number.integer",
    pageSize: "number.integer",
    totalPages: "number.integer",
    // "nextPage?": "string.url",
    // "prevPage?": "string.url",
  },
});
export type LocalModels_Response = typeof LocalModels_ResponseSchema.infer;
