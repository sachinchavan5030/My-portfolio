import { Request, Response } from "express"
import db from "../config/db"
import cloud from "../utilis/cloud"
import { eq } from "drizzle-orm"
import path from 'path'
import { PROJECT_CREATE_REQUEST, PROJECT_CREATE_RESPONSE, PROJECT_DELETE_REQUEST, PROJECT_DELETE_RESPONSE, PROJECT_READ_REQUEST, PROJECT_READ_RESPONSE, PROJECT_UPDATE_REQUEST, PROJECT_UPDATE_RESPONSE } from "@repo/types"
import { project } from "../models"
import { projectUpload } from "../utilis/uplod"

interface multerRequest extends Request<any, {}, PROJECT_CREATE_REQUEST> {
    file: Express.Multer.File
}
interface updateMulterRequest extends Request<any, {}, PROJECT_UPDATE_REQUEST> {
    file: Express.Multer.File
}

export const createProject = async (req: Request<{}, {}, PROJECT_CREATE_REQUEST>, res: Response<PROJECT_CREATE_RESPONSE>) => {
    try {
        const mreq = req as multerRequest
        projectUpload(mreq, res, async err => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: "unable to upload image" })
            }
            if (!mreq.file) {
                return res.status(400).json({ message: "resume image is required" })
            }
            const { description, title, gitLink, liveLink } = mreq.body

            const { secure_url } = await cloud.uploader.upload(mreq.file.path)

            await db.insert(project).values({ projectImage: secure_url, description, title, gitLink, liveLink })
            res.status(200).json({ message: "project create success" })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to project create " })
    }
}


export const readProject = async (req: Request<{}, {}, PROJECT_READ_REQUEST>, res: Response<PROJECT_READ_RESPONSE>) => {
    try {
        const result = await db.select().from(project)
        res.status(200).json({ message: "project read success", result })//result
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to project read " })
    }
}


export const updateProject = (req: Request<{}, {}, PROJECT_UPDATE_REQUEST>, res: Response<PROJECT_UPDATE_RESPONSE>) => {
    try {
        const mreq = req as updateMulterRequest
        projectUpload(mreq, res, async err => {
            if (err) {
                return res.status(400).json({ message: "unable to upload image" })
            }
            const { eid } = mreq.params
            const [result] = await db.select().from(project).where(eq(project.id, eid))
            if (!result) {
                return res.status(400).json({ message: "invalid user id" })
            }
            if (result.projectImage) {

                await cloud.uploader.destroy(path.basename(result.projectImage as string).split(".")[0] as string)
            }

            let imageURL
            if (mreq.file) {
                const { secure_url } = await cloud.uploader.upload(mreq.file.path)
                imageURL = secure_url
            }
            await db.update(project).set({
                ...mreq.body,
                projectImage: imageURL
            }).where(eq(project.id, eid))

            res.status(200).json({ message: "update project success" })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to update project" })
    }
}


export const deleteProject = async (req: Request<{ eid: number }, {}, PROJECT_DELETE_REQUEST>, res: Response<PROJECT_DELETE_RESPONSE>) => {
    try {
        const { eid } = req.params
        await db.delete(project).where(eq(project.id, eid))
        res.status(200).json({ message: "project delete success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to project delete " })
    }
}