import { API_BASE } from "./config";

export class ApiGateway {
  async get(path: string) {
    const response = await fetch(`${API_BASE}${path}`);
    return response.json();
  }

  async post<T, R>(path: string, payload: T): Promise<R> {
    return this.requestWithPayload<T, R>("POST", path, payload);
  }

  async put<T, R>(path: string, payload: T): Promise<R> {
    return this.requestWithPayload<T, R>("PUT", path, payload);
  }

  private async requestWithPayload<T, R>(
    method: string,
    path: string,
    payload: T
  ): Promise<R> {
    const response = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return response.json() as R;
  }
}

export const apiGateway = new ApiGateway();
