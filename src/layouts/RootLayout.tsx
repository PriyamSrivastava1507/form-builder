import Navbar from "@/components/Navbars/Navbar"
import { Outlet } from "react-router"

/**
 * @component
 * The root layout for the application, providing the main Navbar and an Outlet for nested routes.
 */
const RootLayout = () => { 
  return (
    <div className="h-screen w-screen bg-background overflow-x-hidden scrollbar-custom">
        <Navbar />
        <Outlet />
    </div>
  )
}

export default RootLayout