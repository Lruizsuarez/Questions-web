export interface User {
  user_name: string;
  email: string;
  code: number;
  photo?: Photo;
  topic?: Topic;
  creation_date: Date;
  last_update_date: Date;
  last_token_date?: Date;
}

export interface Photo {
  content?: string;
  content_type?: string;
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

export interface Exam {
  course: Course | string;
  title: string;
  minimum_approve_questions: number;
  total_questions: number;
  sections: Section[] | string;
  create_date: Date;
  last_update_date: Date;
}

export interface Section {
  _id: string;
  title: string;
  type: number;
  context: string;
  image?: Photo;
  example?: Question | string;
  questions: Question[] | string;
  sharedOptions?: Option[] | string;
  questions_count?: number;
  create_date: Date;
  last_update_date: Date;
}

export interface Question {
  _id: string;
  question: string;
  options?: Option[] | string;
  answer?: Option | string;
}

export interface Option {
  _id: string;
  section?: Section | string;
  question?: Question | string;
  image?: string;
  text: string;
  answer?: boolean;
}

export interface HandledResponse {
  code: number;
  status: string;
  image?: string;
  additional_information?: any;
}
