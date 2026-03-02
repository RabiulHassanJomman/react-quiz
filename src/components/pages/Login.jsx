import Illustration from "../Illustration";
import LoginForm from "../LoginForm";

import loginImage from "../../assets/images/login.svg";

export default function Login() {
  return (
    <>
      <h1>Login to your account</h1>

      <div className="column">
        <Illustration imageSrc={loginImage} />
        <LoginForm></LoginForm>
      </div>
    </>
  );
}
