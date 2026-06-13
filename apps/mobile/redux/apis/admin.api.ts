import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT_REQUEST, LOGOUT_RESPONSE } from "@repo/types"
import { env } from "../../config/env"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${env.APP_URL}/api`, credentials: "include" }),
    endpoints: (builder) => {
        return {
            signin: builder.mutation<LOGIN_RESPONSE, LOGIN_REQUEST>({
                query: userdata => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userdata
                    }
                },
            }),
            signout: builder.mutation<LOGOUT_RESPONSE, LOGOUT_REQUEST>({
                query: () => {
                    return {
                        url: "/logout",
                        method: "POST",
                    }
                },
            }),


        }
    }
})

export const { useSigninMutation, useSignoutMutation } = adminApi
