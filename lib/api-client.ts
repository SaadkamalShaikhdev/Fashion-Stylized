
type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: any;
}

class APIClient {
    private async fetchData<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
          const { method = "GET", body, headers = {}} = options;
        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }
      const response = await fetch(`/api${endpoint}`,{
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: defaultHeaders
        } )
        if(!response.ok) {
            throw new Error (await response.text())
        }
        return await response.json();
    }
}

export const aptClient = new APIClient();