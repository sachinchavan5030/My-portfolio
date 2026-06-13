
import { Router } from "express"
import { createContact, deleteContact, readContact, updateContact } from "../controller/contact.controller"
const router = Router()

router
    .post("/contact-create", createContact)
    .get("/contact-read", readContact)
    .put("/contact-update/:eid", updateContact)
    .delete("/contact-delete/:eid", deleteContact)

export default router