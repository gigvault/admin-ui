'use client'

import { useState } from 'react'

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const certificates = [
    { serial: 'A1B2C3D4E5F6', cn: 'example.com', expires: '2025-12-31', status: 'active' },
    { serial: 'G7H8I9J0K1L2', cn: 'api.example.com', expires: '2025-11-15', status: 'active' },
    { serial: 'M3N4O5P6Q7R8', cn: 'mail.example.com', expires: '2025-10-20', status: 'active' },
    { serial: 'S9T0U1V2W3X4', cn: 'old.example.com', expires: '2024-08-10', status: 'revoked' },
  ]

  const filteredCertificates = certificates.filter(cert => 
    cert.cn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.serial.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Certificates</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage all issued certificates
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Issue New Certificate
          </button>
        </div>
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search by CN or serial..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Serial Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Common Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expires
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCertificates.map((cert) => (
              <tr key={cert.serial} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                  {cert.serial}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {cert.cn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cert.expires}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {cert.status === 'active' ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Revoked
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  {cert.status === 'active' && (
                    <button className="text-red-600 hover:text-red-900">Revoke</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

