import { Link } from "react-router-dom";
import LoginForm from "./SignInForm";
import Container from "../../../components/Container";
import Text from "../../../components/Text";
import BlurShape from "../../../components/BlurShape";

function Login() {
  return (
    <div className="h-[calc(100vh-59.19px)] relative flex justify-center items-center overflow-hidden">
      <span className="-z-10 absolute -top-24 left-1/2 transform-gpu blur-3xl sm:ml-16 opacity-25">
        <BlurShape color="bg-green" />
      </span>
      <span
        className="-z-10 absolute top-0 -left-2/4 transform-gpu blur-3xl sm:translate-x-0 sm:transform-gpu opacity-15"
        aria-hidden="true"
      >
        <BlurShape color="bg-cyan" />
      </span>
      <Container>
        <Text text="sign in to your account" />
        <div className=" mt-12 lg:mt-16 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />

          <div className="flex gap-2 mt-8 justify-center">
            <p className="text-center text-gray-500"> Not a member? </p>
            <Link
              to="/account/sign-up"
              className="ml-2 font-semibold leading-6 text-green"
            >
              Sign up here.
            </Link>
          </div>
        </div>
      </Container>{" "}
    </div>
  );
}

export default Login;