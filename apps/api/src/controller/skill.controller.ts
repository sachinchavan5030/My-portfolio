import { Request, Response } from "express"
import db from "../config/db"
import { eq } from "drizzle-orm"
import { CREATE_SKILL_REQUEST, CREATE_SKILL_RESPONSE, DELETE_SKILL_REQUEST, DELETE_SKILL_RESPONSE, READ_SKILL_REQUEST, READ_SKILL_RESPONSE, UPDATE_SKILL_REQUEST, UPDATE_SKILL_RESPONSE } from "@repo/types"
import { skill } from "../models"



export const createSkill = async (req: Request<{}, {}, CREATE_SKILL_REQUEST>, res: Response<CREATE_SKILL_RESPONSE>) => {
    try {
        const { skills } = req.body
        await db.insert(skill).values({ skills })
        res.status(200).json({ message: "Skill create success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to Skill create " })
    }
}


export const readSkill = async (req: Request<{}, {}, READ_SKILL_REQUEST>, res: Response<READ_SKILL_RESPONSE>) => {
    try {
        const result = await db.select().from(skill)
        res.status(200).json({ message: "Skill read success", result })//result
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to Skill read " })
    }
}


export const updateSkill = async (req: Request<{ eid: number }, {}, UPDATE_SKILL_REQUEST>, res: Response<UPDATE_SKILL_RESPONSE>) => {
    const { eid } = req.params
    const { skills } = req.body
    try {
        await db.update(skill).set({ skills }).where(eq(skill.id, eid))
        res.status(200).json({ message: "update Skill success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to update Skill" })
    }
}


export const deleteSkill = async (req: Request<{ eid: number }, {}, DELETE_SKILL_REQUEST>, res: Response<DELETE_SKILL_RESPONSE>) => {
    try {
        const { eid } = req.params
        await db.delete(skill).where(eq(skill.id, eid))
        res.status(200).json({ message: "Skill delete success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to Skill delete " })
    }
}