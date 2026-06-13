import { LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT_REQUEST, LOGOUT_RESPONSE } from "@repo/types"
import { Request, Response } from "express"
import db from "../config/db"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { eq } from "drizzle-orm"
import { COOKIE_NAME, JWT_KEY, NODE_ENV, PRODUCTION } from "../config/env"
import { admin } from "../models"

export const login = async (req: Request<{}, {}, LOGIN_REQUEST>, res: Response<LOGIN_RESPONSE>) => {
    try {
        const { email, password } = req.body
        // console.log("LOGIN HIT");
        // console.log(req.body);
        const [result] = await db.select().from(admin).where(eq(admin.email, email))
        if (!result) {
            return res.status(401).json({ message: "invalid credentials" })
        }

        const verify = await bcryptjs.compare(password, result.password as string)

        if (!verify) {
            return res.status(401).json({ message: "invalid credentials" })
        }

        const token = jwt.sign({ id: result.id }, JWT_KEY, { expiresIn: "1d" })
        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            secure: NODE_ENV === PRODUCTION,
            sameSite: 'strict'
        })
        res.status(200).json({
            message: "login success", result: {
                id: result.id,
                email: result.email,
                mobile: result.mobile,
                name: result.name,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to login server error" })
    }
}

export const logout = (req: Request<{}, {}, LOGOUT_REQUEST>, res: Response<LOGOUT_RESPONSE>) => {
    try {
        res.clearCookie(COOKIE_NAME)
        res.status(200).json({ message: "logout success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to logout server error" })
    }
}