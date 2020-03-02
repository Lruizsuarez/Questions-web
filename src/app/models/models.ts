export interface Question {
  id?: string;
  type_id: string;
  text: string;
}

export interface Topic {
  id?: string;
  name: string;
  image: string;
  description: string;
  course_count: Number;
}
