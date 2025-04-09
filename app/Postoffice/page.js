'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Sidebar from '../Components/Sidebar'


const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  return distance;
};

export default function PostOfficeLocator() {
  const statesAndUTs = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
    "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [postOffices, setPostOffices] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [googleApiKey] = useState('AIzaSyCKaombiYOuj6morYry2-Ff2RqL3Q0E1sI');

  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Geolocation fetched:', position.coords); 
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setError('Unable to retrieve your location.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const searchPostOffices = async (lat, lon) => {
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=5000&type=post_office&key=${googleApiKey}`;

    try {
      const response = await axios.get(placesUrl);
      console.log('Google Places API response:', response.data); 

      const data = response.data.results;
      if (data.length > 0) {
        const sortedPostOffices = data.map((office) => {
          const distance = calculateDistance(lat, lon, office.geometry.location.lat, office.geometry.location.lng);
          return { ...office, distance };
        }).sort((a, b) => a.distance - b.distance);

        console.log('Sorted post offices:', sortedPostOffices); 

        setPostOffices([sortedPostOffices[0]]); 
      } else {
        setError('No post offices found near your location.');
      }
    } catch (err) {
      console.error('Error fetching post offices:', err); 
      setError('Error fetching post office data. Please try again.');
    }
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPostOffices([]);
    setIsLoading(true);

    try {
      if (location) {
        await searchPostOffices(location.latitude, location.longitude);
      } else if (pincode) {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = response.data[0];
        if (data.Status === 'Success') {
          setPostOffices(data.PostOffice || []);
        } else {
          setError('No post offices found for the given pincode.');
        }
      } else if (city) {
        const response = await axios.get(`https://api.postalpincode.in/postoffice/${city}`);
        const data = response.data[0];
        if (data.Status === 'Success') {
          setPostOffices(data.PostOffice || []);
        } else {
          setError('No post offices found for the given city.');
        }
      } else {
        setError('Please enter a valid pincode or select a state and city.');
      }
    } catch (err) {
      console.error('Error in search:', err);
      setError('Error fetching post office data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setState('');
    setCity('');
    setPincode('');
    setPostOffices([]);
    setError('');
    setLocation(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <p className="text-sm">
            You are here: <Link href="/" className="text-blue-600 hover:underline">Home</Link> {'>'} Locate Post Office
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <Sidebar />
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Locate Post Office</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm">* Indicates a required field.</p>

                <div className="space-y-2">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="state"
                    value={state}
                    onChange={handleStateChange}
                    className="mt-1 border block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
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
                  />
                </div>
                <h1 className='w-full text-center text-xl font-semibold'>Or</h1>
                <div className="space-y-2">
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
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

            {postOffices.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Nearest Post Office:</h2>
                <ul className="mt-4 space-y-4">
                  {postOffices.map((office, index) => (
                    <li key={index} className="p-4 border rounded-md bg-green-100 text-green-700">
                      <p><strong>Name:</strong> {office.Name}</p>
                      <p><strong>Branch Type:</strong> {office.BranchType}</p>
                      <p><strong>District:</strong> {office.District}</p>
                      <p><strong>State:</strong> {office.State}</p>
                      <p><strong>Pincode:</strong> {office.Pincode}</p>
                    </li>
                  ))}
                </ul>
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
