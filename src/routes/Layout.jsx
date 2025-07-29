import React from "react";
import ResponsiveAppBar from "../components/ui/Navbar";
const Layout = ({ children }) => {
    return (
        <>
            <ResponsiveAppBar />
            <main>{children}</main>
        </>
    );
};

export default Layout;