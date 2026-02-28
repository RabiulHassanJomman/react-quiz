import Button from "../Button";
import CheckBox from "../CheckBox";
import Form from "../Form";
import Illustration from "../Illustration";
import classes from "../styles/Signup.module.css";
import TextInput from "../TextInput";
import { Link } from "react-router-dom";

import signupImage from "../../assets/images/signup.svg";

export default function Signup() {
  return (
    <div>
      <h1>Create an account</h1>

      <div className="column">
        <Illustration imageSrc={signupImage} />
        <Form className={classes.signup}>
          <TextInput
            type="text"
            placeholder="Enter name"
            icon={"person"}
          ></TextInput>

          <TextInput
            type="text"
            placeholder="Enter email"
            icon={"alternate_email"}
          ></TextInput>

          <TextInput
            type="password"
            placeholder="Enter password"
            icon={"lock"}
          ></TextInput>

          <TextInput
            type="password"
            placeholder="Confirm password"
            icon={"lock_clock"}
          ></TextInput>

          <CheckBox text="I agree to the Terms & Conditions"></CheckBox>

          <Button type="submit"><span>Submit Now</span></Button>
          <div className="info">
            Already have an account? <Link to="/login">Login</Link> instead.
          </div>
        </Form>
      </div>
    </div>
  );
}
