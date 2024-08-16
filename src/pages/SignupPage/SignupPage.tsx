import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Address from "../../models/address";
import classes from "./SignupPage.module.css";
import FormInput from "../../components/FormInput/FormInput";
import { useNavigate, Link } from "react-router-dom";

const SignUpPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState<Address>({
    city: "",
    country: "",
  });

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
          firstName,
          lastName,
          email,
          address,
        },
      },
    });
  };

  return (
    <Container className={classes.container + " center"}>
      <Form
        className={classes.myform}
        noValidate
        validated={validated}
        onSubmit={onSubmitHandler}
      >
        <Row>
          <h3 className={classes.title}>Sign Up</h3>
        </Row>
        <fieldset>
          <Row>
            <Col>
              <FormInput
                type="text"
                required
                title="First Name"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>

            <Col>
              <FormInput
                type="text"
                required
                title="Last Name"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>
          </Row>
        </fieldset>
        <fieldset>
          <Row>
            <Col>
              <FormInput
                type="text"
                required
                title="City"
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress((prevState) => ({
                    ...prevState,
                    city: e.target.value,
                  }))
                }
              />
            </Col>

            <Col>
              <FormInput
                type="text"
                required
                title="Country"
                placeholder="Country"
                value={address.country}
                onChange={(e) =>
                  setAddress((prevState) => ({
                    ...prevState,
                    country: e.target.value,
                  }))
                }
              />
            </Col>
          </Row>
        </fieldset>

        <fieldset>
          <Row>
            <Col>
              <FormInput
                type="text"
                required
                title="Email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Row>
        </fieldset>

        <fieldset>
          <Row>
            <Col>
              <FormInput
                type="password"
                required
                title="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
            <Col>
              <FormInput
                type="password"
                required
                title="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {password && confirmPassword && password !== confirmPassword && (
                <div className={classes.error_message + " error_text"}>
                  Passwords do not match
                </div>
              )}
            </Col>
          </Row>
        </fieldset>

        <Row>
          <Button className={classes.submit_btn} type="submit">
            Sign Up
          </Button>
        </Row>
        <Row className={classes.footer}>
          <p>
            Already have an account?<Link to="/account/login">Log in</Link>
          </p>
        </Row>
      </Form>
    </Container>
  );
};

export default SignUpPage;
