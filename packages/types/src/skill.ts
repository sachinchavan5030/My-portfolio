export type Skills = {
    id?: number
    skills: string | null
    skillIcon: string | null
}

export interface CREATE_SKILL_REQUEST {
    id?: number
    skills: string
    skillIcon: string
}
export type CREATE_SKILL_RESPONSE = {
    message: string
}

export type READ_SKILL_REQUEST = void
export type READ_SKILL_RESPONSE = {
    message: string,
    result?: Skills[]
}



export interface UPDATE_SKILL_REQUEST extends CREATE_SKILL_REQUEST {
    id: number
}
export type UPDATE_SKILL_RESPONSE = {
    message: string
}
export type DELETE_SKILL_REQUEST = {
    id: number
}
export type DELETE_SKILL_RESPONSE = {
    message: string
}