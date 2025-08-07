import { integer, pgTable, text, varchar, serial, timestamp } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mock_interviews", {
  id: serial("id").primaryKey(),
  jsonMockResponse: text("json_mock_response").notNull(),
  jobPosition: varchar("job_position").notNull(),
  jobDescription: text("job_description").notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  mockId: varchar("mock_id").notNull(),
});
