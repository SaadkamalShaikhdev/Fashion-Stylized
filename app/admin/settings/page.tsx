"use client"
import { apiClient } from '@/lib/api-client'
import React, { useState, useEffect } from 'react'

const Setting = () => {
  const [deliveryFee, setDeliveryFee] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const [inputValue, setInputValue] = useState<string>("0")

  const fetchSettings = async () => {
    try {
      setLoading(true)
      setError("")
      const res = await apiClient.getAdminSetting()
      if (res.success) {
        setDeliveryFee(res.data.deliveryFee)
        setInputValue(res.data.deliveryFee.toString())
      } else {
        setError(res.error || "Failed to fetch settings")
      }
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async () => {
    try {
      setLoading(true)
      setError("")
      setSuccess("")
      const newFee = parseFloat(inputValue)
      if (isNaN(newFee) || newFee < 0) {
        setError("Please enter a valid delivery fee")
        setLoading(false)
        return
      }
      const res = await apiClient.updateAdminSetting({ deliveryFee: newFee })
      if (res.success) {
        setDeliveryFee(newFee)
        setSuccess("Delivery fee updated successfully")
      } else {
        setError(res.error || "Failed to update settings")
      }
    } catch {
      setError("Something went wrong while updating")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Delivery Fee ($)</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter delivery fee"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            step="0.01"
            min="0"
          />
        </div>
        
        <button
          onClick={updateSettings}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Settings"}
        </button>

        <p className="text-sm text-gray-600">Current Delivery Fee: ${deliveryFee.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default Setting