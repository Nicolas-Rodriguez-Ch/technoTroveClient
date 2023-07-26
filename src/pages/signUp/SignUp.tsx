import { SubmitHandler } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import SignUpForm from "../../components/signUpForm/SignUpForm";
import { FormValues } from "../../types/formInterfaces";
import { createUser } from "../../services/userAPI";

const SignUp = () => {
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createUser(data);
  };

  return (
    <>
      <ToastContainer />
      <main className="flex flex-col items-center bg-custom-black text-custom-mint p-4 gap-1">
        <h1 className="text-3xl font-bold">Sign up</h1>
        <SignUpForm onSubmit={onSubmit} />
      </main>
    </>
  );
};

export default SignUp;

