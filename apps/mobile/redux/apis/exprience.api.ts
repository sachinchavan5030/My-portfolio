import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ABOUT_CREATE_REQUEST, ABOUT_CREATE_RESPONSE, ABOUT_DELETE_REQUEST, ABOUT_DELETE_RESPONSE, ABOUT_READ_REQUEST, ABOUT_READ_RESPONSE, ABOUT_UPDATE_REQUEST, ABOUT_UPDATE_RESPONSE, EXPRIENCE_DELETE_REQUEST, EXPRIENCE_DELETE_RESPONSE, EXPRIENCE_READ_REQUEST, EXPRIENCE_READ_RESPONSE, EXPRIENCE_UPDATE_RESPONSE } from '@repo/types'
import { env } from "../../config/env"
export const exprienceApi = createApi({
    reducerPath: "exprienceApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${env.APP_URL}/api/exprience`, credentials: "include" }),
    tagTypes: ["exprience"],
    endpoints: (builder) => {
        return {
            getExprience: builder.query<EXPRIENCE_READ_RESPONSE, EXPRIENCE_READ_REQUEST>({
                query: () => {
                    return {
                        url: "/exprience-read",
                        method: "GET"
                    }
                },
                providesTags: ["exprience"]
            }),
            addExprience: builder.mutation<EXPRIENCE_READ_REQUEST, FormData>({
                query: exprienceData => {
                    return {
                        url: "/exprience-create",
                        method: "POST",
                        body: exprienceData
                    }
                },
                invalidatesTags: ["exprience"]
            }),
            updateExprience: builder.mutation<EXPRIENCE_UPDATE_RESPONSE, { id: number, fd: FormData }>({
                query: exprienceData => {
                    return {
                        url: "/exprience-update/" + exprienceData.id,
                        method: "PUT",
                        body: exprienceData.fd
                    }
                },
                invalidatesTags: ["exprience"]
            }),
            deleteExprience: builder.mutation<EXPRIENCE_DELETE_RESPONSE, EXPRIENCE_DELETE_REQUEST>({
                query: exprienceData => {
                    return {
                        url: "/exprience-delete/" + exprienceData.id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["exprience"]
            }),

        }
    }
})

export const {
    useGetExprienceQuery,
    useAddExprienceMutation,
    useDeleteExprienceMutation,
    useUpdateExprienceMutation
} = exprienceApi
