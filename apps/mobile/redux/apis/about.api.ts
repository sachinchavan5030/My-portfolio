import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ABOUT_CREATE_REQUEST, ABOUT_CREATE_RESPONSE, ABOUT_DELETE_REQUEST, ABOUT_DELETE_RESPONSE, ABOUT_READ_REQUEST, ABOUT_READ_RESPONSE, ABOUT_UPDATE_REQUEST, ABOUT_UPDATE_RESPONSE } from '@repo/types'
import { env } from "../../config/env"
export const aboutApi = createApi({
    reducerPath: "aboutApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${env.APP_URL}/api/about`, credentials: "include" }),
    tagTypes: ["about"],
    endpoints: (builder) => {
        return {
            getAbout: builder.query<ABOUT_READ_RESPONSE, ABOUT_READ_REQUEST>({
                query: () => {
                    return {
                        url: "/about-read",
                        method: "GET"
                    }
                },
                providesTags: ["about"]
            }),
            addAbout: builder.mutation<ABOUT_CREATE_RESPONSE, FormData>({
                query: aboutData => {
                    return {
                        url: "/about-create",
                        method: "POST",
                        body: aboutData
                    }
                },
                invalidatesTags: ["about"]
            }),
            updateAbout: builder.mutation<ABOUT_UPDATE_RESPONSE, { id: number, fd: FormData }>({
                query: aboutData => {
                    return {
                        url: "/about-update/" + aboutData.id,
                        method: "PUT",
                        body: aboutData.fd
                    }
                },
                invalidatesTags: ["about"]
            }),
            deleteAbout: builder.mutation<ABOUT_DELETE_RESPONSE, ABOUT_DELETE_REQUEST>({
                query: aboutData => {
                    return {
                        url: "/about-delete/" + aboutData.id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["about"]
            }),

        }
    }
})

export const {
    useGetAboutQuery,
    useAddAboutMutation,
    useDeleteAboutMutation,
    useUpdateAboutMutation
} = aboutApi
