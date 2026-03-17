import { pgTable, serial, timestamp, varchar, text, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { createSchemaFactory } from "drizzle-zod"
import { z } from "zod"

export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// Pets table
export const pets = pgTable("pets", {
	id: serial().notNull().primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	species: varchar("species", { length: 50 }).notNull(),
	breed: varchar("breed", { length: 100 }),
	age: varchar("age", { length: 50 }),
	gender: varchar("gender", { length: 10 }).notNull().default('male'),
	weight: varchar("weight", { length: 20 }),
	avatar: text("avatar"),
	photos: text("photos"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// Zod schemas
const { createInsertSchema: createCoercedInsertSchema } = createSchemaFactory({
	coerce: { date: true },
});

export const insertPetSchema = createCoercedInsertSchema(pets).pick({
	name: true,
	species: true,
	breed: true,
	age: true,
	gender: true,
	weight: true,
	avatar: true,
	photos: true,
});

export const updatePetSchema = createCoercedInsertSchema(pets)
	.pick({
		name: true,
		species: true,
		breed: true,
		age: true,
		gender: true,
		weight: true,
		avatar: true,
		photos: true,
	})
	.partial();

// TypeScript types
export type Pet = typeof pets.$inferSelect;
export type InsertPet = z.infer<typeof insertPetSchema>;
export type UpdatePet = z.infer<typeof updatePetSchema>;
