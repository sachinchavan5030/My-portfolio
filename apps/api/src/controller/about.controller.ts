import { Request, Response } from "express"
import { ABOUT_CREATE_REQUEST, ABOUT_CREATE_RESPONSE, ABOUT_DELETE_REQUEST, ABOUT_DELETE_RESPONSE, ABOUT_READ_REQUEST, ABOUT_READ_RESPONSE, ABOUT_UPDATE_REQUEST, ABOUT_UPDATE_RESPONSE } from '@repo/types'
import db from "../config/db"
import { profileUpload } from "../utilis/uplod"
import cloud from "../utilis/cloud"
import { about } from "../models"
import { eq } from "drizzle-orm"
import path from 'path'

interface multerRequest extends Request<any, {}, ABOUT_CREATE_REQUEST> {
    file: Express.Multer.File
}
interface updateMulterRequest extends Request<any, {}, ABOUT_UPDATE_REQUEST> {
    file: Express.Multer.File
}

export const createAbout = async (req: Request<{}, {}, ABOUT_CREATE_REQUEST>, res: Response<ABOUT_CREATE_RESPONSE>) => {
    try {
        const mreq = req as multerRequest
        profileUpload(mreq, res, async err => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: "unable to upload image" })
            }
            if (!mreq.file) {
                return res.status(400).json({ message: "profile image is required" })
            }
            const { bio, email, location, mobile, name, gitHubLink, linkdinLink } = mreq.body

            const { secure_url } = await cloud.uploader.upload(mreq.file.path)

            await db.insert(about).values({ dob: new Date(req.body.dob), profilePic: secure_url, bio, email, location, mobile, name, gitHubLink, linkdinLink })
            res.status(200).json({ message: "about create success" })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to about create " })
    }
}


export const readAbout = async (req: Request<{}, {}, ABOUT_READ_REQUEST>, res: Response<ABOUT_READ_RESPONSE>) => {
    try {
        const result = await db.select().from(about)
        res.status(200).json({ message: "about read success", result })//result
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to about read " })
    }
}


export const updateAbout = (req: Request<{}, {}, ABOUT_UPDATE_REQUEST>, res: Response<ABOUT_UPDATE_RESPONSE>) => {
    try {
        const mreq = req as updateMulterRequest
        profileUpload(mreq, res, async err => {
            if (err) {
                return res.status(400).json({ message: "unable to upload image" })
            }
            const { eid } = mreq.params
            const [result] = await db.select().from(about).where(eq(about.id, eid))
            if (!result) {
                return res.status(400).json({ message: "invalid user id" })
            }
            if (result.profilePic) {

                await cloud.uploader.destroy(path.basename(result.profilePic as string).split(".")[0] as string)
            }

            let imageURL
            if (mreq.file) {
                const { secure_url } = await cloud.uploader.upload(mreq.file.path)
                imageURL = secure_url
            }
            await db.update(about).set({
                ...mreq.body,
                dob: new Date(mreq.body.dob),
                profilePic: imageURL
            }).where(eq(about.id, eid))

            res.status(200).json({ message: "update about success" })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to update about" })
    }
}


export const deleteAbout = async (req: Request<{ eid: number }, {}, ABOUT_DELETE_REQUEST>, res: Response<ABOUT_DELETE_RESPONSE>) => {
    try {
        const { eid } = req.params
        await db.delete(about).where(eq(about.id, eid))
        res.status(200).json({ message: "about delete success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to about delete " })
    }
}