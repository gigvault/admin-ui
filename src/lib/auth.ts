// Authentication utilities for Admin UI

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthToken {
  access_token: string
  token_type: string
  expires_in: number
}

export interface User {
  id: string
  username: string
  email: string
  roles: string[]
}

// Token storage
const TOKEN_KEY = 'gigvault_token'
const USER_KEY = 'gigvault_user'

export class AuthService {
  private baseURL: string

  constructor(baseURL: string = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:8087') {
    this.baseURL = baseURL
  }

  // Login with credentials
  async login(credentials: LoginCredentials): Promise<AuthToken> {
    const response = await fetch(`${this.baseURL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Login failed: ${error}`)
    }

    const token: AuthToken = await response.json()
    this.setToken(token)
    
    // Fetch user info
    const user = await this.getCurrentUser(token.access_token)
    this.setUser(user)

    return token
  }

  // Get current user info
  async getCurrentUser(token?: string): Promise<User> {
    const authToken = token || this.getToken()
    if (!authToken) {
      throw new Error('No authentication token')
    }

    const response = await fetch(`${this.baseURL}/api/v1/auth/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user info')
    }

    return await response.json()
  }

  // Logout
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
  }

  // Token management
  setToken(token: AuthToken) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token.access_token)
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY)
    }
    return null
  }

  // User management
  setUser(user: User) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    }
  }

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(USER_KEY)
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getToken() !== null
  }

  // Check if user has role
  hasRole(role: string): boolean {
    const user = this.getUser()
    return user?.roles.includes(role) || false
  }

  // Refresh token (if supported)
  async refreshToken(): Promise<AuthToken> {
    const response = await fetch(`${this.baseURL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    })

    if (!response.ok) {
      this.logout()
      throw new Error('Token refresh failed')
    }

    const token: AuthToken = await response.json()
    this.setToken(token)
    return token
  }
}

export const authService = new AuthService()

