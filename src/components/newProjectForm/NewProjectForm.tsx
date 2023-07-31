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
    "bg-custom-blue text-custom-mint border hover:bg-custom-mint hover:text-custom-blue p-2 font-bold m-4 text-sm sm:text-base rounded-md";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 md:p-8 mx-auto flex flex-col md:flex-row md:flex-wrap justify-center items-center"
    >
      <h1 className="w-full text-center text-3xl md:text-4xl mb-6">title</h1>

      <div className="w-full">
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
      </div>

      <div className="w-full">
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
                "The project description must be at least 20 characters long",
            },
            maxLength: {
              value: 500,
              message:
                "Project description can't be longer than 500 characters long",
            },
          }}
          errors={errors.description}
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4 md:mb-0">
        {fields.map((item, index) => (
          <div key={item.id} className="w-full">
            <InputField
              register={register}
              id={`links[${index}].field`}
              label={`project link ${index + 1}`}
              placeHolder="Links associated with the project, can be repository, deploy link, etc"
              rules={{
                required: {
                  value: true,
                  message: "Link must be provided",
                },
              }}
              errors={errors.links && errors.links[index]?.field}
            />
            {index === fields.length - 1 && (
              <div className="flex justify-center">
                <button
                  type="button"
                  className={`${BUTTON_CLASSNAME}`}
                  onClick={() => append({ field: "" })}
                >
                  {texts.signUpAddButton}
                </button>
                {fields.length > 1 && (
                  <button
                    type="button"
                    className={`${BUTTON_CLASSNAME}`}
                    onClick={() => remove(index)}
                  >
                    {texts.remove}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4 md:mb-0">
        {imageFields.map((item, index) => (
          <div key={item.id} className="w-full">
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
            {index === imageFields.length - 1 && (
              <div className="flex justify-center">
                <button
                  type="button"
                  className={`${BUTTON_CLASSNAME}`}
                  onClick={() => appendImage({ imageField: "" })}
                >
                  {texts.signUpAddButton}
                </button>
                {imageFields.length > 1 && (
                  <button
                    type="button"
                    className={`${BUTTON_CLASSNAME}`}
                    onClick={() => removeImage(index)}
                  >
                    {texts.remove}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-4">
        <button type="submit" className={`${BUTTON_CLASSNAME}`}>
          {texts.submit}
        </button>
      </div>
    </form>
  );
};

export default NewProjectForm;
