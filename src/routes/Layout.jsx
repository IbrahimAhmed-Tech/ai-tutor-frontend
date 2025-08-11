import React from "react";
import ResponsiveAppBar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer"; // Make sure this path is correct

const Layout = ({ children }) => {
    return (
        <>
            <ResponsiveAppBar />
            <main>{children}</main>
            {/* <Footer /> Footer appears at the bottom of every page */}
        </>
    );
};

export default Layout;
