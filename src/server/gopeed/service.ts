import { Client } from "@gopeed/rest";
import settings from "#settings";
import { getModelVersionDir } from "#server/modelFileLayout.ts";
import type { Models_File, Models_Model, Models_ModelVersion } from "#shared/models/civitai/mod.ts";

export class GopeedService {
  private client: Client;
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string = "http://localhost:9999", token = '') {
    this.baseUrl = baseUrl;
    this.token = token;
    this.client = new Client({host: this.baseUrl, token: this.token});
  }

  async createDownloadTask(
    model: Models_Model,
    modelVersion: Models_ModelVersion,
    file: Models_File,
    onProgress?: (progress: number, status: string) => void
  ): Promise<string> {

    try {
      const response = await this.client.createTask({
        req: {url: file.downloadUrl}, opt: {name: `${file.id}_${file.name}`, path: getModelVersionDir(model.type, model.id, modelVersion.id)}
      });

      const taskId = response;

      // Start monitoring progress if callback provided
      if (onProgress) {
        this.monitorDownloadProgress(taskId, onProgress);
      }

      return taskId;
    } catch (error) {
      console.error("Failed to create Gopeed download task:", error);
      throw new Error(`Gopeed download creation failed: ${error}`);
    }
  }

  async getDownloadStatus(taskId: string) {
    try {
      const response = await this.client.getTask(taskId);
      return response;
    } catch (error) {
      console.error("Failed to get download status:", error);
      throw new Error(`Failed to get download status: ${error}`);
    }
  }

  async pauseDownload(taskId: string): Promise<void> {
    try {
      await this.client.pauseTask(taskId);
    } catch (error) {
      console.error("Failed to pause download:", error);
      throw new Error(`Failed to pause download: ${error}`);
    }
  }

  async resumeDownload(taskId: string): Promise<void> {
    try {
      await this.client.continueTask(taskId);
    } catch (error) {
      console.error("Failed to resume download:", error);
      throw new Error(`Failed to resume download: ${error}`);
    }
  }

  async deleteDownload(taskId: string): Promise<void> {
    try {
      await this.client.deleteTask(taskId);
    } catch (error) {
      console.error("Failed to delete download:", error);
      throw new Error(`Failed to delete download: ${error}`);
    }
  }

  async listDownloads() {
    try {
      const response = await this.client.getTasks();
      return response;
    } catch (error) {
      console.error("Failed to list downloads:", error);
      throw new Error(`Failed to list downloads: ${error}`);
    }
  }

  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
    
    if (settings.CIVITAI_TOKEN) {
      headers['Authorization'] = `Bearer ${settings.CIVITAI_TOKEN}`;
    }

    return headers;
  }

  private monitorDownloadProgress(
    taskId: string,
    onProgress: (progress: number, status: string) => void
  ): void {
    const checkInterval = 1000; // Check every second

    const intervalId = setInterval(async () => {
      try {
        const task = await this.getDownloadStatus(taskId);
        
        if (task) {
          const progress = task.progress.downloaded || 0;
          const statusText = task.status || 'unknown';
          
          onProgress(progress, statusText);

          // Stop monitoring if download is completed or failed
          if (task.status === 'done' || task.status === 'error') {
            clearInterval(intervalId);
          }
        }
      } catch (error) {
        console.error("Error monitoring download progress:", error);
        clearInterval(intervalId);
      }
    }, checkInterval);
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.client.getTasks();
      return true;
    } catch (error) {
      console.error("Gopeed health check failed:", error);
      return false;
    }
  }
}

export const gopeedService = new GopeedService();