import { APP_URL } from "@/config/env"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CREATE_SKILL_RESPONSE, CREATE_SKILL_REQUEST, DELETE_SKILL_REQUEST, DELETE_SKILL_RESPONSE, READ_SKILL_REQUEST, READ_SKILL_RESPONSE, UPDATE_SKILL_RESPONSE } from "@repo/types"
export const skillApi = createApi({
    reducerPath: "skillApi",
    baseQuery: fetchBaseQuery({ baseUrl: `/api/skill`, credentials: "include" }),
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
            addSkill: builder.mutation<CREATE_SKILL_RESPONSE, CREATE_SKILL_REQUEST>({
                query: skillData => {
                    return {
                        url: "/skill-create",
                        method: "POST",
                        body: skillData
                    }
                },
                invalidatesTags: ["skill"]
            }),
            updateSkill: builder.mutation<UPDATE_SKILL_RESPONSE, { id: number, body: CREATE_SKILL_REQUEST }>({
                query: skillData => {
                    return {
                        url: "/skill-update/" + skillData.id,
                        method: "PUT",
                        body: skillData.body
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