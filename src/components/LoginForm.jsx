import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = UseAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await login(email, password);
      navigate("/");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("could not sign in");
    }
  }

  return (
    <Form onSubmit={handleLogin} style={{ height: "330px" }}>
      <TextInput
        type="text"
        placeholder="Enter email"
        icon={"alternate_email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      ></TextInput>

      <TextInput
        type="password"
        placeholder="Enter password"
        icon={"lock"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      ></TextInput>

      <Button disabled={loading} type="submit">
        <span>Log in</span>
      </Button>

      {error && <p className="error"></p>}

      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
}
