import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { FormValues } from '../../types/formInterfaces';
import InputField from '../inputField/InputField';
import texts from '../../utils/texts';
import { FiUser } from 'react-icons/fi';
import { User } from '../../store/reducers/users/userInterfaces';

interface UpdatePageProps {
  submitUserUpdate: SubmitHandler<FormValues>;
  user: User;
}

const UpdateUserForm = ({ submitUserUpdate, user }: UpdatePageProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: user.data.fullName,
      email: user.data.email,
      description: user.data.description,
      contactInfo: user.data.contactInfo.map((info: string) => ({ field: info })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contactInfo',
  });

  const BUTTON_CLASSNAME =
    'bg-custom-blue text-custom-mint border hover:bg-custom-mint hover:text-custom-blue p-1 font-bold m-4 text-sm sm:text-base';

  return (
    <form
      onSubmit={handleSubmit(submitUserUpdate)}
      className="flex flex-col text-right gap-4 m-4 md:grid md:grid-cols-3 md:gap-6"
    >
      <div className="profile-picture">
        {user && user.data.img ? (
          <img
            src={user.data.img}
            alt={user.data.fullName}
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <FiUser className="w-32 h-32 rounded-full object-cover" />
        )}
        <InputField
          register={register}
          id="image"
          label={texts.signUpPFP}
          type="file"
          placeHolder="Update user picture"
          accept=".png, .jpg, .jpeg"
          rules={{ required: false }}
          defaultValue={user.data.image}
          errors={errors.image}
        />
      </div>

      <div className="w-full md:col-span-1">
        <InputField
          register={register}
          id="fullName"
          label={texts.fullName}
          placeHolder={user.data.fullName}
          rules={{
            required: {
              value: true,
              message: texts.signUpFullNameError,
            },
          }}
          errors={errors.fullName}
        />
      </div>
      <div className="w-full md:col-span-1">
        <InputField
          register={register}
          id="email"
          label={texts.email}
          placeHolder={user.data.email || texts.email}
          type="email"
          rules={{
            required: {
              value: true,
              message: texts.signUpEmailError,
            },
          }}
          errors={errors.email}
        />
      </div>

      <div className="w-full md:col-span-3">
        <InputField
          register={register}
          id="description"
          label={texts.description}
          type="textarea"
          placeHolder={texts.signUpDescriptionPlaceholder}
          rules={{
            required: {
              value: true,
              message: texts.signUpDesriptionErrorOne,
            },
            minLength: {
              value: 20,
              message: texts.signUpDescriptionTwo,
            },
            maxLength: {
              value: 500,
              message: texts.signUpDescriptionThree,
            },
          }}
          errors={errors.description}
        />
      </div>

      {fields.map((item, index) => (
        <div key={item.id} className="w-full md:col-span-1">
          <InputField
            register={register}
            id={`contactInfo[${index}].field`}
            label={`${texts.contactInfo} ${index + 1}`}
            placeHolder={texts.signUpContactInfoPlaceHolder}
            rules={{
              required: {
                value: true,
                message: texts.signUpContactInfoError,
              },
            }}
            errors={errors.contactInfo && errors.contactInfo[index]?.field}
          />
        </div>
      ))}

      <div className="w-full md:col-span-3 flex justify-center">
        {fields.length < 5 && (
          <button
            type="button"
            className={`${BUTTON_CLASSNAME}`}
            onClick={() => append({ field: '' })}
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
      <div className="w-full md:col-span-3 flex flex-col items-center">
        <button type="submit" className={`w-full ${BUTTON_CLASSNAME}`}>
          {texts.submit}
        </button>
      </div>
    </form>
  );
};

export default UpdateUserForm;
