import { Router } from "express"
import { createContact, deleteContact, readContact, updateContact } from "../controller/contact.controller"
import { adminProtect } from "../middleware/admin.middleware"
const router = Router()

router
    .post("/contact-create", adminProtect, createContact)
    .get("/contact-read", readContact)
    .put("/contact-update/:eid", adminProtect, updateContact)
    .delete("/contact-delete/:eid", adminProtect, deleteContact)

export default router