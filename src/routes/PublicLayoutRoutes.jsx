
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Layout from "./Layout";
import { validateToken } from "../services/api"; 
import logError from "../utils/logError";

const PublicLayoutRoutes = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const checkToken = async () => {
            
            if (!token) {
                return;
            }
            try {
                const response = await validateToken(token); 

                if (response.status !== 200) {
                    navigate("/");
                }
            } catch (err) {
                logError(err)
                navigate("/"); 
            }
        };

        checkToken();
    }, [navigate]);

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default PublicLayoutRoutes;
