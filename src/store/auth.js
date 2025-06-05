import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('users') || '[]'),
    currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null')
  }),
  actions: {
    register(name, email, password) {
      if (this.users.find(u => u.email === email)) {
        throw new Error('Email already exists')
      }
      const user = { name, email, password }
      this.users.push(user)
      localStorage.setItem('users', JSON.stringify(this.users))
      this.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))
    },
    login(email, password) {
      const user = this.users.find(u => u.email === email && u.password === password)
      if (!user) {
        throw new Error('Invalid credentials')
      }
      this.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))
    },
    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    }
  }
})
