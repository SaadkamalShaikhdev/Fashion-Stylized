
type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: any;
}

class APIClient {
    private async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
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
       
// ✅ always parse JSON whether ok or not
    const data = await response.json();
    return data;    }
   async registerUser(userData: {email: string, password: string, name: string}) {
    return this.fetch<{ success: boolean; error?: string | string[]; userId?: string }>("/auth/register", {
        method: "POST",
        body: {email: userData.email, password: userData.password, username: userData.name}
    })
}
}

export const apiClient = new APIClient();