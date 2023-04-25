import { useEffect, useState } from "react";
import { Box, Button } from "../widget/mui";
import { RSocket, RSocketConnector } from 'rsocket-core';
import {WebsocketClientTransport} from 'rsocket-websocket-client';

const client = new RSocketConnector({
    setup: {
        dataMimeType: 'text/plain',
        keepAlive: 1000000, // avoid sending during test
        lifetime: 100000,
        metadataMimeType: 'text/plain',
    },
    transport: new WebsocketClientTransport({
        url: 'ws://localhost:10081',
        // wsCreator: (url) => {

        // }
    }),
})

export default function ContentManagement() {
    const [socket, setSocket] = useState<RSocket>();

    const onConnectSocket = () => {
        client.connect().then(res => {
            alert('conected')
            setSocket(res)
        }).catch(err=> {
            alert(err)
        })
    }

    const onFireAndForget = () => {
        const route = "v1/videos"
        socket?.fireAndForget({
            data: Buffer.from('hey', 'utf8') ,
            metadata: Buffer.from(route, 'utf8') 
        }, {
            onComplete() {
                
            },
            onError(err) {

            }
        })
    }

    return (
        <Box p={2}>
            Content Manager page
            <Button onClick={onConnectSocket}>Connect socket</Button>

            {socket && <>
                <Button onClick={onFireAndForget}>Send test message</Button>
            </>}
        </Box>
    )
}