"use client"
import { apiClient } from '@/lib/api-client'
import React,{useState,useEffect} from 'react'


const [deliveryFee, setDeliveryFee] = useState<number>(0)
const [loading, setLoading] = useState<boolean>(false)
const [error, setError] = useState<string>("")

 const fetchSettings = async () => {
    try {
      setLoading(true)
      setError("")
      const res = await apiClient.getAdminSetting()
      if (res.success) {
        setDeliveryFee(res.data.deliveryFee)
      } else {
        setError(res.error || "Failed to fetch settings")
      }
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])
      


const Setting = () => {


  return (
    <>
    <h1>Settings</h1>
    <p>Delivery Fee: ${deliveryFee.toFixed(2)}</p>
    </>
  )
}

export default Setting