import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./apis/admin.api";
import { aboutApi } from "./apis/about.api";
import { exprienceApi } from "./apis/exprience.api";
import { projectApi } from "./apis/project.api";
import { skillApi } from "./apis/skill.api";
import { contactApi } from "./apis/contact.api";


const reduxStore = configureStore({
    reducer: {
        [adminApi.reducerPath]: adminApi.reducer,
        [aboutApi.reducerPath]: aboutApi.reducer,
        [exprienceApi.reducerPath]: exprienceApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [skillApi.reducerPath]: skillApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
    },
    middleware: def => def().concat(adminApi.middleware, aboutApi.middleware, skillApi.middleware, exprienceApi.middleware, projectApi.middleware, contactApi.middleware)
})

export default reduxStore