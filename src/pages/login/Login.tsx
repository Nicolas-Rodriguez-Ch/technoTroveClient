import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { loginUser } from "../../store/reducers/users/userSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import texts from "../../utils/texts";
import { token as tknCookie } from "../../constants/cookies";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import routePaths from "../../constants/routePaths";

interface Credentials {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, status, error } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
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
  const onSubmit: SubmitHandler<Credentials> = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (status === "succeeded" && data) {
      if ("token" in data) {
        const { token, data: userData } = data;
        Cookies.set(tknCookie, token);
        toast.success(
          `Welcome back ${userData.fullName}, you'll soon be redirected to the Home page`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          }
        );

        setTimeout(() => {
          navigate(routePaths.home);
        }, 3500);
      }
    }
  }, [status, data, navigate]);

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(`Log in failed: ${error}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [status, error]);

  return (
    <>
      <ToastContainer />
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
