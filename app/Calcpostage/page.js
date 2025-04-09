'use client'

import { useState } from 'react'
import Link from 'next/link'
import Sidebar from '../Components/Sidebar';
import { calculatePostage } from '../../utils/postagecalculator' // Adjust the path as necessary

export default function CalculatePostagePage() {
  const [serviceType, setServiceType] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [fromPincode, setFromPincode] = useState('')
  const [fromCity, setFromCity] = useState('')
  const [fromState, setFromState] = useState('')
  const [toPincode, setToPincode] = useState('')
  const [toCity, setToCity] = useState('')
  const [toState, setToState] = useState('')
  const [weight, setWeight] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [newsPaperValue, setNewsPaperValue] = useState('')
  const [newsPaperWeight, setNewsPaperWeight] = useState('')
  const [newsPaperType, setNewsPaperType] = useState('')
  const [newsPaperRegWeight, setNewsPaperRegWeight] = useState('')
  const [amount, setAmount] = useState('')
  const [insuredValue, setInsuredValue] = useState('')
  const [ipoValue, setIpoValue] = useState('')
  const [rentType, setRentType] = useState('')
  const [isCombined, setIsCombined] = useState(false)
  const [postage, setPostage] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setPostage(null)

    try {
      const details = {
        service: selectedItem,
        postCardType: '',
        letterWeight: 0,
        bookWeight: 0,
        newsPaperValue: 0,
        newsPaperWeight: 0,
        parcelWeight: 0,
        newsPaperType: '',
        newsPaperRegWeight: 0,
        amount: 0,
        insuredValue: 0,
        ipoValue: 0,
        rentType: '',
        isCombined: false,
        airmailWeight: 0,
      }

      switch(selectedItem) {
        case 'postCard':
          details.postCardType = serviceType
          break
        case 'letter':
          details.letterWeight = parseFloat(weight)
          break
        case 'bookPattern':
        case 'bookPacket':
          details.bookWeight = parseFloat(weight)
          break
        case 'newsPaper':
          details.newsPaperValue = parseFloat(newsPaperValue)
          details.newsPaperWeight = parseFloat(newsPaperWeight)
          break
        case 'parcel':
          details.parcelWeight = parseFloat(weight)
          break
        case 'newsPaperRegistered':
          details.newsPaperType = newsPaperType
          details.newsPaperRegWeight = parseFloat(newsPaperRegWeight)
          break
        case 'electronicMoneyOrder':
          details.amount = parseFloat(amount)
          break
        case 'insurance':
          details.insuredValue = parseFloat(insuredValue)
          break
        case 'indianPostalOrder':
          details.ipoValue = parseFloat(ipoValue)
          break
        case 'airmail':
          details.airmailWeight = parseFloat(weight)
          break
        case 'rent':
          details.rentType = rentType
          details.isCombined = isCombined
          break
        // Add cases for other services as needed
        default:
          break
      }

      const result = calculatePostage(details)
      setPostage(result)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleReset = () => {
    setServiceType('')
    setSelectedItem('')
    setFromPincode('')
    setFromCity('')
    setFromState('')
    setToPincode('')
    setToCity('')
    setToState('')
    setWeight('')
    setLength('')
    setWidth('')
    setHeight('')
    setNewsPaperValue('')
    setNewsPaperWeight('')
    setNewsPaperType('')
    setNewsPaperRegWeight('')
    setAmount('')
    setInsuredValue('')
    setIpoValue('')
    setRentType('')
    setIsCombined(false)
    setPostage(null)
    setError('')
  }

  const isFormValid = () => {
    if (!selectedItem) return false

    switch(selectedItem) {
      case 'postCard':
        return serviceType !== ''
      case 'letter':
        return weight > 0
      case 'bookPattern':
      case 'bookPacket':
        return weight > 0
      case 'newsPaper':
        return newsPaperValue > 0 && newsPaperWeight > 0
      case 'parcel':
        return weight > 0
      case 'newsPaperRegistered':
        return newsPaperType !== '' && newsPaperRegWeight > 0
      case 'electronicMoneyOrder':
        return amount > 0
      case 'insurance':
        return insuredValue > 0
      case 'indianPostalOrder':
        return ipoValue > 0
      case 'airmail':
        return weight > 0
      case 'rent':
        return rentType !== ''
      // Add validations for other services
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <p className="text-sm">
            You are here: <Link href="/" className="text-blue-600 hover:underline">Home</Link> {'>'} Calculate Postage
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <Sidebar/>

          {/* Main Content */}
          <div className="bg-white p-6 shadow-xl">
            <h1 className="text-3xl font-bold mb-4">Calculate Postage</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-sm">* Indicates a required field.</p>

              {/* Send From and Send To Sections */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Send From */}
                <div className="bg-gray-50 p-4 rounded">
                  <h2 className="font-semibold mb-4">Send From</h2>
                  <div className="space-y-4">
                    {/* From Pincode */}
                    <div>
                      <label className="block text-sm mb-1">
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={fromPincode}
                          onChange={(e) => setFromPincode(e.target.value)}
                          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                          required
                        />
                        <Link href="/Pincode" className="text-blue-600 text-sm hover:underline">
                          Find<br/>Pincode
                        </Link>
                      </div>
                    </div>
                    {/* From City */}
                    <div>
                      <label className="block text-sm mb-1">
                        City / District <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={fromCity}
                        onChange={(e) => setFromCity(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                      />
                    </div>
                    {/* From State */}
                    <div>
                      <label className="block text-sm mb-1">
                        State / Union Territory <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={fromState}
                        onChange={(e) => setFromState(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Send To */}
                <div className="bg-gray-50 p-4 rounded">
                  <h2 className="font-semibold mb-4">Send To</h2>
                  <div className="space-y-4">
                    {/* To Pincode */}
                    <div>
                      <label className="block text-sm mb-1">
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={toPincode}
                          onChange={(e) => setToPincode(e.target.value)}
                          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                          required
                        />
                        <Link href="/Pincode" className="text-blue-600 text-sm hover:underline">
                          Find<br/>Pincode
                        </Link>
                      </div>
                    </div>
                    {/* To City */}
                    <div>
                      <label className="block text-sm mb-1">
                        City / District <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={toCity}
                        onChange={(e) => setToCity(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                      />
                    </div>
                    {/* To State */}
                    <div>
                      <label className="block text-sm mb-1">
                        State / Union Territory <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={toState}
                        onChange={(e) => setToState(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"

                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Details */}
              <div className="space-y-4">
                <h2 className="font-semibold">Article Details</h2>
                
                {/* Select an Item */}
                <div>
                  <label className="block text-sm mb-1">
                    Select an Item <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="postCard">Post Card</option>
                    <option value="inlandLetter">Inland Letter Card</option>
                    <option value="letter">Letter</option>
                    <option value="bookPattern">Book Pattern</option>
                    <option value="bookPacket">Book Packet</option>
                    <option value="newsPaper">Registered News Paper</option>
                    <option value="parcel">Parcel</option>
                    <option value="newsPaperRegistered">Registered News Paper</option>
                    <option value="electronicMoneyOrder">Electronic Money Order</option>
                    <option value="insurance">Insurance</option>
                    <option value="indianPostalOrder">Indian Postal Order</option>
                    <option value="postalIdCard">Postal Identity Card</option>
                    <option value="businessReplyPermit">Business Reply Permit Fee</option>
                    <option value="airmail">Airmail Fee</option>
                    <option value="recall">Recall Fee</option>
                    <option value="rent">Rent for Boxes/Bags</option>
                  </select>
                </div>

                {/* Dynamic Inputs Based on Selected Item */}
                {selectedItem && (
                  <div className="space-y-4">
                    {/* Example for Post Card */}
                    {selectedItem === 'postCard' && (
                      <div>
                        <label className="block text-sm mb-1">
                          Select Post Card Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                          required
                        >
                          <option value="">--Select Post Card Type--</option>
                          <option value="single">Single Card (₹0.50)</option>
                          <option value="reply">Reply Card (₹1.00)</option>
                          <option value="meghdoot">Meghdoot Post Card (₹0.25)</option>
                          <option value="printed">Printed Card (₹6.00)</option>
                        </select>
                      </div>
                    )}

                    {/* Example for Letter */}
                    {selectedItem === 'letter' && (
                      <div>
                        <label className="block text-sm mb-1">
                          Weight (in grams) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                          required
                          min="1"
                        />
                      </div>
                    )}

                    {/* Example for Registered News Paper */}
                    {selectedItem === 'newsPaperRegistered' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm mb-1">
                            Select Newspaper Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={newsPaperType}
                            onChange={(e) => setNewsPaperType(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                            required
                          >
                            <option value="">--Select--</option>
                            <option value="singleCopy">Single Copy</option>
                            <option value="multipleCopies">Multiple Copies</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm mb-1">
                            Weight (in grams) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={newsPaperRegWeight}
                            onChange={(e) => setNewsPaperRegWeight(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                            required
                            min="1"
                          />
                        </div>
                      </div>
                    )}

                    {/* Add similar conditional blocks for other services */}
                  </div>
                )}

                {/* Additional Inputs (e.g., dimensions) */}
                {/* Example for Parcel */}
                {selectedItem === 'parcel' && (
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4"> {/* Increased columns to 4 */}
                   <div>
                     <label className="block text-sm mb-1">
                       Length (in cm) <span className="text-red-500">*</span>
                     </label>
                     <input
                       type="number"
                       value={length}
                       onChange={(e) => setLength(e.target.value)}
                       className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                       required
                       min="1"
                     />
                   </div>
                   <div>
                     <label className="block text-sm mb-1">
                       Width (in cm) <span className="text-red-500">*</span>
                     </label>
                     <input
                       type="number"
                       value={width}
                       onChange={(e) => setWidth(e.target.value)}
                       className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                       required
                       min="1"
                     />
                   </div>
                   <div>
                     <label className="block text-sm mb-1">
                       Height (in cm) <span className="text-red-500">*</span>
                     </label>
                     <input
                       type="number"
                       value={height}
                       onChange={(e) => setHeight(e.target.value)}
                       className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                       required
                       min="1"
                     />
                   </div>
                   <div>
                     <label className="block text-sm mb-1">
                       Weight (in kg) <span className="text-red-500">*</span>
                     </label>
                     <input
                       type="number"
                       value={weight}
                       onChange={(e) => setWeight(e.target.value)}
                       className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                       required
                       min="0.1"
                     />
                   </div>
                 </div>
                 )}

                {/* Example for Insurance */}
                {selectedItem === 'insurance' && (
                  <div>
                    <label className="block text-sm mb-1">
                      Value to Insure (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={insuredValue}
                      onChange={(e) => setInsuredValue(e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-red-800 focus:border-red-800"
                      required
                      min="1"
                    />
                  </div>
                )}

                {/* Continue adding conditional fields for other services */}
              </div>

              {/* Display Postage Fee or Error */}
              {postage && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
                  <p>Postage Fee: <strong>{postage}</strong></p>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
                  <p>Error: {error}</p>
                </div>
              )}

              {/* Submit and Reset Buttons */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                 Calculate Postage
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 ml-4"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
