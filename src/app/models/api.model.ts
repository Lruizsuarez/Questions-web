export interface User {
  user_name: string;
  email: string;
  code: number;
  photo?: string;
  topic?: Topic;
  creation_date: Date;
  last_update_date: Date;
}


export interface Topic {
  _id?: string;
  name: string;
  numberId: number;
  icon: string;
  create_date: Date;
  last_update_date: Date;
}


export interface Course {
  _id?: string;
  title: string;
  owner?: User;
  topic: Topic;
  description: string;
  create_date?: Date;
  last_update_date: Date;
  exams_count?: number;
  sections_count?: number;
  students_count?: number;
  questions_count?: number;
}

export interface Activity {
  activity: string;
  description: string;
  icon: string;
  activity_date: Date;
}

export interface HandledResponse {
  code: number;
  status: string;
  image?: string;
  additional_information?: any;
}
