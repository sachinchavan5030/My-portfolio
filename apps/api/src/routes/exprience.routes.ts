import { Router } from "express"
import { createExprience, deleteExprience, readExprience, updateExprience } from "../controller/exprience.controller"
const router = Router()

router
    .post("/exprience-create", createExprience)
    .get("/exprience-read", readExprience)
    .put("/exprience-update/:eid", updateExprience)
    .delete("/exprience-delete/:eid", deleteExprience)

export default router