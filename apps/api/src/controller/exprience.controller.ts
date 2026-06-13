import { Request, Response } from "express"
import { EXPRIENCE_CREATE_REQUEST, EXPRIENCE_CREATE_RESPONSE, EXPRIENCE_DELETE_REQUEST, EXPRIENCE_DELETE_RESPONSE, EXPRIENCE_READ_REQUEST, EXPRIENCE_READ_RESPONSE, EXPRIENCE_UPDATE_REQUEST, EXPRIENCE_UPDATE_RESPONSE } from '@repo/types'
import db from "../config/db"
import { resumeUpload } from "../utilis/uplod"
import cloud from "../utilis/cloud"
import { exprience } from "../models"
import { eq } from "drizzle-orm"
import path from 'path'

interface multerRequest extends Request<any, {}, EXPRIENCE_CREATE_REQUEST> {
    file: Express.Multer.File
}
interface updateMulterRequest extends Request<any, {}, EXPRIENCE_UPDATE_REQUEST> {
    file: Express.Multer.File
}

export const createExprience = async (req: Request<{}, {}, EXPRIENCE_CREATE_REQUEST>, res: Response<EXPRIENCE_CREATE_RESPONSE>) => {
    try {
        const mreq = req as multerRequest
        resumeUpload(mreq, res, async err => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: "unable to upload image" })
            }
            if (!mreq.file) {
                return res.status(400).json({ message: "resume image is required" })
            }
            const { description, exprienceYear, happyClient, projects, technologies, companyName, eDesc, role } = mreq.body

            const { secure_url } = await cloud.uploader.upload(mreq.file.path)
            await db.insert(exprience).values({ resume: secure_url, doj: new Date(mreq.body.doj), dor: new Date(mreq.body.dor), description, exprienceYear, happyClient, projects, technologies, companyName, eDesc, role })
            res.status(200).json({ message: "exprience create success" })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to exprience create " })
    }
}


export const readExprience = async (req: Request<{}, {}, EXPRIENCE_READ_REQUEST>, res: Response<EXPRIENCE_READ_RESPONSE>) => {
    try {
        const result = await db.select().from(exprience)
        res.status(200).json({ message: "exprience read success", result })//result
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to exprience read " })
    }
}


export const updateExprience = (req: Request<{}, {}, EXPRIENCE_UPDATE_REQUEST>, res: Response<EXPRIENCE_UPDATE_RESPONSE>) => {
    try {
        const mreq = req as updateMulterRequest
        resumeUpload(mreq, res, async err => {
            if (err) {
                return res.status(400).json({ message: "unable to upload image" })
            }
            const { eid } = mreq.params
            const [result] = await db.select().from(exprience).where(eq(exprience.id, eid))
            if (!result) {
                return res.status(400).json({ message: "invalid user id" })
            }
            if (result.resume) {

                await cloud.uploader.destroy(path.basename(result.resume as string).split(".")[0] as string)
            }

            let imageURL
            if (mreq.file) {
                const { secure_url } = await cloud.uploader.upload(mreq.file.path)
                imageURL = secure_url
            }
            await db.update(exprience).set({
                ...mreq.body,
                doj: new Date(mreq.body.doj),
                dor: new Date(mreq.body.dor),
                resume: imageURL
            }).where(eq(exprience.id, eid))

            res.status(200).json({ message: "update exprience success" })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to update exprience" })
    }
}


export const deleteExprience = async (req: Request<{ eid: number }, {}, EXPRIENCE_DELETE_REQUEST>, res: Response<EXPRIENCE_DELETE_RESPONSE>) => {
    try {
        const { eid } = req.params
        await db.delete(exprience).where(eq(exprience.id, eid))
        res.status(200).json({ message: "exprience delete success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to exprience delete " })
    }
}