import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { ProjectForm } from "../../types/formInterfaces";
import InputField from "../inputField/InputField";
import texts from "../../utils/texts";
const NewProjectForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectForm>({
    defaultValues: {
      title: "",
      description: "",
      links: [{ field: "" }],
      images: [{ imageField: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const onSubmit: SubmitHandler<ProjectForm> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const BUTTON_CLASSNAME =
    "bg-custom-blue text-custom-mint border hover:bg-custom-mint hover:text-custom-blue p-1 font-bold m-4 text-sm sm:text-base";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 text-center">
      <h1>title</h1>
      <div>
        <InputField
          register={register}
          id="title"
          label="Project Title"
          placeHolder="New Project Title"
          rules={{
            required: {
              value: true,
              message: "A title must be provided",
            },
          }}
          errors={errors.title}
        />
        <InputField
          register={register}
          id="description"
          label="Project Description"
          type="textarea"
          placeHolder="Write a description for this project"
          rules={{
            required: {
              value: true,
              message: "Project must have a description",
            },
            minLength: {
              value: 20,
              message:
                "The project desctiption must be at leas 20 characters long",
            },
            maxLength: {
              value: 500,
              message:
                "Project description can't be longer than 500 characters long",
            },
          }}
          errors={errors.description}
        />
        {fields.map((item, index) => (
          <div key={item.id}>
            <InputField
              register={register}
              id={`links[${index}].field`}
              label={`project link ${index + 1}`}
              placeHolder="Links associated with the porject, can be reposository, deploy link, etc"
              rules={{
                required: {
                  value: true,
                  message: "Link must be provided",
                },
              }}
              errors={errors.links && errors.links[index]?.field}
            />
          </div>
        ))}
        <div className="w-full md:col-span-3 flex justify-center">
          {fields.length < 5 && (
            <button
              type="button"
              className={`${BUTTON_CLASSNAME}`}
              onClick={() => append({ field: "" })}
            >
              {texts.signUpAddButton}
            </button>
          )}

          {fields.length > 1 && (
            <button
              type="button"
              className={`${BUTTON_CLASSNAME}`}
              onClick={() => remove(fields.length - 1)}
            >
              {texts.remove}
            </button>
          )}
        </div>
        {imageFields.map((item, index) => (
          <div key={item.id}>
            <InputField
              register={register}
              id={`images[${index}].imageField`}
              label={`project image ${index + 1}`}
              type="file"
              placeHolder="Upload images associated with the project"
              rules={{
                required: {
                  value: true,
                  message: "An image file must be provided",
                },
              }}
              errors={errors.images && errors.images[index]?.imageField}
              accept=".png, .jpg, .jpeg"
            />
          </div>
        ))}

        <div className="w-full md:col-span-3 flex justify-center">
          {imageFields.length < 5 && (
            <button
              type="button"
              className={`${BUTTON_CLASSNAME}`}
              onClick={() => appendImage({ imageField: "" })}
            >
              {texts.signUpAddButton}
            </button>
          )}

          {imageFields.length > 1 && (
            <button
              type="button"
              className={`${BUTTON_CLASSNAME}`}
              onClick={() => removeImage(imageFields.length - 1)}
            >
              {texts.remove}
            </button>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-custom-red text-custom-mint font-bold rounded-lg p-2"
      >
        {texts.submit}
      </button>
    </form>
  );
};

export default NewProjectForm;
