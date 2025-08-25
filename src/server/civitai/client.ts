import {
  MODELS_ENDPOINT,
  Models_Model,
  Models_ModelSchema,
  Models_ModelVersion,
  Models_ModelVersionSchema,
  Models_RequestOpts,
  Models_Response,
  Models_ResponseSchema,
} from "#shared/models/civitai/mod.ts";
import settings from "#settings";
import { type } from "arktype";

export class CivitAIClient {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = MODELS_ENDPOINT;
    this.token = settings.CIVITAI_TOKEN || null;
  }

  async searchModels(
    options: Models_RequestOpts = {},
  ): Promise<Models_Response> {
    const url = new URL(this.baseUrl);

    // Add query parameters
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((v) => url.searchParams.append(key, v.toString()));
        } else {
          url.searchParams.append(key, value.toString());
        }
      }
    });

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(url.toString(), { headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `CivitAI API error: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const data = await response.json();

    // Validate response with Arktype schema
    const validated = Models_ResponseSchema(data);
    if (validated instanceof type.errors) {
      console.error(
        "CivitAI API response validation failed:",
        validated.summary,
      );
      throw new Error("Invalid response format from CivitAI API");
    }

    return validated;
  }

  async getModelById(modelId: number): Promise<Models_Model> {
    const url = `${this.baseUrl}/${modelId}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `CivitAI API error: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const data = await response.json();

    // Validate response with Arktype schema
    const validated = Models_ModelSchema(data);
    if (validated instanceof type.errors) {
      console.error(
        "CivitAI API response validation failed:",
        validated.summary,
      );
      throw new Error("Invalid model version format from CivitAI API");
    }

    return validated;
  }

  async getModelVersionById(
    modelId: number,
    versionId: number,
  ): Promise<Models_ModelVersion> {
    const url = `${this.baseUrl}/${modelId}/versions/${versionId}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(
        `CivitAI API error: ${response.status} ${response.statusText}`,
      );
    }

    const validate = response.json();

    // Validate response with Arktype schema
    const validated = Models_ModelVersionSchema(validate);
    if (validated instanceof type.errors) {
      console.error(
        "CivitAI API response validation failed:",
        validated.summary,
      );
      throw new Error("Invalid response format from CivitAI API");
    }

    return validated;
  }
}

export const civitaiClient = new CivitAIClient();
