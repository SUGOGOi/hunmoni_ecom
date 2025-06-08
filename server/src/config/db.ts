import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

// Create a single, persistent pool instance
const pool = new Pool({
  connectionString: process.env.DB,
  ssl: { rejectUnauthorized: false }, // Remove this line if local DB without SSL
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // return error if connection takes > 2s
});

// Optional: log pool errors
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
