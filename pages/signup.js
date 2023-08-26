import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Signup = () => {
  const { signup } = useAuthContext();
  const route = useRouter();
  const [emailData, setEmailData] = useState();
  const [passwordData, setPasswordData] = useState();
  const [displayName, setDisplayName] = useState();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(emailData,passwordData,displayName);
      route.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        width: "40%",
        margin: "auto",
      }}
    >
      <h1 className="text-center my-3 ">Signup</h1>
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmailData(e.target.value)}
            value={emailData}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPasswordData(e.target.value)}
            value={passwordData}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
