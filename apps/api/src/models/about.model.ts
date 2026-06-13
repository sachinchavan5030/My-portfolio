import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"


export const about = pgTable("about", {
   id: serial().primaryKey(),
   name: text().notNull(),
   email: text().notNull(),
   mobile: text().notNull(),
   password: text(),

   profilePic: text(),
   dob: timestamp(),
   location: text(),
   bio: text(),

   gitHubLink: text(),
   linkdinLink: text(),

})