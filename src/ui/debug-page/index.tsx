import { RSocket, RSocketConnector } from "rsocket-core";
import { Button, Stack, TextField } from "../widget/mui";

import { hasGrantedAnyScopeGoogle, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { WellKnownMimeType, encodeCompositeMetadata, encodeRoute } from "rsocket-composite-metadata";
import { WebsocketClientTransport } from "rsocket-websocket-client";



function constructMetadata(route: string) {
    const map = new Map<WellKnownMimeType, Buffer>();
    map.set(WellKnownMimeType.MESSAGE_RSOCKET_ROUTING, encodeRoute(route));
    return encodeCompositeMetadata(map);
}

const client = new RSocketConnector({
    setup: {
        dataMimeType: WellKnownMimeType.APPLICATION_JSON.string,
        keepAlive: 1000000, // avoid sending during test
        lifetime: 100000,
        metadataMimeType: WellKnownMimeType.MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
    },
    transport: new WebsocketClientTransport({
        url: 'ws://localhost:10081/rsocket',
        wsCreator: (url) => new WebSocket(url)
    }),

})

export default function DebugPage() {
    const [socket, setSocket] = useState<RSocket>();
    const [socketRoute, setSocketRoute] = useState<string>('');
    const [socketData, setSocketData] = useState<string>('');

    const onConnectSocket = () => {
        client.connect().then(res => {
            setSocket(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const onFireAndForget = () => {
        if (!socketData && !socketRoute) {
            alert('Fill both route and data first')
            return;
        }
        // const route = "v1/videos"
        socket?.fireAndForget({
            data: Buffer.from(JSON.stringify(socketData)),
            // metadata: Buffer.concat([
            //     Buffer.from(String.fromCharCode(socketRoute.length)),
            //     Buffer.from(socketRoute),
            // ]),
            metadata: constructMetadata(socketRoute)
        }, {
            onComplete() {
                console.log('done')
            },
            onError(err) {
                console.log(err)
            }
        })
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            const test = hasGrantedAnyScopeGoogle(
                codeResponse, 'https://www.googleapis.com/auth/youtube.force-ssl'
            )
            console.log(test)
            console.log(codeResponse.access_token)
            // if (codeResponse) {
            //     axiosClient.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
            //         headers: {
            //             Authorization: `Bearer ${codeResponse.access_token}`,
            //             Accept: 'application/json'
            //         }
            //     }).then(res => {
            //         console.log(res)
            //     })
            // }
        },
        onError: (error) => console.log('Login Failed:', error),
        scope: 'https://www.googleapis.com/auth/youtube.force-ssl'
    });

    return (
        <Stack p={2} gap={4} minWidth={'50%'} maxWidth={'500px'}>
            <h3>Debug google login</h3>
            
            <Button onClick={() => login()}>Login with google</Button>

            <h3>Debug Rsocket</h3>
            <Button onClick={onConnectSocket}>Init socket connection</Button>
            {socket && <>
                <TextField label='Socket route' value={socketRoute} onChange={(e) => setSocketRoute(e.currentTarget.value)} />
                <TextField label='Socket payload' multiline rows={8}
                    value={socketData} onChange={(e) => setSocketData(e.currentTarget.value)} />

                <Button onClick={onFireAndForget}>Send test message</Button>
            </>}
        </Stack>
    )
}