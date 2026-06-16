import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CREATE_SKILL_RESPONSE, DELETE_SKILL_REQUEST, DELETE_SKILL_RESPONSE, READ_SKILL_REQUEST, READ_SKILL_RESPONSE, UPDATE_SKILL_RESPONSE } from "@repo/types"
import { env } from "../../config/env"
export const skillApi = createApi({
    reducerPath: "skillApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${env.APP_URL}/api/skill`, credentials: "include" }),
    tagTypes: ["skill"],
    endpoints: (builder) => {
        return {
            getSkill: builder.query<READ_SKILL_RESPONSE, READ_SKILL_REQUEST>({
                query: () => {
                    return {
                        url: "/skill-read",
                        method: "GET"
                    }
                },
                providesTags: ["skill"]
            }),
            addSkill: builder.mutation<CREATE_SKILL_RESPONSE, FormData>({
                query: skillData => {
                    return {
                        url: "/skill-create",
                        method: "POST",
                        body: skillData
                    }
                },
                invalidatesTags: ["skill"]
            }),
            updateSkill: builder.mutation<UPDATE_SKILL_RESPONSE, { id: number, fd: FormData }>({
                query: skillData => {
                    return {
                        url: "/skill-update/" + skillData.id,
                        method: "PUT",
                        body: skillData.fd
                    }
                },
                invalidatesTags: ["skill"]
            }),
            deleteSkill: builder.mutation<DELETE_SKILL_RESPONSE, DELETE_SKILL_REQUEST>({
                query: skillData => {
                    return {
                        url: "/skill-delete/" + skillData.id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["skill"]
            }),

        }
    }
})

export const {
    useGetSkillQuery,
    useAddSkillMutation,
    useDeleteSkillMutation,
    useUpdateSkillMutation
} = skillApi