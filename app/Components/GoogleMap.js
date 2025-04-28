'use client'

import { useEffect, useRef, useState } from 'react'

export default function GoogleMap() {
  const mapRef = useRef(null)
  const [userLocation, setUserLocation] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [postOffices, setPostOffices] = useState([])
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error("Error getting user location:", error)
          // Default to a location if geolocation fails
          setUserLocation({ lat: 28.6139, lng: 77.2090 }) // Default to Delhi, India
        }
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
      setUserLocation({ lat: 28.6139, lng: 77.2090 }) // Default to Delhi, India
    }
  }, [])

  useEffect(() => {
    // Only load the map if we have a user location and the map isn't already loaded
    if (userLocation && mapRef.current && !mapLoaded) {
      // Check if Google Maps API is already loaded
      if (window.google && window.google.maps) {
        initMap()
        return
      }
      
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.id = 'googleMapsScript'
      script.onload = () => {
        console.log('Google Maps script loaded')
        setMapLoaded(true)
        initMap()
      }
      script.onerror = (error) => {
        console.error('Error loading Google Maps script:', error)
      }
      document.head.appendChild(script)

      return () => {
        const existingScript = document.getElementById('googleMapsScript')
        if (existingScript) {
          document.head.removeChild(existingScript)
        }
      }
    }
  }, [userLocation, mapLoaded])

  function initMap() {
    console.log('Initializing map with user location:', userLocation)
    try {
      const map = new google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 14,
      })

      // Add a marker for user's location
      new google.maps.Marker({
        position: userLocation,
        map: map,
        title: 'Your Location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      })

      // Search for post offices
      const service = new google.maps.places.PlacesService(map)
      console.log('Searching for post offices near:', userLocation)
      service.nearbySearch(
        {
          location: userLocation,
          radius: 5000,
          type: ['post_office']
        },
        (results, status) => {
          console.log('Places API response status:', status)
          console.log('Found post offices:', results)
          
          if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            setPostOffices(results)
            for (let i = 0; i < results.length; i++) {
              createMarker(results[i], map)
            }
          } else {
            console.error('No post offices found or Places API error:', status)
          }
        }
      )
    } catch (error) {
      console.error('Error initializing map:', error)
    }
  }

  function createMarker(place, map) {
    try {
      console.log('Creating marker for:', place.name, place.geometry?.location)
      
      if (!place.geometry || !place.geometry.location) {
        console.error('Invalid place geometry:', place)
        return
      }
      
      const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        }
      })

      google.maps.event.addListener(marker, 'click', () => {
        const infowindow = new google.maps.InfoWindow()
        infowindow.setContent(`<div><strong>${place.name}</strong><br>${place.vicinity || ''}</div>`)
        infowindow.open(map, marker)
      })
      
      return marker
    } catch (error) {
      console.error('Error creating marker:', error)
      return null
    }
  }

  if (!userLocation) {
    return <div className="h-full flex items-center justify-center">Loading map...</div>
  }

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" />
      {postOffices.length > 0 && (
        <div className="absolute bottom-2 left-2 bg-white p-2 rounded-md shadow-md text-xs">
          <p className="font-bold">Found {postOffices.length} post offices nearby</p>
        </div>
      )}
    </div>
  )
}

