
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
