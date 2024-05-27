import { BrowserRouter, Routes as AppRoutes, Route } from "react-router-dom";
import { PrivateRoutes } from "../PrivateRoutes/PrivateRoutes";

import { DashBoard } from "../Pages/private/DashBoard";
import { Users } from "../Pages/private/Users";
import { LandingPageAdm } from "../Pages/private/LandingPageAdm";
import { Leads } from "../Pages/private/Leads";

import { Login } from "../Pages/open/Login";
import { LandingPage } from "../Pages/open/LandingPage";
import { Forgotpassword } from "../Pages/open/ForgotPassword";

export const Routes = () => {
    return (
        <BrowserRouter>
            <AppRoutes>
                <Route path="admin" element={<PrivateRoutes />}>
                    <Route path="/admin" element={<DashBoard />}></Route>
                    <Route path="usuarios" element={<Users />}></Route>
                    <Route path="landing-page" element={<LandingPageAdm />}></Route>
                    <Route path="leads" element={<Leads />}></Route>
                </Route>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="recuperar-senha" element={<Forgotpassword />}></Route>
            </AppRoutes>
        </BrowserRouter>
    )
}