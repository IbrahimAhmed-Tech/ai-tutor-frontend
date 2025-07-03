import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthLayoutRoutes from "./AuthLayoutRoutes";
import PublicLayoutRoutes from "./PublicLayoutRoutes";
import NotFoundPage from "../pages/notfound";
import SignInPage from "../pages/sigin";
import SignUpPage from "../pages/signup";
import HomePage from "../pages/home";
import DemoPage from "../pages/demo";



const MyRouter = () => {
    return (
        <Router>
            <Routes>

                <Route element={<AuthLayoutRoutes />}>
                     <Route path="/" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Route>

                <Route element={<PublicLayoutRoutes />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/demo" element={<DemoPage />} />
                </Route>



        
                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </Router>
    );
};

export default MyRouter;