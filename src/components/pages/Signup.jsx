import Illustration from "../Illustration";
import SignupForm from "../SignupForm";

import signupImage from "../../assets/images/signup.svg";

export default function Signup() {
  return (
    <div>
      <h1>Create an account</h1>

      <div className="column">
        <Illustration imageSrc={signupImage} />
        <SignupForm></SignupForm>
      </div>
    </div>
  );
}
