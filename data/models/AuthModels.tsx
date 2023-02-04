export type GoogleAuthResponse = {
    access_token: string,
    authuser: string,
    expires_in: number,
    prompt: string,
    scope: string,
    token_type: string
}

export type GoogleProfile = {
    id: string,
    name: string,
    email: string,
    family_name: string,
    given_name: string,
    locale: string,
    picture: string,
    verified_email: boolean
}