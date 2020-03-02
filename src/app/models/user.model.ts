export interface User {
  user_name: string;
  email: string;
  code: number;
  photoURL?: string;
  topic?: number;
  creation_date: Date;
  last_update_date: Date;
}
