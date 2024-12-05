import GoogleMap from './GoogleMap'
import Script from 'next/script'
export default function Home() {


  return (
      <main className=" px-4 sm:px-8 py-8 sm:py-4 ">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-1 ml-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
              <span className="text-sm">Get your post by</span>
            </div>
            <h1 className="text-5xl md:text-[8vw] font-semibold tracking-tight leading-0 ">Dak Madad</h1>
          </div>
          <div className="w-full md:w-1/2 ">
            <h2 className="text-xl font-semibold mb-4">Track Your Post.</h2>
            <input type="text" placeholder="Enter your text here" className="border w-[15em] md:w-[35vw] mb-3 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black/50"/>
            <button className='px-3 py-2 bg-red-800 text-white rounded-lg ml-3'>Submit</button>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2 mt-4">
                <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-red-700 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-red-900 border-2 border-white"></div>
              </div>
              <span className="text-md font-normal mt-3">170 Years of Trust, Speed, and Reach</span>
            </div>
          </div>
        </div>  
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 ">
          <div className="md:col-span-3 order-2 md:order-1">
            <h2 className="text-xl font-medium mb-4">India postal service</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-900 rounded-full" />
              <div className="w-8 h-8 bg-red-700 rounded-full" />
              <div className="w-8 h-8 bg-yellow-500 rounded-full" />
            </div>
            <p className="text-md text-gray-600 mb-6">
              Explore the breathtaking landscapes and natural wonders of Iceland with our guided tours.  Experience glaciers, volcanoes, and the Northern Lights. Experience glaciers, volcanoes, and the Northern Lights.
            </p>
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-medium mb-4">Pincode</h2>
              <div className="flex justify-between items-center mb-6">
                <button className='px-6 py-2 bg-yellow-500 rounded-lg font-medium text-white'>Get you Pin code</button>
              </div>
              <p className="text-sm text-gray-600">
                Discover the wonders of Iceland with our expertly guided tours. Experience glaciers, volcanoes, and the Northern Lights.
              </p>
            </div>
          </div>
          <div className="md:col-span-6 order-1 md:order-2">
            <div className="aspect-[3/2] overflow-hidden rounded-lg">
            <GoogleMap />
            </div>
          </div>
          <div className="md:col-span-3 order-3 flex flex-col gap-8">
          <div className="border border-2 rounded-xl p-6">
              <h2 className="text-xl font-medium mb-4">Calculate Postage</h2>
              <div className="flex justify-between items-center mb-6">
              <button className='px-6 py-2 bg-yellow-500 rounded-lg font-medium text-white'>Get you Pin code</button>
              </div>
              <p className="text-sm text-gray-600">
                Discover the wonders of Iceland with our expertly guided tours. Experience glaciers, volcanoes, and the Northern Lights.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-medium mb-4">Nearest Post Office</h2>
              <div className="flex justify-between items-center mb-6">
              <button className='px-6 py-2 bg-yellow-500 rounded-lg font-medium text-white'>Get you Pin code</button>
              </div>
              <p className="text-sm text-gray-600">
                Discover the wonders of Iceland with our expertly guided tours. Experience glaciers, volcanoes, and the Northern Lights.
              </p>
            </div>
          </div>
        </div>  
      </main>
  )
}