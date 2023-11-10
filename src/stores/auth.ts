import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    username: ''
  }),
  actions: {
    loginUser(username: string) {
      this.isLoggedIn = true
      this.username = username
      localStorage.setItem('username', username)
    },
    logoutUser() {
      this.isLoggedIn = false
      this.username = ''
      localStorage.removeItem('username')
    },
    checkSession() {
      const username = localStorage.getItem('username')
      if (username) {
        this.isLoggedIn = true
        this.username = username
      }
    }
  }
})
