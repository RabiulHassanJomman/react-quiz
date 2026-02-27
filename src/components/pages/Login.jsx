import Form from "../Form";
import Illustration from "../Illustration";
import classes from "../styles/Login.module.css";
import TextInput from "../TextInput";
import Button from "../Button";

import loginImage from "../../assets/images/login.svg";

export default function Login() {
  return (
    <>
      <h1>Login to your account</h1>

      <div className="column">
        <Illustration imageSrc={loginImage} />

        <Form className={classes.login}>
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

          <Button>
            <span>Submit now</span>
          </Button>

          <div className="info">
            Don't have an account? <a href="./signup.html">Signup</a> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
