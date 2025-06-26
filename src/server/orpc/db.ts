import { type } from "arktype";
import { ORPCError, os } from "@orpc/server";
import {
  LocalModels_RequestOptsSchema,
  LocalModels_ResponseSchema,
  ORPC_ResponseSchema,
} from "#shared/models/orpc.ts";
import { Models_ModelSchema } from "#shared/models/civitai/mod.ts";
import { status } from "http-status";

export const queryLocalModels = os
  .route({ method: "GET", path: "/db/models" }).input(
    LocalModels_RequestOptsSchema,
  )
  .output(ORPC_ResponseSchema.and({
    "data?": LocalModels_ResponseSchema,
  })).handler(async ({ input, context }) => {
    throw new Error("unimplemented!");
  });

export const addOneModelRecord = os
  .route({
    method: "POST",
    path: "/db/model",
  }).input(Models_ModelSchema).output(ORPC_ResponseSchema).handler(
    async ({ input, context }) => {
      throw new Error("unimplemented!");
    },
  );

export const updateOneModelRecord = os
  .route({
    method: "PUT",
    path: "/db/model",
  }).input(
    type({
      targetVersionId: "number.integer",
      model: Models_ModelSchema,
    }),
  ).output(
    ORPC_ResponseSchema,
  ).handler(async ({ input, context }) => {
    throw new Error("unimplemented!");
  });

export const deleteOneModelRecord = os
  .route({
    method: "DELETE",
    path: "/db/model",
  }).input(type({
    modelId: "number.integer",
    targetVersionId: "number.integer",
  })).output(ORPC_ResponseSchema).handler(async ({ input, context }) => {
    throw new Error("unimplemented!");
  });

export const scanLocalModels = os
  .route({
    method: "GET",
    path: "/db/models/scan",
  }).output(ORPC_ResponseSchema.and({
    "data?": LocalModels_ResponseSchema,
  })).handler(async ({ Input, context }) => {
    throw new Error("unimplemented!");
  });
