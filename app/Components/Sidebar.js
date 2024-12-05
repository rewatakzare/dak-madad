import Link from 'next/link'
import { PiCubeFocus } from "react-icons/pi";
import { SiGooglemaps } from "react-icons/si";
import { TbMapPinCode } from "react-icons/tb";
import { BsFillPostageFill } from "react-icons/bs";

export default function Sidebar() {
  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="bg-red-800 text-white p-3">
        <h2 className="text-lg font-semibold">Tools</h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-2">
          <li>
            <Link href="Tracking" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
            <PiCubeFocus className='w-5 h-5'/>
              Track Consignment
            </Link>
          </li>
          <li>
            <Link href="Postoffice" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
            <SiGooglemaps className='w-5 h-5'/>
              Locate Post Office
            </Link>
          </li>
          <li>
            <Link href="Pincode" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
            <TbMapPinCode className='w-5 h-5'/>
              Find Pincode
            </Link>
          </li>
          <li>
            <Link href="/calculate-postage" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
            <BsFillPostageFill className='w-5 h-5'/>
              Calculate Postage
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

