import { config } from "dotenv";
config({ path: `.env` });

export const { DB_TYPE, DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_PORT ,PORT } = process.env;
 