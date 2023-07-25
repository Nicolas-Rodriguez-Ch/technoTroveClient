import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
interface InputFieldProps {
  register: UseFormRegister<any>;
  id: string;
  label: string;
  type?: string;
  rules?: RegisterOptions;
  errors?: FieldError;
  className?: string;
  accept?: string;
}
const InputField = ({
  register,
  id,
  label,
  type = "text",
  rules,
  errors,
  className = "p-1 text-custom-black",
  accept,
}: InputFieldProps) => {
  const Element = type === "textarea" ? "textarea" : "input";
  const extraProps = type === "file" ? { accept } : {};
  return (
    <section className="flex flex-col text-left gap-3 text-sm sm:text-base">
      <label htmlFor={id}>{label}</label>
      <Element
        className={className}
        id={id}
        type={type}
        {...register(id, rules)}
        {...extraProps}
      />
      <p className="text-red-600 text-xs sm:text-sm">{errors?.message}</p>
    </section>
  );
};

export default InputField;
