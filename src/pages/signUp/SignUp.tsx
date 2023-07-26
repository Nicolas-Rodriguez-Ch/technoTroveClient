import { SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import SignUpForm from "../../components/signUpForm/SignUpForm";
import { FormValues } from "../../types/formInterfaces";
import { createUser } from "../../services/userAPI";
import texts from "../../utils/texts";
import { Link } from "react-router-dom";
import routePaths from "../../constants/routePaths";

const SignUp = () => {
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await createUser(data);
      toast.success(texts.signUpSuccess);
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
          <Link to={routePaths.signUp}>
            {texts.signUpRedirectLink}
          </Link>
        </section>
      </main>
    </>
  );
};

export default SignUp;
