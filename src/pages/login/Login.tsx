import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { RootState, AppDispatch } from "../../store/store";
import { loginUser } from "../../store/reducers/users/userSlice";
import texts from "../../utils/texts";
import { token as tknCookie } from "../../constants/cookies";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import routePaths from "../../constants/routePaths";
import { LoginResponse } from "../../store/reducers/users/userInterfaces";
import LoginForm from "../../components/loginForm/LoginForm";

interface Credentials {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    data: loginResponse,
    status,
    error,
  } = useSelector((state: RootState) => state.user) as {
    data: LoginResponse | null;
    status: string;
    error: string | null;
  };
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Credentials> = (data) => {
    dispatch(loginUser(data));
  };

  const handleSuccessfulLogin = (
    status: string,
    data: LoginResponse | null,
    navigate: (path: string) => void
  ) => {
    if (status === "succeeded" && data) {
      const { token, data: userData } = data;
      Cookies.set(tknCookie, token);
      toast.success(
        `Welcome back ${userData.fullName}, you'll soon be redirected to the Home page`,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );

      setTimeout(() => {
        navigate(routePaths.home);
      }, 5750);
    }
  };

  const handleFailedLogin = (status: string, error: string | null) => {
    if (status === "failed" && error) {
      toast.error(`Log in failed: ${error}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    handleSuccessfulLogin(status, loginResponse, navigate);
  }, [status, loginResponse, navigate]);

  useEffect(() => {
    handleFailedLogin(status, error);
  }, [status, error]);

  return (
    <>
      <ToastContainer />
      <section className="flex flex-col items-center bg-custom-black text-custom-mint p-4 gap-1">
        <h1 className="text-3xl font-bold">{texts.login}</h1>
        <LoginForm onSubmit={onSubmit} />
        <section className="">
          <p>{texts.loginRedirect}</p>
          <Link to={routePaths.signUp}>
            {texts.loginRedirectLink}
          </Link>
        </section>
      </section>
    </>
  );
};

export default Login;
