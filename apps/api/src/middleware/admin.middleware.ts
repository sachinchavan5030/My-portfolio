import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_KEY } from "../config/env";

export const adminProtect = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.ADMIN
    if (!token) {
        return res.status(401).json({ message: "un authoized access" })
    }
    jwt.verify(token, JWT_KEY, (err: any, decode: any) => {
        if (err) {
            return res.status(401).json({ messag: "invalid token" })
        }
        next()
    })
}