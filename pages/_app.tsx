import '../styles/global.css';
import React from "react";
import Head from 'next/head'

function App({ Component, pageProps }) {
    // This means it will either use the wrapper of the Component's layout declaration, or wrap it inside sitelayout (general)
    return (
        <Component {...pageProps} />
        // <AppContextProvider>
        //     <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID}>
        //         <Head>
        //             <meta name="title" content="Deverse World" />
        //             <meta name="description" content="Your portal to the endless virtual world experiences, owned by the users" />
        //             <meta name="keywords" content="metaverse, sandbox, unreal engine 5, deverse world, deverse, editor, building, simulation, gameplay, build game, develop game, creator, content, assets, nft, the sandbox, decentraland, roblox, multiverse, youtube, social, minecraft" />
        //             <meta property="og:site_name" content="Deverse World" />
        //             <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/deverse-357506.appspot.com/o/logo.webp?alt=media&token=67e233e2-fba3-4055-9050-41a2f36f759e" />
        //         </Head>
        //         {/* <noscript>
        //             <GTMHeader tagId={process.env.NEXT_PUBLIC_GTM} />
        //         </noscript> */}
        //         {/* <GoogleTagManager tagId={process.env.NEXT_PUBLIC_GTM} /> */}

               
        //     </GoogleOAuthProvider>
        // </AppContextProvider>
    )
}

export default App;
