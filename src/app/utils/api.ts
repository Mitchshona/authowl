import { auth } from '@/services/firebase/firebase'

export async function fetchWithAuth<T>(url: string, options: RequestInit = {}): Promise<T> {
  const user = auth.currentUser
  if (!user) {
    throw new Error('User is not authenticated')
  }

  try {
    const token = await user.getIdToken(true) // Force refresh the token because it expires after 1 hour?

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('401: Unauthorized. Please sign in again.')
      }
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error in fetchWithAuth:', error)
    throw error
  }
}