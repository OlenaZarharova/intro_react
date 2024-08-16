import { Container, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import classes from "./LoginPage.module.css";
import FormInput from "../../components/FormInput/FormInput";
import React, { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    navigate("/", {
      state: {
        user: {
          email,
          password,
        },
      },
    });
  };

  return (
    <Container className={classes.container + " center"}>
      <Form
        className={classes.login_form}
        noValidate
        validated={validated}
        onSubmit={onSubmitHandler}
      >
        <Row>
          <h3 className={classes.title}>Login</h3>
        </Row>

        <FormInput
          title="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <FormInput
          title="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Row>
          <Button className={classes.login_btn} type="submit">
            Login
          </Button>
        </Row>

        <Row className={classes.login_footer}>
          <p>
            Don't have an account?{" "}
            <Link to="/account/register">Sign up here</Link>
          </p>
        </Row>
      </Form>
    </Container>
  );
}
