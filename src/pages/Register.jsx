import { useState } from 'react'
import Swal from 'sweetalert2'

const STORAGE_KEY = 'rainwater_participants'

function readParticipants() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || '[]'
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

function writeParticipants(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      organization: '',
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      // Basic, practical email regex: username@domain.tld (TLD at least 2 chars)
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else {
      // Allow digits, spaces, parentheses, dashes and leading +; require at least 7 digits
      const phoneDigits = formData.phone.replace(/\D/g, '')
      if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        newErrors.phone = 'Please enter a valid phone number (include area/country code if needed)'
      }
      // Optionally enforce allowed characters only
      const phoneAllowed = /^[+\d\s()\-]+$/.test(formData.phone)
      if (!phoneAllowed) {
        newErrors.phone = 'Phone number contains invalid characters'
      }
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required'
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      // show summary alert
      await Swal.fire({
        icon: 'error',
        title: 'Validation failed',
        text: 'Please correct the highlighted fields before submitting.'
      })
      return
    }

    setLoading(true)
    try {
      const participants = readParticipants()
      const id = Date.now().toString()
      const item = {
        id,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        organization: formData.organization.trim(),
        createdAt: new Date().toISOString(),
      }
      participants.push(item)
      writeParticipants(participants)

      setFormData({ name: '', email: '', phone: '', organization: '' })
      setErrors({ name: '', email: '', phone: '', organization: '' })
      setSubmitted(true)
      await Swal.fire({ icon: 'success', title: 'Registered', text: 'Registration submitted successfully.' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      await Swal.fire({ icon: 'error', title: 'Error', text: 'Saving failed.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-blue-700 mb-4">Registration</h1>
          <p className="text-gray-600">Register for the Rainwater Convention 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="mt-1 text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="(555) 123-4567"
              />
              {errors.phone && <p className="mt-1 text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="organization" className="block text-gray-700 mb-2">Organization *</label>
              <input
                type="text"
                id="organization"
                value={formData.organization}
                onChange={(e) => handleChange('organization', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 ${errors.organization ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Your organization or company"
              />
              {errors.organization && <p className="mt-1 text-red-600">{errors.organization}</p>}
            </div>

            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg transition-colors" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
