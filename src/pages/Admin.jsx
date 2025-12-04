import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { FiUsers, FiTrash2 } from 'react-icons/fi'

const STORAGE_KEY = 'rainwater_participants'

function readParticipants() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch (e) {
    return []
  }
}

function writeParticipants(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export default function Admin() {
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)

  function fetchParticipants() {
    try {
      const data = readParticipants()
      setParticipants(data)
    } catch (e) {
      setParticipants([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchParticipants() }, [])

  async function onDelete(id) {
    const res = await Swal.fire({
      title: 'Delete participant? ',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626'
    })
    if (!res.isConfirmed) return

    try {
      const updated = readParticipants().filter(p => p.id !== id)
      writeParticipants(updated)
      setParticipants(updated)
      await Swal.fire({ icon: 'success', title: 'Deleted', text: 'Participant removed.' })
    } catch (err) {
      await Swal.fire({ icon: 'error', title: 'Error', text: 'Could not delete participant.' })
    }
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FiUsers className="w-8 h-8 text-blue-700" aria-hidden="true" />
            <h1 className="text-blue-700">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage registered participants for the Rainwater Convention</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <p className="text-gray-700">Total Participants: {participants.length}</p>
          </div>

          {participants.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No participants registered yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left text-gray-700">Phone</th>
                    <th className="px-6 py-3 text-left text-gray-700">Organization</th>
                    <th className="px-6 py-3 text-left text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {participants.map((participant) => (
                    <tr key={participant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900">{participant.name}</td>
                      <td className="px-6 py-4 text-gray-600">{participant.email}</td>
                      <td className="px-6 py-4 text-gray-600">{participant.phone}</td>
                      <td className="px-6 py-4 text-gray-600">{participant.organization}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => onDelete(participant.id)}
                          className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" aria-hidden="true" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
