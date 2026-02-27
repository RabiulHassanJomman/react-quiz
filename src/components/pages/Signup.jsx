import Button from "../Button";
import CheckBox from "../CheckBox";
import classes from "../styles/Signup.module.css";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";

export default function Signup() {
  return (
    <div>
      <h1>Create an account</h1>

      <div className="column">
        <Illustration />
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

          <Button type="submit">
            Submit Now
          </Button>
          <div className="info">
            Already have an account? <a href="login.html">Login</a> instead.
          </div>
        </Form>
      </div>
    </div>
  );
}
