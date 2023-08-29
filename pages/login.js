import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthContext } from "@/context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  const [emailData, setEmailData] = useState();
  const [passwordData, setPasswordData] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(emailData,passwordData);
      router.push("/");
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  return (
    <div
      style={{
        width: "40%",
        margin: "auto",
      }}
    >
      <h1 className="text-center my-3 ">Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmailData(e.target.value)}
            value={emailData}
            required
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPasswordData(e.target.value)}
            value={passwordData}
            required
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
