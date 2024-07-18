import {
  ProjectField,
  ProjectForm as ProjectFormType,
  // ProjectImageField,
} from '../../types/formInterfaces';
import { useMatch } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import InputField from '../inputField/InputField';
import texts from '../../utils/texts';
import routePaths from '../../constants/routePaths';

interface ProjectFormProps {
  defaultValues: ProjectFormType;
  onSubmit: (data: ProjectFormType) => Promise<void>;
  disabled: boolean;
}
const ProjectForm = ({
  defaultValues,
  onSubmit,
  disabled,
}: ProjectFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectFormType>({
    defaultValues: {
      ...defaultValues,
      links: defaultValues.links.map((link) => ({
        field: link,
      })) as unknown as ProjectField[],
    },
  });
  const isEditMode = Boolean(useMatch(`${routePaths.editProject}/:id`));

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: 'images',
  });

  const BUTTON_CLASSNAME =
    'bg-custom-blue text-custom-mint border hover:bg-custom-mint hover:text-custom-blue p-2 font-bold m-4 text-sm sm:text-base rounded-md';
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 md:p-8 mx-auto flex flex-col md:flex-row md:flex-wrap justify-center items-center"
      >
        <h1 className="w-full text-center text-3xl md:text-4xl mb-6">
          {texts.newProjectFormTitle}
        </h1>
        <div className="w-full">
          <InputField
            register={register}
            id="title"
            label={texts.newProjectTitle}
            placeHolder={texts.newProjectTitle}
            disabled={disabled}
            rules={{
              required: {
                value: true,
                message: texts.newProjectTitleError,
              },
            }}
            errors={errors.title}
          />
        </div>
        <div className="w-full">
          <InputField
            register={register}
            id="description"
            label={texts.newProjectDescription}
            type="textarea"
            placeHolder={texts.newProjectDescriptionPlaceHolder}
            disabled={disabled}
            rules={{
              required: {
                value: true,
                message: texts.newProjectDescriptionError,
              },
              minLength: {
                value: 20,
                message: texts.newProjedctDescriptionErrorTwo,
              },
              maxLength: {
                value: 500,
                message: texts.newProjedctDescriptionErrorThree,
              },
            }}
            errors={errors.description}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4 md:mb-0">
          {defaultValues.images &&
            defaultValues.images.map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={image as unknown as string}
                  alt={`Previously uploaded image #${index + 1}`}
                  className="mb-4"
                />
              </div>
            ))}
          {isEditMode &&
            imageFields.map((item, index) => (
              <div key={item.id} className="w-full">
                <InputField
                  register={register}
                  id={`images[${index}].imageField`}
                  label={`${texts.newProjectImage} #${index + 1}`}
                  disabled={disabled}
                  type="file"
                  placeHolder={texts.newProjectImagePlaceHolder}
                  rules={{
                    required: false,
                  }}
                  defaultValue={
                    defaultValues.images[index] as unknown as string
                  }
                  errors={errors.images && errors.images[index]?.imageField}
                  accept=".png, .jpg, .jpeg"
                />
                {index === imageFields.length - 1 && (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className={`${BUTTON_CLASSNAME}`}
                      onClick={() => appendImage({ imageField: '' })}
                    >
                      {texts.newProjectImageAdd}
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
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4 md:mb-0">
          {fields.map((item, index) => (
            <div key={item.id} className="w-full">
              <InputField
                register={register}
                id={`links[${index}].field`}
                label={`${texts.newProjectLink} #${index + 1}`}
                placeHolder={texts.newProjectLinkPlaceHolder}
                disabled={disabled}
                rules={{
                  required: {
                    value: true,
                    message: texts.newProjectLinkError,
                  },
                }}
                errors={errors.links && errors.links[index]?.field}
                defaultValue={item.field}
              />
              {index === fields.length - 1 && (
                <div className="flex justify-center">
                  {isEditMode && (
                    <button
                      type="button"
                      className={`${BUTTON_CLASSNAME}`}
                      onClick={() => append({ field: '' })}
                    >
                      {texts.newProjectAddLink}
                    </button>
                  )}
                  {isEditMode && fields.length > 1 && (
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
        {isEditMode && (
          <button type="submit" className={`${BUTTON_CLASSNAME}`}>
            {texts.submit}
          </button>
        )}
      </form>
    </>
  );
};

export default ProjectForm;
