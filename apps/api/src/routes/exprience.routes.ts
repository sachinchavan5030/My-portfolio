import { Router } from "express"
import { createExprience, deleteExprience, readExprience, updateExprience } from "../controller/exprience.controller"
import { adminProtect } from "../middleware/admin.middleware"
const router = Router()

router
    .post("/exprience-create", adminProtect, createExprience)
    .get("/exprience-read", readExprience)
    .put("/exprience-update/:eid", adminProtect, updateExprience)
    .delete("/exprience-delete/:eid", adminProtect, deleteExprience)

export default router