import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorCheck } from "../../services/Useful";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { userLogin, userRegister } from "../../services/ApiCalls";
import { Col, Container, Row } from "react-bootstrap";

const Authentication = ({ type }) => {
  const navigate = useNavigate();
let token = sessionStorage.getItem("jwt");
useEffect(() => {
if (token) {
  navigate("/");
}
}, [])

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    password2: "",
  });
  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
    empty: "",
    wrongCredentials: "",
    usernameError: "",
    password2Error: "",
    emailAlreadyInBBDD: "",
  });
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  let body = {
    email: user.email,
    password: user.password,
    username: user.username,
    password2: user.password2,
  };

  const validateBody = (body) => {
    if (type === "login") {
      if (body.email !== "" && body.password !== "") {
        return true;
      }
    } else if (type === "register") {
      if (
        body.email !== "" &&
        body.password !== "" &&
        body.username !== "" &&
        body.password2 !== "" &&
        body.password === body.password2
      ) {
        return true;
      }
    }
  };

  const isRegister = () => {
    if (type === "register") {
      return true;
    } else if (type === "login") {
      return false;
    }
  };

  const cleanStates = () => {
    setUser(() => ({
      email: "",
      password: "",
      username: "",
      password2: "",
    }));
    setInput(() => ({
      email: "",
      password: "",
    }));
  };

  const navigateLogin = () => {
    cleanStates();
    navigate(`/login`);
  };
  const navigateRegister = () => {
    cleanStates();
    navigate(`/register`);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    if (validateBody(body) && type === "login") {
      userLogin(body)
        .then(() => navigate("/"))
        .catch((error) => {
          setUserError((prevState) => ({
            ...prevState,
            wrongCredentials: error.response.data.message,
            empty: "",
          }));
        });
    } else if (validateBody(body) && type === "register") {
      userRegister(body)
        .then(navigate("/"))
        .catch((error) => {
          setUserError((prevState) => ({
            ...prevState,
            emailAlreadyInBBDD: error.response.data,
            empty: "",
          }));
        });
    } else if (user.password !== user.password2) {
      setUserError((prevState) => ({
        ...prevState,
        password2Error: "Passwords don't match",
      }));
    } else {
      setUserError((prevState) => ({
        ...prevState,
        empty: "Check all fields are filled",
      }));
    }
  };

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setInput(e.target.value);
  };

  const errorHandler = (field, value, type, password) => {
    let error = "";
    error = errorCheck(value, type, password);
    setUserError((prevState) => ({
      ...prevState,
      [field + "Error"]: error,
    }));
  };

  return (
    <Container fluid className="lifterContainer">
      <Row className="d-flex justify-content-center pt-sm-5">
        <Col xs="11" md="6">
          <div className="d-flex justify-content-center">
            {isRegister() ? (
              <p className="lifterTitle">Register</p>
            ) : (
              <p className="lifterTitle">Log In</p>
            )}
          </div>
          <Form className="d-flex flex-column" onSubmit={(e) => submitLogin(e)}>
            <div className="errorInput d-flex justify-content-center">
              {userError.empty}
            </div>
            <div className="errorInput d-flex justify-content-center">
              {userError.wrongCredentials}
            </div>
            <div className="errorInput d-flex justify-content-center">
              {userError.emailAlreadyInBBDD}
            </div>
            {isRegister() ? (
              <Form.Group className="mb-3">
                <Form.Label className="lifterText">Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="lifterInput"
                  onChange={(e) => inputHandler(e)}
                  onBlur={(e) =>
                    errorHandler(e.target.name, e.target.value, "username")
                  }
                />
                <div className="errorInput">{userError.usernameError}</div>
              </Form.Group>
            ) : (
              <div></div>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="lifterText">Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={input.email}
                className="lifterInput"
                onChange={(e) => inputHandler(e)}
                onBlur={(e) =>
                  errorHandler(e.target.name, e.target.value, "email")
                }
              />
              <div className="errorInput">{userError.emailError}</div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="lifterText">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={input.password}
                className="lifterInput"
                onChange={(e) => inputHandler(e)}
                onBlur={(e) =>
                  errorHandler(e.target.name, e.target.value, "password")
                }
              />
              {isRegister() ? (
                <div className="errorInput">{userError.passwordError}</div>
              ) : (
                <div></div>
              )}
            </Form.Group>
            {isRegister() ? (
              <Form.Group className="mb-3">
                <Form.Label className="lifterText">Repeat password</Form.Label>
                <Form.Control
                  type="password"
                  name="password2"
                  placeholder="Enter your password"
                  className="lifterInput"
                  onChange={(e) => inputHandler(e)}
                  onBlur={(e) =>
                    errorHandler(
                      e.target.name,
                      e.target.value,
                      "password2",
                      user.password
                    )
                  }
                />
                <div className="errorInput">{userError.password2Error}</div>
              </Form.Group>
            ) : (
              <div></div>
            )}
            <div className="d-flex justify-content-center mt-3">
              <Button className="lifterButton" type="submit">
                Submit
              </Button>
            </div>
          </Form>
          {isRegister() ? (
            <div className="lifterDownText blackText">
              <p>Already have an account?</p>
              <p className="lifterLink" onClick={() => navigateLogin()}>
                LOG IN
              </p>
            </div>
          ) : (
            <div className="lifterDownText blackText">
              <p>Do not have an account?</p>
              <p className="lifterLink" onClick={() => navigateRegister()}>
                REGISTER
              </p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Authentication;
