import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"


export const exprience = pgTable("exprience", {
    id: serial().primaryKey(),
    exprienceYear: text(),
    projects: text(),
    happyClient: text(),
    technologies: text(),
    description: text(),
    resume: text(),

    doj: timestamp(),
    dor: timestamp(),
    companyName: text(),
    role: text(),
    eDesc: text()
})