import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

export default function AuthLayout() {
    const { user } = useAuth();

    return user ? <Navigate to="/" replace /> :(
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Outlet/>
        </div>
    );
}