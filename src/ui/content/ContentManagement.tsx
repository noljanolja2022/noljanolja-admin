import { useEffect, useState } from "react";
import { Box, Button, Stack } from "../widget/mui";
import { RSocket, RSocketConnector } from 'rsocket-core';
import { WebsocketClientTransport } from 'rsocket-websocket-client';


const client = new RSocketConnector({
    setup: {
        dataMimeType: "application/json",
        keepAlive: 1000000, // avoid sending during test
        lifetime: 100000,
        metadataMimeType: "application/json",
    },
    transport: new WebsocketClientTransport({
        url: 'ws://localhost:10081/rsocket',
        wsCreator: (url) => {
            return new WebSocket(url)
        }
    }),

})

export default function ContentManagement() {
    const [socket, setSocket] = useState<RSocket>();

    const onConnectSocket = () => {
        client.connect().then(res => {
            alert('conected')
            setSocket(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const onFireAndForget = () => {
        const route = "v1/videos"
        socket?.fireAndForget({
            data: null,
            metadata: Buffer.from(route, 'utf8')
        }, {
            onComplete() {

            },
            onError(err) {

            }
        })
    }

    return (
        <Stack p={2} gap={1}>
            Content Manager page
            <Button onClick={onConnectSocket}>Connect socket</Button>

            {socket && <>
                <Button onClick={onFireAndForget}>Send test message</Button>
            </>}
        </Stack>
    )
}