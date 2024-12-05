'use client'

import { useEffect, useRef, useState } from 'react'

export default function GoogleMap({ apiKey }) {
  const mapRef = useRef(null)
  const [userLocation, setUserLocation] = useState(null)

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
        }
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
    }
  }, [])

  useEffect(() => {
    if (userLocation && mapRef.current) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCKaombiYOuj6morYry2-Ff2RqL3Q0E1sI&libraries=places`
      script.async = true
      script.onload = initMap
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    } 
  }, [apiKey, userLocation])

  function initMap() {
    const map = new google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 14,
    })

    const service = new google.maps.places.PlacesService(map)
    service.nearbySearch(
      {
        location: userLocation,
        radius: 5000,
        type: ['post_office']
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i], map)
          }
        }
      }
    )
  }

  function createMarker(place, map) {
    const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
    })

    google.maps.event.addListener(marker, 'click', () => {
      const infowindow = new google.maps.InfoWindow()
      infowindow.setContent(place.name)
      infowindow.open(map, marker)
    })
  }

  if (!userLocation) {
    return <div className="h-full flex items-center justify-center">Loading map...</div>
  }

  return <div ref={mapRef} className="w-full h-full" />
}

