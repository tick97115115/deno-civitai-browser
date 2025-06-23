import type {
  Models_Model,
  Models_ModelVersion,
} from "./models//civitai/models_endpoint.ts";
import { find } from "es-toolkit/compat";

/**
 * @param model {Models_Model} model object
 * @param modelVersionId {number} model version id to find
 * @returns {Models_ModelVersion} object if found, otherwise throws an error
 *
 * @example
 * ```ts
 * findModelVersion(modelId, modelVersionId);
 * ```
 */
export function findModelVersion(
  model: Models_Model,
  modelVersionId: number,
): Models_ModelVersion {
  const modelVersion = find(model.modelVersions, function (mv) {
    return mv.id === modelVersionId;
  });
  if (modelVersion === undefined) {
    throw new Error(`model have no version id: ${modelVersionId}`);
  }
  return modelVersion;
}
