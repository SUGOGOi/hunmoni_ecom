export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password_hash: string;
  date_of_birth?: Date;
  gender?: string;
  is_active: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  created_date: Date;
  updated_date: Date;
}
