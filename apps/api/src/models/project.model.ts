import { pgTable, serial, text } from "drizzle-orm/pg-core"


export const project = pgTable("project", {
    id: serial().primaryKey(),
    title: text(),
    description: text(),
    gitLink: text(),
    liveLink: text(),
    projectImage: text(),

})