import dotenv from "dotenv";

dotenv.config();

export const PORT = 5555;

export const MONGODB_URL = process.env.MONGODB_URL;
