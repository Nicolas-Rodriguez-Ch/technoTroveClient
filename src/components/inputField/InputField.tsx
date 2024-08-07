import { InputFieldProps } from './types';
import { useState } from 'react';

const InputField = ({
  register,
  id,
  label,
  type = 'text',
  rules,
  errors,
  className = 'p-2 m-2 text-custom-black rounded-md',
  accept,
  placeHolder,
  disabled = false,
  defaultValue,
}: InputFieldProps) => {
  const [fileChosen, setFileChosen] = useState(false);
  const Element = type === 'textarea' ? 'textarea' : 'input';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'file') {
      setFileChosen(!!event.target.files?.length);
    }
  };

  const extraProps =
    type === 'file'
      ? {
          className: `opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer ${
            fileChosen ? 'bg-green-500' : ''
          }`,
          ...(accept && { accept }),
          onChange: handleChange,
        }
      : {};

  return (
    <section className="flex flex-col text-center gap-3 text-sm sm:text-base">
      <label htmlFor={id}>{label}</label>
      {type === 'file' ? (
        <div className="relative">
          <Element
            id={id}
            type={type}
            placeholder={placeHolder}
            {...register(id, rules)}
            {...extraProps}
            disabled={disabled}
          />
          <div
            className={`border-2 border-custom-mint rounded p-2 ${
              fileChosen ? 'bg-green-500 text-custom-black font-semibold' : ''
            }`}
          >
            <label htmlFor={id} className="cursor-pointer">
              {placeHolder}
            </label>
          </div>
        </div>
      ) : (
        <Element
          className={className}
          id={id}
          type={type}
          placeholder={placeHolder}
          {...register(id, rules)}
          {...extraProps}
          disabled={disabled}
          defaultValue={defaultValue}
        />
      )}
      <p className="text-custom-red text-xs sm:text-sm">{errors?.message}</p>
    </section>
  );
};

export default InputField;
