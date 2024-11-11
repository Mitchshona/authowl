export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    // The token is automatically included in the request because it's stored in an HTTP-only cookie
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // This ensures cookies are sent with the request
      headers: {
        ...options.headers,
        'Authorization': 'Bearer ${token}', // The actual token will be inserted server-side
      },
    });
  
    if (!response.ok) {
      throw new Error('API request failed');
    }
  
    return response.json();
  }