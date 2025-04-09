'use client'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Sidebar from '../Components/Sidebar'

const statesAndUTs = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
]

export default function PincodePage() {
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [postOffice, setPostOffice] = useState('')
  const [pincode, setPincode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setPincode('')
    setIsLoading(true)

    try {
      const query = [address, city, state].filter(Boolean).join(', ')
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: query,
            key:GOOGLE_API_KEY,
          },
        }
      )

      const results = response.data.results
      if (results.length > 0) {
        const postalCodeComponent = results[0].address_components.find((component) =>
          component.types.includes('postal_code')
        )

        if (postalCodeComponent) {
          setPincode(postalCodeComponent.long_name)
        } else {
          setError('No pincode found for the given details.')
        }
      } else {
        setError('No results found. Please check the details and try again.')
      }
    } catch (err) {
      setError('Error fetching data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setState('')
    setCity('')
    setAddress('')
    setPostOffice('')
    setPincode('')
    setError('')
  }

  return (
    <div className="min-h-screen ">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <p className="text-sm">
            You are here: <Link href="/" className="text-blue-600 hover:underline">Home</Link> {'>'} Find Pin Code
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <Sidebar/>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Find Pincode</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm">* Indicates a required field.</p>
                
                <div className="space-y-2">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State / Union Territory <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="mt-1 border block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                    required
                  >
                    <option value="">Select a state</option>
                    {statesAndUTs.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City / District <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-800 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reset
                </button>
              </div>
            </form>

            {pincode && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Pincode: {pincode}
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
