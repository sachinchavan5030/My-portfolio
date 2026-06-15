import { APP_URL } from "@/config/env"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CREATE_CONTACT_REQUEST, CREATE_CONTACT_RESPONSE, DELETE_CONTACT_REQUEST, DELETE_CONTACT_RESPONSE, READ_CONTACT_REQUEST, READ_CONTACT_RESPONSE, UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_RESPONSE } from "@repo/types"
export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: `/api/contact`, credentials: "include" }),
    tagTypes: ["contact"],
    endpoints: (builder) => {
        return {
            getContact: builder.query<READ_CONTACT_RESPONSE, READ_CONTACT_REQUEST>({
                query: () => {
                    return {
                        url: "/contact-read",
                        method: "GET"
                    }
                },
                providesTags: ["contact"]
            }),
            addContact: builder.mutation<CREATE_CONTACT_RESPONSE, CREATE_CONTACT_REQUEST>({
                query: contactData => {
                    return {
                        url: "/contact-create",
                        method: "POST",
                        body: contactData
                    }
                },
                invalidatesTags: ["contact"]
            }),
            updateContact: builder.mutation<UPDATE_CONTACT_RESPONSE, UPDATE_CONTACT_REQUEST>({
                query: contactData => {
                    return {
                        url: "/contact-update/" + contactData.id,
                        method: "PUT",
                        body: contactData
                    }
                },
                invalidatesTags: ["contact"]
            }),
            deleteContact: builder.mutation<DELETE_CONTACT_RESPONSE, DELETE_CONTACT_REQUEST>({
                query: contactData => {
                    return {
                        url: "/contact-delete/" + contactData.id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["contact"]
            }),

        }
    }
})

export const {
    useGetContactQuery,
    useAddContactMutation,
    useDeleteContactMutation,
    useUpdateContactMutation
} = contactApi
