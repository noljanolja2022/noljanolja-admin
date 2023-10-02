import { Button, Stack } from "../widget/mui";

import { hasGrantedAnyScopeGoogle, useGoogleLogin } from "@react-oauth/google";




export default function ContentManagement() {

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
        <Stack p={2}>
            Content Manager page

            <Button onClick={() => login()}>Login with google</Button>
        </Stack>
    )
}