import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch, RootState } from '../../store/store';
import { fetchUser, loginUser } from '../../store/reducers/users/userSlice';
import { Link } from 'react-router-dom';
import { LoginResponse } from '../../store/reducers/users/userInterfaces';
import { SubmitHandler } from 'react-hook-form';
import { token as tknCookie } from '../../constants/cookies';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import LoginForm from '../../components/loginForm/LoginForm';
import routePaths from '../../constants/routePaths';
import texts from '../../utils/texts';

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
    if (status === 'succeeded' && data) {
      const { token, data: userData } = data;
      Cookies.set(tknCookie, token);
      toast.success(
        `Welcome back ${userData.fullName}, you'll soon be redirected to the Home page`
        );
        setTimeout(() => {
          navigate(routePaths.home);
          dispatch(fetchUser());
      }, 5750);
    }
  };

  const handleFailedLogin = (status: string, error: string | null) => {
    if (status === 'failed' && error) {
      toast.error(`Log in failed: ${error}`);
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
        <section>
          <p>{texts.loginRedirect}</p>
          <Link to={routePaths.signUp}>{texts.loginRedirectLink}</Link>
        </section>
      </section>
    </>
  );
};

export default Login;
