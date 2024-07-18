import { createUser } from '../../services/userAPI';
import { FormValues } from '../../types/formInterfaces';
import { Link } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import routePaths from '../../constants/routePaths';
import SignUpForm from '../../components/signUpForm/SignUpForm';
import texts from '../../utils/texts';

const SignUp = () => {
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await createUser(data);
      toast.success(texts.signUpSuccess);
      setTimeout(() => {
        navigate(routePaths.login);
      }, 5750);
    } catch (error) {
      toast.error(texts.signUpError);
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="flex flex-col items-center bg-custom-black text-custom-mint p-4 gap-1">
        <h1 className="text-3xl font-bold">Sign up</h1>
        <SignUpForm onSubmit={onSubmit} />
        <section>
          <p>{texts.signUpRedirect}</p>
          <Link to={routePaths.login}>{texts.signUpRedirectLink}</Link>
        </section>
      </main>
    </>
  );
};

export default SignUp;
