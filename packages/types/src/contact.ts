
export type Contact = {
    id?: number
    name: string | null
    email: string | null
    msg: string | null

}

export interface CREATE_CONTACT_REQUEST {
    id?: number
    name: string
    email: string
    msg: string
}
export type CREATE_CONTACT_RESPONSE = {
    message: string
}

export type READ_CONTACT_REQUEST = void
export type READ_CONTACT_RESPONSE = {
    message: string,
    result?: Contact[]
}



export interface UPDATE_CONTACT_REQUEST extends CREATE_CONTACT_REQUEST {
    id: number
}
export type UPDATE_CONTACT_RESPONSE = {
    message: string
}
export type DELETE_CONTACT_REQUEST = {
    id: number
}
export type DELETE_CONTACT_RESPONSE = {
    message: string
}