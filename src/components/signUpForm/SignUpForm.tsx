import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { FormValues } from '../../types/formInterfaces';
import InputField from '../inputField/InputField';
import texts from '../../utils/texts';

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
      fullName: '',
      email: '',
      password: '',
      description: '',
      contactInfo: [{ field: '' }],
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
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-right gap-4 m-4 md:grid md:grid-cols-3 md:gap-6"
    >
      <div className="w-full md:col-span-1">
        <InputField
          register={register}
          id="fullName"
          label={texts.fullName}
          placeHolder={texts.fullName}
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
          placeHolder={texts.email}
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
      <div className="w-full md:col-span-1">
        <InputField
          register={register}
          id="password"
          label={texts.password}
          placeHolder={texts.password}
          type="password"
          rules={{
            required: {
              value: true,
              message: texts.signUpPassError,
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: texts.signUpErrorRegEx,
            },
          }}
          errors={errors.password}
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
            errors={
              errors.contactInfo &&
              (errors.contactInfo[index] as { field?: any })?.field
            }
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
        <InputField
          register={register}
          id="image"
          label={texts.signUpPFP}
          type="file"
          accept=".png, .jpg, .jpeg"
          placeHolder={texts.signUpPFPPlaceHolder}
        />
        <button type="submit" className={`w-full ${BUTTON_CLASSNAME}`}>
          {texts.submit}
        </button>
      </div>
    </form>
  );
};
export default SignUpForm;
