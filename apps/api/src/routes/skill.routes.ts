
import { Router } from "express"
import { createSkill, deleteSkill, readSkill, updateSkill } from "../controller/skill.controller"
import { adminProtect } from "../middleware/admin.middleware"
const router = Router()

router
    .post("/skill-create", adminProtect, createSkill)
    .get("/skill-read", readSkill)
    .put("/skill-update/:eid", adminProtect, updateSkill)
    .delete("/skill-delete/:eid", adminProtect, deleteSkill)

export default router