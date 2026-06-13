import { Router } from "express"
import { createProject, deleteProject, readProject, updateProject } from "../controller/project.controller"
const router = Router()

router
    .post("/project-create", createProject)
    .get("/project-read", readProject)
    .put("/project-update/:eid", updateProject)
    .delete("/project-delete/:eid", deleteProject)

export default router