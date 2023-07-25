import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { FormValues } from "../../types/formInterfaces";

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
  const INPUT_CLASSNAME = "p-1 text-custom-black";
  const BUTTON_CLASSNAME = "bg-custom-blue text-custom-mint border hover:bg-custom-mint hover:text-custom-blue p-1 font-bold";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-rigth gap-3"
    >
      <label htmlFor="fullName">Full Name</label>
      <input
        className={`${INPUT_CLASSNAME}`}
        id="fullName"
        {...register("fullName", {
          required: {
            value: true,
            message: "Full Name is required",
          },
        })}
      />
      <p className="text-red-600 text-sm">{errors.fullName?.message}</p>

      <label htmlFor="email">Email</label>
      <input
        className={`${INPUT_CLASSNAME}`}
        id="email"
        type="email"
        {...register("email", {
          required: {
            value: true,
            message: "Email is required",
          },
        })}
      />
      <p className="text-red-600 text-sm">{errors.email?.message}</p>

      <label htmlFor="password">Password</label>
      <input
        className={`${INPUT_CLASSNAME}`}
        id="password"
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password is required",
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message:
              "Password must be at least 8 characters long and contain at least one letter and one number",
          },
        })}
      />
      <p className="text-red-600 text-sm">{errors.password?.message}</p>

      <label htmlFor="description">Description</label>
      <textarea
        className={`${INPUT_CLASSNAME}`}
        id="description"
        {...register("description", {
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
        })}
      />
      <p className="text-red-600 text-sm">{errors.description?.message}</p>

      {fields.map((item, index) => (
        <div key={item.id} className="flex flex-col text-rigth gap-3">
          <label htmlFor={`contactInfo${index + 1}`}>
            Contact Info {index + 1}
          </label>
          <input
            className={`${INPUT_CLASSNAME}`}
            id={`contactInfo${index + 1}`}
            {...register(`contactInfo.${index}.field`, {
              required: {
                value: true,
                message: "Contact Info is required",
              },
            })}
          />
          <p className="text-red-600 text-sm">
            {errors.contactInfo && errors.contactInfo[index]?.field?.message}
          </p>
        </div>
      ))}
      {fields.length < 5 && (
        <button
          type="button"
          className={`${BUTTON_CLASSNAME}`}
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
      <label htmlFor="image" className="p-1 text-custom-black">
        Upload an image (optional)
      </label>
      <input
        id="image"
        type="file"
        {...register("image")}
        accept=".png, .jpg, .jpeg"
      />
      <button type="submit" className={`${BUTTON_CLASSNAME}`}>
        Submit
      </button>
    </form>
  );
};
export default SignUpForm;
