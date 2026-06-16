import { pgTable, serial, text } from "drizzle-orm/pg-core"

export const skill = pgTable("skill", {
    id: serial().primaryKey(),
    skills: text(),
    skillImage: text(),
})