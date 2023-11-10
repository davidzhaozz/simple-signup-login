import { API_ENDPOINTS } from '@/config/config'

interface RegistrationData {
  username: string
  password: string
}

interface LoginCredentials {
  username: string
  password: string
}

const userCreationService = async (registrationData: RegistrationData): Promise<any> => {
  const response = await fetch(API_ENDPOINTS.userCreation, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registrationData)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Error registering user')
  }

  return response.json()
}

const userLoginService = async (credentials: LoginCredentials): Promise<any> => {
  const response = await fetch(API_ENDPOINTS.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Error logging in')
  }

  return response.json()
}

const fetchFavorites = async (username: string) => {
  const response = await fetch(API_ENDPOINTS.userFavorites.replace('{username}', username), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch favorites')
  }

  const booksResponse = await fetch(API_ENDPOINTS.books)
  const books = await booksResponse.json()
  const userFavor = await response.json().then((resp) => {
    return resp.data.favorites.book
  })

  return books.data.books.filter((book: { id: string }) => {
    return book.id == userFavor
  })
}

const addFavorite = async (username: string, bookId: string): Promise<any> => {
  const response = await fetch(API_ENDPOINTS.userFavorites.replace('{username}', username), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ book: bookId })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Could not add favorite')
  }

  return response.json()
}

const fetchBooks = async () => {
  const response = await fetch(API_ENDPOINTS.books)
  if (!response.ok) {
    throw new Error('Failed to fetch books')
  }
  return response.json().then((resp) => {
    return resp.data.books
  })
}

export { userCreationService, userLoginService, addFavorite, fetchFavorites, fetchBooks }
