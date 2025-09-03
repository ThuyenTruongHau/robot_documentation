export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  avatar?: string;
  bio?: string;
  date_of_birth?: string;
  is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
}
