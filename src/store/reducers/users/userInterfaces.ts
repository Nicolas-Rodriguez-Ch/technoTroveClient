export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  description: string;
  contactInfo: string[];
  profilePicture?: string;
  project: Project[];
  data?: any;
}
export interface LoginResponse {
  message: string;
  data: {
    email: string;
    fullName: string;
  };
  token: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  links: string[];
}

export interface UserState {
  data: null | User | LoginResponse;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  deleted: boolean;
}
