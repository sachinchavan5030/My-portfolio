import { Request, Response } from "express"
import db from "../config/db"
import { eq } from "drizzle-orm"
import { skill } from "../models"
import { CREATE_CONTACT_REQUEST, CREATE_CONTACT_RESPONSE, DELETE_CONTACT_REQUEST, DELETE_CONTACT_RESPONSE, READ_CONTACT_REQUEST, READ_CONTACT_RESPONSE, UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_RESPONSE } from "@repo/types"
import { sendEmail } from "../utilis/email"



export const createContact = async (req: Request<{}, {}, CREATE_CONTACT_REQUEST>, res: Response<CREATE_CONTACT_RESPONSE>) => {
    try {
        const { email, msg, name } = req.body
        await sendEmail({
            email: "chavansachin5030@gmail.com",
            subject: "New Contact Message",
            message: `
            Name: ${name}
            Email: ${email}
            Message: ${msg}
            `
        })
        await sendEmail({
            email: email,
            subject: "Thanks for contacting",
            message: `
            Hi ${name},

            Thank you for contacting me.
            I will get back to you soon.

            - Sachin
            `
        })

        await db.insert(skill).values({ name, email, msg })
        res.status(200).json({ message: "contact create success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to contact create " })
    }
}


export const readContact = async (req: Request<{}, {}, READ_CONTACT_REQUEST>, res: Response<READ_CONTACT_RESPONSE>) => {
    try {
        const result = await db.select().from(skill)
        res.status(200).json({ message: "contact read success", result })//result
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to contact read " })
    }
}


export const updateContact = async (req: Request<{ eid: number }, {}, UPDATE_CONTACT_REQUEST>, res: Response<UPDATE_CONTACT_RESPONSE>) => {
    const { eid } = req.params
    const { email, msg, name } = req.body
    try {
        await db.update(skill).set({ email, msg, name }).where(eq(skill.id, eid))
        res.status(200).json({ message: "update contact success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to update contact" })
    }
}


export const deleteContact = async (req: Request<{ eid: number }, {}, DELETE_CONTACT_REQUEST>, res: Response<DELETE_CONTACT_RESPONSE>) => {
    try {
        const { eid } = req.params
        await db.delete(skill).where(eq(skill.id, eid))
        res.status(200).json({ message: "contact delete success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to contact delete " })
    }
}