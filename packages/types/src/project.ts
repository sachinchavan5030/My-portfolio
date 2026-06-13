export interface PROJECT_CREATE_REQUEST {
    id?: number
    title: string
    description: string
    gitLink: string
    liveLink: string


    projectImage: FileList

}
export type PROJECT_CREATE_RESPONSE = { message: string }

export type Project = {
    id?: number
    title: string | null
    description: string | null
    gitLink: string | null
    liveLink: string | null
    projectImage: string | null
}

export type PROJECT_READ_REQUEST = void
export type PROJECT_READ_RESPONSE = {
    message: string,
    result?: Project[]
}

export interface PROJECT_UPDATE_REQUEST extends PROJECT_CREATE_REQUEST { id?: number }
export type PROJECT_UPDATE_RESPONSE = { message: string }


export type PROJECT_DELETE_REQUEST = { id: number }
export type PROJECT_DELETE_RESPONSE = { message: string }

