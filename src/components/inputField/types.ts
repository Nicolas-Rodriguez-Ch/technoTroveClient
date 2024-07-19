import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

export interface InputFieldProps {
  register: UseFormRegister<any>;
  id: string;
  label: string;
  type?: string;
  rules?: RegisterOptions;
  errors?: FieldError;
  className?: string;
  accept?: string;
  placeHolder?: string;
  disabled?: boolean
  defaultValue?: string
}