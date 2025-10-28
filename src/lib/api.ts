// GigVault API Client with Authentication

import { authService } from './auth'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export interface Certificate {
  id: number
  serial: string
  subject_cn: string
  not_before: string
  not_after: string
  pem: string
  revoked: boolean
  revoked_at?: string
  created_at: string
}

export interface Enrollment {
  id: string
  common_name: string
  organization: string
  email: string
  csr: string
  status: string
  approved_by?: string
  rejected_by?: string
  reject_reason?: string
  created_at: string
  updated_at: string
}

class GigVaultAPI {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  // Get authenticated headers
  private getHeaders(): HeadersInit {
    const token = authService.getToken()
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest', // CSRF protection
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    return headers
  }

  // Handle API errors and token refresh
  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
      // Token expired, try to refresh
      try {
        await authService.refreshToken()
        throw new Error('TOKEN_EXPIRED')
      } catch {
        authService.logout()
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
        throw new Error('Authentication required')
      }
    }

    if (response.status === 403) {
      throw new Error('Permission denied')
    }

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || 'API request failed')
    }

    // Handle empty responses
    if (response.status === 204) {
      return undefined as T
    }

    return await response.json()
  }

  // Certificates
  async listCertificates(): Promise<Certificate[]> {
    const response = await fetch(`${this.baseURL}/api/v1/certificates`, {
      headers: this.getHeaders(),
    })
    return this.handleResponse<Certificate[]>(response)
  }

  async getCertificate(serial: string): Promise<Certificate> {
    const response = await fetch(`${this.baseURL}/api/v1/certificates/${serial}`, {
      headers: this.getHeaders(),
    })
    return this.handleResponse<Certificate>(response)
  }

  async signCertificate(csr: string, validityDays: number): Promise<Certificate> {
    const response = await fetch(`${this.baseURL}/api/v1/certificates/sign`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ csr, validity_days: validityDays }),
    })
    return this.handleResponse<Certificate>(response)
  }

  async revokeCertificate(serial: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/api/v1/certificates/${serial}/revoke`, {
      method: 'POST',
      headers: this.getHeaders(),
    })
    return this.handleResponse<void>(response)
  }

  // Enrollments
  async listEnrollments(status?: string): Promise<Enrollment[]> {
    const url = status 
      ? `${this.baseURL}/api/v1/enrollments?status=${status}`
      : `${this.baseURL}/api/v1/enrollments`
    const response = await fetch(url, {
      headers: this.getHeaders(),
    })
    return this.handleResponse<Enrollment[]>(response)
  }

  async getEnrollment(id: string): Promise<Enrollment> {
    const response = await fetch(`${this.baseURL}/api/v1/enrollments/${id}`, {
      headers: this.getHeaders(),
    })
    return this.handleResponse<Enrollment>(response)
  }

  async approveEnrollment(id: string, approvedBy: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/api/v1/enrollments/${id}/approve`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ approved_by: approvedBy }),
    })
    return this.handleResponse<void>(response)
  }

  async rejectEnrollment(id: string, rejectedBy: string, reason: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/api/v1/enrollments/${id}/reject`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ rejected_by: rejectedBy, reason }),
    })
    return this.handleResponse<void>(response)
  }
}

export const api = new GigVaultAPI()
