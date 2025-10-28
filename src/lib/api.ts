// GigVault API Client

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

  // Certificates
  async listCertificates(): Promise<Certificate[]> {
    const response = await fetch(`${this.baseURL}/api/v1/certificates`)
    if (!response.ok) throw new Error('Failed to fetch certificates')
    return response.json()
  }

  async getCertificate(serial: string): Promise<Certificate> {
    const response = await fetch(`${this.baseURL}/api/v1/certificates/${serial}`)
    if (!response.ok) throw new Error('Failed to fetch certificate')
    return response.json()
  }

  async signCertificate(csr: string, validityDays: number): Promise<Certificate> {
    const response = await fetch(`${this.baseURL}/api/v1/certificates/sign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ csr, validity_days: validityDays }),
    })
    if (!response.ok) throw new Error('Failed to sign certificate')
    return response.json()
  }

  async revokeCertificate(serial: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/api/v1/certificates/${serial}/revoke`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Failed to revoke certificate')
  }

  // Enrollments
  async listEnrollments(status?: string): Promise<Enrollment[]> {
    const url = status 
      ? `${this.baseURL}/api/v1/enrollments?status=${status}`
      : `${this.baseURL}/api/v1/enrollments`
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch enrollments')
    return response.json()
  }

  async getEnrollment(id: string): Promise<Enrollment> {
    const response = await fetch(`${this.baseURL}/api/v1/enrollments/${id}`)
    if (!response.ok) throw new Error('Failed to fetch enrollment')
    return response.json()
  }

  async approveEnrollment(id: string, approvedBy: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/api/v1/enrollments/${id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved_by: approvedBy }),
    })
    if (!response.ok) throw new Error('Failed to approve enrollment')
  }

  async rejectEnrollment(id: string, rejectedBy: string, reason: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/api/v1/enrollments/${id}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rejected_by: rejectedBy, reason }),
    })
    if (!response.ok) throw new Error('Failed to reject enrollment')
  }
}

export const api = new GigVaultAPI()

