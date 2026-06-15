import { Router } from "express"
import { createAbout, deleteAbout, readAbout, updateAbout } from "../controller/about.controller"
import { adminProtect } from "../middleware/admin.middleware"
const router = Router()

router
    .post("/about-create", adminProtect, createAbout)
    .get("/about-read", readAbout)
    .put("/about-update/:eid", adminProtect, updateAbout)
    .delete("/about-delete/:eid", adminProtect, deleteAbout)

export default router