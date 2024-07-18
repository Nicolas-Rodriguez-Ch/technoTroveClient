import { useForm, SubmitHandler } from 'react-hook-form';
import texts from '../../utils/texts';
interface Credentials {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: SubmitHandler<Credentials>;
}
const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-rigth gap-3"
    >
      <label htmlFor="email">{texts.email}</label>
      <input
        className="p-1 text-custom-black"
        {...register('email', { required: texts.loginError })}
        type="email"
        placeholder={texts.email}
        id="email"
      />
      <p>{errors.email?.message}</p>
      <label htmlFor="password">{texts.password}</label>
      <input
        className="p-1 text-custom-black"
        {...register('password', { required: texts.loginError })}
        type="password"
        placeholder={texts.password}
        id="password"
      />
      <p>{errors.password?.message}</p>
      <button
        type="submit"
        className="bg-custom-blue text-custom-mint border hover:bg-custom-mint hover:text-custom-blue p-1 font-bold"
      >
        {texts.submit}
      </button>
    </form>
  );
};

export default LoginForm;
