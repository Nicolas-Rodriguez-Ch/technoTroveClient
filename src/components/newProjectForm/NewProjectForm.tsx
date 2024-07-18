import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ProjectForm } from '../../types/formInterfaces';
import InputField from '../inputField/InputField';
import texts from '../../utils/texts';
import { createProject } from '../../services/projectAPI';
import { AppDispatch } from '../../store/store';
import { fetchUser } from '../../store/reducers/users/userSlice';
const NewProjectForm = () => {
  const distpatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProjectForm>({
    defaultValues: {
      title: '',
      description: '',
      links: [{ field: '' }],
      images: [{ imageField: '' }],
    },
  });
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

  const onSubmit: SubmitHandler<ProjectForm> = async (data) => {
    try {
      await createProject(data);
      reset();
      toast.success(texts.newProjectSuccess);
      setTimeout(()=> {
        distpatch(fetchUser());
      }, 5750)
    } catch (error) {
      toast.error(texts.newProjectError);
    }
  };
  const BUTTON_CLASSNAME =
    'bg-custom-blue text-custom-mint border hover:bg-custom-mint hover:text-custom-blue p-2 font-bold m-4 text-sm sm:text-base rounded-md';

  return (
    <>
      <ToastContainer />
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
          {fields.map((item, index) => (
            <div key={item.id} className="w-full">
              <InputField
                register={register}
                id={`links[${index}].field`}
                label={`${texts.newProjectLink} #${index + 1}`}
                placeHolder={texts.newProjectLinkPlaceHolder}
                rules={{
                  required: {
                    value: true,
                    message: texts.newProjectLinkError,
                  },
                }}
                errors={errors.links && errors.links[index]?.field}
              />
              {index === fields.length - 1 && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    className={`${BUTTON_CLASSNAME}`}
                    onClick={() => append({ field: '' })}
                  >
                    {texts.newProjectAddLink}
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
                label={`${texts.newProjectImage} #${index + 1}`}
                type="file"
                placeHolder={texts.newProjectImagePlaceHolder}
                rules={{
                  required: {
                    value: true,
                    message: texts.newProjectImageError,
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
        <div className="w-full flex justify-center mt-4">
          <button type="submit" className={`${BUTTON_CLASSNAME}`}>
            {texts.submit}
          </button>
        </div>
      </form>
    </>
  );
};

export default NewProjectForm;
