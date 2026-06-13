
import { Router } from "express"
import { createSkill, deleteSkill, readSkill, updateSkill } from "../controller/skill.controller"
const router = Router()

router
    .post("/skill-create", createSkill)
    .get("/skill-read", readSkill)
    .put("/skill-update/:eid", updateSkill)
    .delete("/skill-delete/:eid", deleteSkill)

export default router