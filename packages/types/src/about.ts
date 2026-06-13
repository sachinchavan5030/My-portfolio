export interface ABOUT_CREATE_REQUEST {
    id?: number
    name: string
    email: string
    mobile: string
    location: string
    bio: string
    dob: Date
    profilePic: FileList
    gitHubLink: string
    linkdinLink: string

}
export type ABOUT_CREATE_RESPONSE = { message: string }

export type About = {
    id?: number
    name: string
    email: string
    mobile: string
    location: string | null
    password: string | null
    bio: string | null
    dob: Date | null
    profilePic: string | null
    gitHubLink: string | null
    linkdinLink: string | null

}

export type ABOUT_READ_REQUEST = void
export type ABOUT_READ_RESPONSE = {
    message: string,
    result?: About[]
}

export interface ABOUT_UPDATE_REQUEST extends ABOUT_CREATE_REQUEST { id?: number }
export type ABOUT_UPDATE_RESPONSE = { message: string }


export type ABOUT_DELETE_REQUEST = { id: number }
export type ABOUT_DELETE_RESPONSE = { message: string }

