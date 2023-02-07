import '../styles/global.css';
import NProgress from 'nprogress';
import React from "react";
import Head from 'next/head';
import { Router } from 'next/router';
import RouteGuard from "../components/utils/RouteGuard";
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
