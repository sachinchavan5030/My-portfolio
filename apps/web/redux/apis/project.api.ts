import { APP_URL } from "@/config/env"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { PROJECT_CREATE_REQUEST, PROJECT_CREATE_RESPONSE, PROJECT_DELETE_REQUEST, PROJECT_DELETE_RESPONSE, PROJECT_READ_REQUEST, PROJECT_READ_RESPONSE, PROJECT_UPDATE_RESPONSE } from '@repo/types'
export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({ baseUrl: `/api/project`, credentials: "include" }),
    tagTypes: ["project"],
    endpoints: (builder) => {
        return {
            getProject: builder.query<PROJECT_READ_RESPONSE, PROJECT_READ_REQUEST>({
                query: () => {
                    return {
                        url: "/project-read",
                        method: "GET"
                    }
                },
                providesTags: ["project"]
            }),
            addProject: builder.mutation<PROJECT_CREATE_RESPONSE, FormData>({
                query: projectData => {
                    return {
                        url: "/project-create",
                        method: "POST",
                        body: projectData
                    }
                },
                invalidatesTags: ["project"]
            }),
            updateProject: builder.mutation<PROJECT_UPDATE_RESPONSE, { id: number, fd: FormData }>({
                query: projectData => {
                    return {
                        url: "/project-update/" + projectData.id,
                        method: "PUT",
                        body: projectData.fd
                    }
                },
                invalidatesTags: ["project"]
            }),
            deleteProject: builder.mutation<PROJECT_DELETE_RESPONSE, PROJECT_DELETE_REQUEST>({
                query: projectData => {
                    return {
                        url: "/project-delete/" + projectData.id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["project"]
            }),

        }
    }
})

export const {
    useGetProjectQuery,
    useAddProjectMutation,
    useDeleteProjectMutation,
    useUpdateProjectMutation
} = projectApi
