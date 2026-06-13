import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"


export const admin = pgTable("admin", {
    id: serial().primaryKey(),
    name: text().notNull(),
    email: text().notNull(),
    mobile: text().notNull(),
    password: text(),
})