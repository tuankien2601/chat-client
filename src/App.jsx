import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/auth-context";
import AuthLayout from './layouts/auth-layout'
import AppSidebarLayout from './layouts/app-sidebar-layout'
import LoginPage from './pages/login'
import Home from './pages/home';

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthLayout title={"login"} description={""} />}>
                        <Route path="login" element={<LoginPage />} />
                    </Route>
                    <Route path="/" element={<AppSidebarLayout />}>
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
