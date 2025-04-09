'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function AwarenessPage() {
  const [activeTab, setActiveTab] = useState('addressing')

  return (
    <div className="min-h-screen rounded-3xl bg-[#FFF8DC]">
      <section className="py-20 px-4">
      <div className="text-center " data-scroll data-scroll-speed="1">
          <h2 className="text-6xl md:text-7xl font-bold mb-4 text-red-900">Postal Awareness</h2>
          <p className="text-xl mb-7 md:text-2xl">Understanding the basics of India Post services and proper addressing</p>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['addressing', 'services', 'guidelines','digipin'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-yellow-500 text-white'
                    : 'bg-white text-red-900 hover:bg-red-900 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="grid gap-12">
            {activeTab === 'addressing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <div className="bg-white p-8 rounded-3xl shadow-xl">
                  <h2 className="text-3xl font-bold text-[#8B4513] mb-6">How to Write an Address</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#8B4513] text-white rounded-full flex items-center justify-center font-bold">1</div>
                      <div>
                        <h3 className="font-semibold text-[#8B4513] mb-1">Recipient's Name</h3>
                        <p className="text-[#A52A2A]">Write the full name clearly on the first line</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#8B4513] text-white rounded-full flex items-center justify-center font-bold">2</div>
                      <div>
                        <h3 className="font-semibold text-[#8B4513] mb-1">Building & Street</h3>
                        <p className="text-[#A52A2A]">Include house/flat number and street name</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#8B4513] text-white rounded-full flex items-center justify-center font-bold">3</div>
                      <div>
                        <h3 className="font-semibold text-[#8B4513] mb-1">Area & Landmark</h3>
                        <p className="text-[#A52A2A]">Mention area name and nearby landmark</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#8B4513] text-white rounded-full flex items-center justify-center font-bold">4</div>
                      <div>
                        <h3 className="font-semibold text-[#8B4513] mb-1">City & PIN Code</h3>
                        <p className="text-[#A52A2A]">Write city name followed by correct 6-digit PIN code</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#8B4513] text-white rounded-full flex items-center justify-center font-bold">5</div>
                      <div>
                        <h3 className="font-semibold text-[#8B4513] mb-1">State & Country</h3>
                        <p className="text-[#A52A2A]">End with state name and country</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-white p-8 rounded-3xl shadow-xl h-full">
                    <h3 className="text-2xl font-bold text-[#8B4513] mb-6">Example Address Format</h3>
                    <div className="bg-[#FFF8DC] p-6 rounded-2xl font-mono space-y-2 text-[#8B4513]">
                      <p>Mr. Rajesh Kumar</p>
                      <p>Flat 404, Sunshine Apartments</p>
                      <p>123 MG Road, Near City Mall</p>
                      <p>Indore - 452001</p>
                      <p>Madhya Pradesh, India</p>
                    </div>
                    <div className="mt-8">
                      <h4 className="text-xl font-bold text-[#8B4513] mb-4">Important Tips</h4>
                      <ul className="list-disc list-inside space-y-2 text-[#A52A2A]">
                        <li>Write in clear, legible handwriting</li>
                        <li>Use block letters for PIN code</li>
                        <li>Include return address on the back</li>
                        <li>Avoid using abbreviations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-3 gap-8"
              >
                {[
                  {
                    title: 'Speed Post',
                    description: 'Express delivery service for time-sensitive items',
                    features: ['Track & Trace', 'Proof of Delivery', 'Insurance Coverage']
                  },
                  {
                    title: 'Registered Post',
                    description: 'Secure way to send important documents',
                    features: ['Acknowledgment', 'Signature Required', 'Compensation Available']
                  },
                  {
                    title: 'Money Order',
                    description: 'Send money safely across India',
                    features: ['Instant Transfer', 'Wide Network', 'Reliable Service']
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-white p-8 rounded-3xl shadow-xl">
                    <h3 className="text-2xl font-bold text-[#8B4513] mb-4">{service.title}</h3>
                    <p className="text-[#A52A2A] mb-6">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-[#8B4513]">
                          <svg className="w-5 h-5 text-[#A52A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}

          
            {activeTab === 'guidelines' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <div className="bg-white p-8 rounded-3xl shadow-xl">
                  <h2 className="text-3xl font-bold text-[#8B4513] mb-6">Packaging Guidelines</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-[#8B4513] mb-2">Documents</h3>
                      <p className="text-[#A52A2A]">Use strong envelopes and seal all edges properly</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#8B4513] mb-2">Fragile Items</h3>
                      <p className="text-[#A52A2A]">Use bubble wrap and mark package as 'FRAGILE'</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#8B4513] mb-2">Heavy Items</h3>
                      <p className="text-[#A52A2A]">Use strong boxes and reinforced packaging tape</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-xl">
                  <h2 className="text-3xl font-bold text-[#8B4513] mb-6">Prohibited Items</h2>
                  <ul className="space-y-4">
                    {[
                      'Dangerous goods and explosives',
                      'Perishable items',
                      'Currency and jewelry',
                      'Illegal substances',
                      'Live animals'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-[#A52A2A]">
                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'digipin' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl shadow-lg"
              >

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-[#8B4513] mb-4">What is DigiPin?</h3>
                    <h4 className="text-lg font-semibold text-[#8B4513] mb-2">Benefits of DigiPin:</h4>
                    <ul className="list-disc list-inside space-y-2 text-[#A52A2A] mb-4">
                      <li>Unique alphanumeric code for each address</li>
                      <li>Easy to remember and share</li>
                      <li>Enhances delivery accuracy</li>
                      <li>Protects privacy by not revealing full address</li>
                    </ul>
                  </div>
                  <div className="bg-[#FFF8DC] p-6 rounded-2xl">
                    <h3 className="text-xl font-semibold text-[#8B4513] mb-4">How to Get Your DigiPin</h3>
                    <ol className="space-y-4">
                      <li className="flex items-start gap-4">
                        <span className="w-8 h-8 bg-[#8B4513] text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                          <h4 className="font-semibold text-[#8B4513] mb-2">Visit the DigiPin Portal</h4>
                          <a href='https://digipin.cept.gov.in/' className="text-[#A52A2A] bg-yellow-200 px-4 py-2 rounded-xl">get your digipin</a>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="w-8 h-8 bg-[#8B4513] text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                          <h4 className="font-semibold text-[#8B4513]">Allow Your Address</h4>
                          <p className="text-[#A52A2A]">Click on allow and it will fetch your current location</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="w-8 h-8 bg-[#8B4513] text-white rounded-full flex items-center justify-center font-bold">3</span>
                        <div>
                          <h4 className="font-semibold text-[#8B4513]">Verify and Confirm</h4>
                          <p className="text-[#A52A2A]">Check the details and confirm your DigiPin</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </motion.div>
            )} 
          </div>
        </div>
      </section>
    </div>
  )
}

