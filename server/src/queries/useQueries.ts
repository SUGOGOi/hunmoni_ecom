import pool from "../config/db.js";
import { User } from "../models/useModel.js";

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query("SELECT * FROM user_account");
  return result.rows;
};

// Get user by ID
export const getUserById = async (userId: string): Promise<User | null> => {
  const result = await pool.query(
    "SELECT * FROM user_account WHERE user_id = $1",
    [userId]
  );
  return result.rows[0] || null;
};

// Create new user
export const createUser = async (user: User): Promise<User> => {
  const result = await pool.query(
    `INSERT INTO user_account (
      user_id, first_name, last_name, email, phone, password_hash, date_of_birth, gender,
      is_active, email_verified, phone_verified
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
    ) RETURNING *`,
    [
      user.user_id,
      user.first_name,
      user.last_name,
      user.email,
      user.phone,
      user.password_hash,
      user.date_of_birth,
      user.gender,
      user.is_active,
      user.email_verified,
      user.phone_verified,
    ]
  );
  return result.rows[0];
};

// Delete user
export const deleteUser = async (userId: string): Promise<void> => {
  await pool.query("DELETE FROM user_account WHERE user_id = $1", [userId]);
};
