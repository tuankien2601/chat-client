import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/sidebar"
import { useAuth } from "../contexts/auth-context"

export default function AppSidebarLayout({children}) {
    const { user } = useAuth();

    return user ? (
        <div className="flex h-screen bg-gray-100">
            <Sidebar/>
            <Outlet/>
        </div>
    ) : <Navigate to="/login" replace/>
}
