import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import Button from "./Button";
import CheckBox from "./CheckBox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLoginSuggestion, setShowLoginSuggestion] = useState(false);

  const navigate = useNavigate();

  const { signup } = UseAuth();

  async function handleSignup(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords Don't Match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      navigate("/");
    } catch (err) {
      console.error(err);
      setLoading(false);

      const code = err?.code;
      if (code === "auth/email-already-in-use") {
        setError("An account with that email already exists.");
        setShowLoginSuggestion(true);
      } else if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(err.message || "Couldn't sign up.");
      }
    }
  }

  return (
    <Form onSubmit={handleSignup} style={{ height: "500px" }}>
      <TextInput
        type="text"
        placeholder="Enter name"
        icon={"person"}
        required
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></TextInput>

      <TextInput
        type="text"
        placeholder="Enter email"
        icon={"alternate_email"}
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></TextInput>

      <TextInput
        type="password"
        placeholder="Enter password"
        icon={"lock"}
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></TextInput>

      <TextInput
        type="password"
        placeholder="Confirm password"
        icon={"lock_clock"}
        required
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      ></TextInput>

      <CheckBox
        text="I agree to the Terms & Conditions"
        value={agree}
        required
        onChange={(e) => {
          setAgree(e.target.value);
        }}
      ></CheckBox>

      <Button disabled={loading} type="submit">
        <span>Submit Now</span>
      </Button>

      {error && <div className="error">{error}</div>}
      {showLoginSuggestion ? showLoginSuggestion : null}

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
