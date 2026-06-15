import express from "express"
import cors from "cors"
import { FRONTEND_URL } from "./config/env"
import adminRoutes from './routes/admin.route'
import aboutRoutes from './routes/about.routes'
import exprienceRoutes from './routes/exprience.routes'
import projectRoutes from './routes/project.routes'
import skillRoutes from './routes/skill.routes'
import contactRoutes from './routes/contact.routes'
import cookieparser from 'cookie-parser'
const app = express()

app.use(cookieparser())

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use("/api", adminRoutes)
app.use("/api/about", aboutRoutes)
app.use("/api/exprience", exprienceRoutes)
app.use("/api/project", projectRoutes)
app.use("/api/skill", skillRoutes)
app.use("/api/contact", contactRoutes)

app.get("/", (req, res) => {
    res.json({ message: "API running successfully" })
})
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app;