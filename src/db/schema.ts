import {
	integer,
	pgTable,
	text,
	varchar,
	serial,
	timestamp,
	uuid,
	index,
} from "drizzle-orm/pg-core";

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

export const InterviewAnswer = pgTable("interview_answers", {
	id: serial("id").primaryKey(),
	mockIdRef: varchar("mock_id_ref").notNull(),
	question: varchar("question").notNull(),
	correctAns: varchar("correct_answer").notNull(),
	answer: varchar("answer").notNull(),
	feedback: varchar("feedback").notNull(),
	rating: varchar("rating").notNull(),
	userEmail: varchar("user_email").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userAnswer = pgTable(
	"user_answer",
	{
		// Primary key
		id: uuid("id").defaultRandom().primaryKey(),

		// Foreign keys
		mockIdRef: varchar("mock_id_ref", { length: 255 }).notNull(), // References interview/mock ID
		userEmail: varchar("user_email", { length: 255 }).notNull(), // User identifier

		// Question details
		question: text("question").notNull(), // The interview question
		correctAns: text("correct_ans"), // Expected/ideal answer (optional)
		userAns: text("user_ans"), // User's actual answer

		// Question metadata
		questionIndex: integer("question_index").notNull(), // 0, 1, 2, etc.

		// AI Feedback
		feedback: text("feedback"), // AI-generated feedback
		rating: varchar("rating").notNull(),

		// Timestamps
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => ({
		// Indexes for better query performance
		mockIdRefIdx: index("mock_id_ref_idx").on(table.mockIdRef),
		userEmailIdx: index("user_email_idx").on(table.userEmail),
		questionIndexIdx: index("question_index_idx").on(table.questionIndex),
		// Compound index for finding user's answers for specific interview
		userMockIdx: index("user_mock_idx").on(
			table.userEmail,
			table.mockIdRef
		),
	})
);
