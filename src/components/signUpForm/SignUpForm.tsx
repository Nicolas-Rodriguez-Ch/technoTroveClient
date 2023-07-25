import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { FormValues } from "../../types/formInterfaces";
import InputField from "../inputField/InputField";

interface SignupPageProps {
  onSubmit: SubmitHandler<FormValues>;
}

const SignUpForm = ({ onSubmit }: SignupPageProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      description: "",
      contactInfo: [{ field: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contactInfo",
  });
  const BUTTON_CLASSNAME =
  "bg-custom-blue text-custom-mint border hover:bg-custom-mint hover:text-custom-blue p-1 font-bold m-4 text-sm sm:text-base";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-rigth gap-3 m-4"
    >
      <InputField
        register={register}
        id="fullName"
        label="Full Name"
        rules={{
          required: {
            value: true,
            message: "Full Name is required",
          },
        }}
        errors={errors.fullName}
      />
      <InputField
        register={register}
        id="email"
        label="Email"
        type="email"
        rules={{
          required: {
            value: true,
            message: "Email is required",
          },
        }}
        errors={errors.email}
      />
      <InputField
        register={register}
        id="password"
        label="Password"
        type="password"
        rules={{
          required: {
            value: true,
            message: "Password is required",
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message:
              "Password must be at least 8 characters long and contain at least one letter and one number",
          },
        }}
        errors={errors.password}
      />

      <InputField
        register={register}
        id="description"
        label="Description"
        type="textarea"
        rules={{
          required: {
            value: true,
            message: "Description is required",
          },
          minLength: {
            value: 20,
            message: "Description must be at least 20 characters long",
          },
          maxLength: {
            value: 500,
            message: "Description cannot exceed 500 characters",
          },
        }}
        errors={errors.description}
      />

      {fields.map((item, index) => (
        <InputField
          key={item.id}
          register={register}
          id={`contactInfo.${index + 1}`}
          label={`Contact Info ${index + 1}`}
          rules={{
            required: {
              value: true,
              message: "Contact Info is required",
            },
          }}
          errors={errors.contactInfo && errors.contactInfo[index]?.field}
        />
      ))}
      {fields.length < 5 && (
        <button
          type="button"
          className={`${BUTTON_CLASSNAME} `}
          onClick={() => append({ field: "" })}
        >
          Add Contact Info
        </button>
      )}
      {fields.length > 1 && (
        <button
          type="button"
          className={`${BUTTON_CLASSNAME}`}
          onClick={() => remove(fields.length - 1)}
        >
          Remove
        </button>
      )}
      <InputField
        register={register}
        id="image"
        label="Upload an image (optional)"
        type="file"
        accept=".png, .jpg, .jpeg"
      />
      <button type="submit" className={`${BUTTON_CLASSNAME}`}>
        Submit
      </button>
    </form>
  );
};
export default SignUpForm;
