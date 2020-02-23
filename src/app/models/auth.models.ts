export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  bearer: string;
  data: AuthUserResponse;
}

export interface AuthUserResponse {
  user_name: string;
  email: string;
  permissions: AuthAccess;
  last_login_date: Date;
}

export interface AuthAccess {
  role_description: boolean;
  permission_create_course: boolean;
  permission_update_course: boolean;
  permission_delete_course: boolean;
  permission_course_detail: boolean;
  permission_create_question: boolean;
  permission_update_question: boolean;
  permission_delete_question: boolean;
  permission_create_test: boolean;
  permission_update_test: boolean;
  permission_delete_test: boolean;
  permission_enroll_course: boolean;
  permission_create_users: boolean;
  permission_view_general_statistics: boolean;
  permission_view_user_statistics: boolean;
}
