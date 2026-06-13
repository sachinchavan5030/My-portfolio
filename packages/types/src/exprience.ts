export interface EXPRIENCE_CREATE_REQUEST {
    id?: number
    exprienceYear: string
    projects: string
    happyClient: string
    technologies: string
    description: string
    resume: FileList
    doj: Date
    dor: Date
    companyName: string
    role: string
    eDesc: string
}
export type Exprience = {
    id?: number
    exprienceYear: string | null
    projects: string | null
    happyClient: string | null
    technologies: string | null
    description: string | null
    resume: string | null
    doj: Date | null
    dor: Date | null
    companyName: string | null
    role: string | null
    eDesc: string | null
}
export type EXPRIENCE_CREATE_RESPONSE = { message: string }

export type EXPRIENCE_READ_REQUEST = void
export type EXPRIENCE_READ_RESPONSE = {
    message: string,
    result?: Exprience[]
}

export interface EXPRIENCE_UPDATE_REQUEST extends EXPRIENCE_CREATE_REQUEST { id: number }
export type EXPRIENCE_UPDATE_RESPONSE = { message: string }

export type EXPRIENCE_DELETE_REQUEST = { id: number }
export type EXPRIENCE_DELETE_RESPONSE = { message: string }