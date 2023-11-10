const API_BASE_URL = 'http://localhost:9000'
export const API_ENDPOINTS = {
  books: `${API_BASE_URL}/books`,
  userCreation: `${API_BASE_URL}/users/new`,
  userFavorites: `${API_BASE_URL}/users/{username}/favorites`,
  login: `${API_BASE_URL}/login`
}
