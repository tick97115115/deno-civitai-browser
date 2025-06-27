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

/**
 * Extracts the filename from a valid URL
 * @param url The URL string to process
 * @returns The filename portion of the URL
 * @throws {Error} If the input is not a valid URL
 */
export function extractFilenameFromUrl(url: string): string {
  // Validate URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch (_e) {
    console.error(_e);
    throw new Error("Invalid URL provided");
  }

  // Get the pathname and split by slashes
  const pathParts = parsedUrl.pathname
    .split("/")
    .filter((part) => part.trim() !== "");

  // If no path parts exist, return empty string
  if (pathParts.length === 0) return "";

  // Get the last part (filename)
  const filenameWithParams = pathParts[pathParts.length - 1];

  // Remove any query parameters from the filename
  const filename = filenameWithParams.split(/[?#]/)[0];

  return filename;
}

/**
 * 去掉文件名的后缀（扩展名）
 * @param filename 完整的文件名（可以包含路径）
 * @returns 不包含后缀的文件名
 */
export function removeFileExtension(filename: string): string {
  // 处理路径分隔符（兼容Windows和Unix）
  const lastSeparatorIndex = Math.max(
    filename.lastIndexOf("/"),
    filename.lastIndexOf("\\"),
  );

  // 获取最后一个点号的位置（在最后一个路径分隔符之后）
  const lastDotIndex = filename.lastIndexOf(".");

  // 如果没有点号，或者点号在路径分隔符之前（表示是隐藏文件或没有扩展名），返回原文件名
  if (lastDotIndex === -1 || lastDotIndex < lastSeparatorIndex) {
    return filename;
  }

  // 返回去掉后缀的部分
  return filename.substring(0, lastDotIndex);
}
