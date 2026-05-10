import Navbar from "@/components/Navbars/Navbar"
import { Outlet } from "react-router"

const RootLayout = () => { 
  return (
    <div className="h-screen w-screen bg-background overflow-x-hidden scrollbar-custom">
        <Navbar />
        <Outlet />
    </div>
  )
}

export default RootLayout