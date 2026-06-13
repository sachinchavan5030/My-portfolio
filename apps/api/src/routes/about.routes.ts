import { Router } from "express"
import { createAbout, deleteAbout, readAbout, updateAbout } from "../controller/about.controller"
const router = Router()

router
    .post("/about-create", createAbout)
    .get("/about-read", readAbout)
    .put("/about-update/:eid", updateAbout)
    .delete("/about-delete/:eid", deleteAbout)

export default router