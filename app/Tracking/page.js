'use client'

import { useState } from 'react'
import Link from 'next/link'
import Sidebar from '../Components/Sidebar'
import { FaTruck } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
export default function TrackingPage() {
  const [isExpanded, setIsExpanded] = useState(true)
  const trackingData = {
    shippingId: "P-546247",
    status: "In Transit",
    events: [
      {
        date: "23 November 2023",
        time: "11:20",
        status: "The package is in transit to its final destination",
        location: "Delhi, India",
        isLatest: true
      },
      {
        date: "23 November 2023",
        time: "10:42",
        status: "The package in transit",
        location: "Agra, UP",
        isLatest: true
      },
      {
        date: "23 November 2023",
        time: "10:17",
        status: "The package in transit",
        location: "Gwalior, MP",
        isLatest: false
      },
      {
        date: "23 November 2023",
        time: "09:13",
        status: "The package has been picked up",
        location:"Rewa, MP",
        isLatest: false 
      }
    ],
    carrier: {
      name: "Tilak Neema",
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <p className="text-sm">
            You are here: <Link href="/" className="text-blue-600 hover:underline">Home</Link> {'>'} Track Package
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 ">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <Sidebar />
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl"><FaTruck /></span>
                      <span className="text-sm text-gray-600">Post ID</span>
                    </div>
                    <p className="font-semibold">#{trackingData.shippingId}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-yellow-500 text-black-600 rounded-full text-sm">
                      {trackingData.status}
                    </span>
                    <button 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="p-1 hover:bg-gray-100 rounded text-xl"
                    >
                      {isExpanded ? <IoIosArrowDropupCircle className='w-6 h-6'/> : <IoIosArrowDropdownCircle className='w-6 h-6'/>}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="space-y-6">
                    <div className="space-y-6">
                      {trackingData.events.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="relative flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${event.isLatest ? 'bg-red-800' : 'bg-gray-300'}`} />
                            {index !== trackingData.events.length - 1 && (
                              <div className="w-0.5 h-full bg-gray-200 absolute top-3" />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="text-sm text-gray-600">
                              {event.date}, {event.time}
                            </div>
                            <div className="font-medium">{event.status}</div>
                            <div className="text-sm text-gray-600">{event.location}</div>
                          </div>
                        </div>
                      ))}
                    </div>                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-sm text-gray-600">Carrier</div>
                          <div className="font-medium">{trackingData.carrier.name}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h2 className="text-lg font-semibold mb-4">Track Another Package</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">
                    Enter Tracking Number
                  </label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                    placeholder="Enter your tracking number"
                  />
                </div>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
                >
                  Track Package
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

