export interface ContactInfo {
  field: string;
}

export interface FormValues {
  fullName: string;
  email: string;
  password: string;
  description: string;
  contactInfo: ContactInfo[];
  image: FileList;
}
export interface ProjectField {
  field: string;
}

export interface ProjectImageField {
  imageField: string;
}

export interface ProjectForm {
  title: string;
  description: string;
  links: ProjectField[];
  images: ProjectImageField[];
}
