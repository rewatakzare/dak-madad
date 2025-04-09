'use client';

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Adjust the path to your Firebase configuration
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "../Components/Sidebar";
import { FaTruck } from "react-icons/fa";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";

export default function TrackingPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trackingId = searchParams.get("page"); // Access query parameter 'page'
  const [isExpanded, setIsExpanded] = useState(true);
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPostId, setNewPostId] = useState(""); // New state for the "Track Another Package" input

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        if (!trackingId) {
          console.error("No tracking ID provided!");
          setLoading(false);
          return;
        }

        const docRef = doc(db, "post_details", trackingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTrackingData(docSnap.data());
          setError(null); // Reset error if document is found
        } else {
          setError("No such document!"); // Set error if document is not found
          setTrackingData(null); // Ensure no data is displayed
        }
      } catch (error) {
        console.error("Error fetching tracking data:", error);
        setError("An error occurred while fetching the data.");
      } finally {
        setLoading(false);
      }
    };

    if (trackingId) {
      fetchTrackingData();
    } else {
      console.log("No tracking ID in query parameter");
      setLoading(false); // End loading if no query parameter
    }
  }, [trackingId]);

  const handleTrackAnotherPackage = (e) => {
    e.preventDefault();
    if (!newPostId.trim()) {
      alert("Please enter a valid tracking number.");
      return;
    }
    router.push(`/Tracking?page=${newPostId}`);
    setNewPostId(""); // Clear input after navigation
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  if (!trackingData) {
    return (
      <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <p className="text-sm">
            You are here:{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>{" "}
            {">"} Track Package
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <Sidebar />
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        <FaTruck />
                      </span>
                      <span className="text-sm text-gray-600">Post ID</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-xl">
                  <h2 className="text-lg font-semibold mb-4">Track Package</h2>
                  <form onSubmit={handleTrackAnotherPackage} className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1">
                        Enter Tracking Number
                      </label>
                      <input
                        type="text"
                        value={newPostId}
                        onChange={(e) => setNewPostId(e.target.value)}
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
      </div>
    </div>
    );
  }

  const {
    curr_post_office_name,
    events,
    receiver_details,
    sender_details,
    status,
  } = trackingData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <p className="text-sm">
            You are here:{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>{" "}
            {">"} Track Package
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <Sidebar />
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        <FaTruck />
                      </span>
                      <span className="text-sm text-gray-600">Post ID</span>
                    </div>
                    <p className="font-semibold">#{receiver_details?.post_id}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-yellow-500 text-black-600 rounded-full text-sm">
                      {status}
                    </span>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="p-1 hover:bg-gray-100 rounded text-xl"
                    >
                      {isExpanded ? (
                        <IoIosArrowDropupCircle className="w-6 h-6" />
                      ) : (
                        <IoIosArrowDropdownCircle className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="space-y-6">
                    <h2 className="font-semibold text-lg">Package Events</h2>
                    {events?.length > 0 ? (
                      events.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="relative flex flex-col items-center">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                event.isLatest ? 'bg-red-800' : 'bg-gray-300'
                              }`}
                            />
                            {index !== events.length - 1 && (
                              <div className="w-0.5 h-full bg-gray-200 absolute top-3" />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="text-sm text-gray-600">
                              {event.date || 'N/A'}, {event.time || 'N/A'}
                            </div>
                            <div className="font-medium">{event.status || 'No status available'}</div>
                            <div className="text-sm text-gray-600">{event.location || 'N/A'}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No events to display.</div>
                    )}

                    <h2 className="font-semibold text-lg pt-4">Sender and Receiver Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium">Sender Details</h3>
                        <p>{sender_details?.Name}</p>
                        <p>{sender_details?.Address}</p>
                        <p>{sender_details?.PhoneNumber}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Receiver Details</h3>
                        <p>{receiver_details?.name}</p>
                        <p>{receiver_details?.address}</p>
                        <p>{receiver_details?.phone_number}</p>
                      </div>
                    </div>

                    <h2 className="font-semibold text-lg pt-4">Current Post Office</h2>
                    <p>{curr_post_office_name || 'Not available'}</p>
                  </div>
                )}

                <div className="bg-white p-6 rounded-lg shadow-xl">
                  <h2 className="text-lg font-semibold mb-4">Track Another Package</h2>
                  <form onSubmit={handleTrackAnotherPackage} className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1">
                        Enter Tracking Number
                      </label>
                      <input
                        type="text"
                        value={newPostId}
                        onChange={(e) => setNewPostId(e.target.value)}
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
      </div>
    </div>
  );
}