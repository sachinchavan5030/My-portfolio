import { Router } from "express"
import { createProject, deleteProject, readProject, updateProject } from "../controller/project.controller"
import { adminProtect } from "../middleware/admin.middleware"
const router = Router()

router
    .post("/project-create", adminProtect, createProject)
    .get("/project-read", readProject)
    .put("/project-update/:eid", adminProtect, updateProject)
    .delete("/project-delete/:eid", adminProtect, deleteProject)

export default router