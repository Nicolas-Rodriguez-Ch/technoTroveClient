import React from 'react';
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { FormValues } from "../../types/formInterfaces";
import InputField from "../inputField/InputField";
import texts from "../../utils/texts";


interface UpdatePageProps {
  onSubmit: SubmitHandler<FormValues>;
}

const UpdateUserForm = ({submitUserUpdate, user}) => {
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
      contactInfo: user.data.contactInfo.map((info:string) => ({ field: info })), // Populate with the previous user's contactInfo array
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
      onSubmit={handleSubmit(submitUserUpdate)}
      className="flex flex-col text-right gap-4 m-4 md:grid md:grid-cols-3 md:gap-6"
    >
      <div className="w-full md:col-span-1">
        <InputField
          register={register}
          id="fullName"
          label={"texts.fullName"}
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
          placeHolder={user.data.email}
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
      <div className="w-full md:col-span-3 flex flex-col items-center">
        <InputField
          register={register}
          id="image"
          label={texts.signUpPFP}
          type="file"
          accept=".png, .jpg, .jpeg"
        />
        <button type="submit" className={`w-full ${BUTTON_CLASSNAME}`} onSubmit={submitUserUpdate}>
          {texts.submit}
        </button>
      </div>
    </form>
  )
}

export default UpdateUserForm
