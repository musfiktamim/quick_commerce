import {drizzle} from "drizzle-orm/postgres-js"
import postgres from "postgres"

const quesryString = process.env.DATABASE_URL as string;

export const connection = postgres(quesryString);

export const db = drizzle(connection);