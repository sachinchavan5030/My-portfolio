export type LOGIN_REQUEST = {
    email: string;
    password: string
}
export type LOGIN_RESPONSE = {
    message: string,
    result?: {
        id: number,
        name: string,
        email: string,
        mobile: string,
    }
}

export type LOGOUT_REQUEST = void
export type LOGOUT_RESPONSE = { message: string }