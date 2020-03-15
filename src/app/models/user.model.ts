export interface User {
  user_name: string;
  email: string;
  code: number;
  photoURL?: string;
  topic?: number;
  creation_date: Date;
  last_update_date: Date;
}


export interface Topic {
  name: string;
  numberId: number;
  icon: string;
  create_date: Date;
  last_update_date: Date;
}


export interface Course {
  _id: string;
  title: string;
  owner: User;
  topic: Topic;
  description: string;
  create_date: Date;
  last_update_date: Date;
}
