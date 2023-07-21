import { useForm, SubmitHandler } from "react-hook-form";
import texts from "../../utils/texts";

interface Credentials {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<Credentials> = (data) => console.log(data);

  return (
    <>
      <section className="flex flex-col items-center bg-custom-black text-custom-mint p-4 gap-1">
        <h1 className="text-3xl font-bold">{texts.login}</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-rigth gap-3"
        >
          <label htmlFor="email">{texts.email}</label>
          <input
            className="p-1 text-custom-black"
            {...register("email", { required: texts.loginError })}
            type="email"
            placeholder={texts.email}
            id="email"
          />
          <p>{errors.email?.message}</p>
          <label htmlFor="password">{texts.password}</label>
          <input
            className="p-1 text-custom-black"
            {...register("password", { required: texts.loginError })}
            type="password"
            placeholder={texts.password}
            id="password"
          />
          <p>{errors.email?.message}</p>
          <button
            type="submit"
            className="bg-custom-blue text-custom-mint border hover:bg-custom-mint hover:text-custom-blue p-1 font-bold"
          >
            {texts.submit}
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
