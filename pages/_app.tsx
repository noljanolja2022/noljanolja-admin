import '../styles/global.css';
import React from "react";
import Head from 'next/head';
import RouteGuard from "../components/utils/RouteGuard";
function App({ Component, pageProps }) {
    const protectedRoutes = ['/'];
    // This means it will either use the wrapper of the Component's layout declaration, or wrap it inside sitelayout (general)
    return (
        <RouteGuard>
            <Component {...pageProps} />
        </RouteGuard>
    )
}

export default App;
