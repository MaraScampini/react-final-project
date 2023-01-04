import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { errorCheck } from "../../services/Useful";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { userLogin, userRegister } from "../../services/ApiCalls";

const Authentication = ({ type }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
    empty: "",
    wrongCredentials: "",
  });

  let body = {
    email: user.email,
    password: user.password,
    username: user.username,
  };

  const validateBody = (body) => {
    if (type == "login") {
      if (body.email !== "" && body.password !== "") {
        return true;
      }
    } else if (type == "register") {
      if (body.email !== "" && body.password !== "" && body.username !== "") {
        return true;
      }
    }
  };

  const isRegister = () => {
    if (type == "register") {
      return true;
    } else if (type == "login") {
      return false;
    }
  };

  const submitLogin = (e) => {
    e.preventDefault();
    if (validateBody(body) && type == "login") {
      userLogin(body)
        .then(() => navigate("/"))
        .catch((error) => {
          setUserError((prevState) => ({
            ...prevState,
            wrongCredentials: error.response.data.message,
            empty: "",
          }));
        });
    } else if (validateBody(body) && type == "register") {
      userRegister(body)
        .then(() => navigate("/"))
        .catch((error) => {
          setUserError((prevState) => ({
            ...prevState,
            wrongCredentials: error.response.data.message,
            empty: "",
          }));
        });
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
    <div>
      <Form onSubmit={(e) => submitLogin(e)}>
        <div>{userError.empty}</div>
        <div>{userError.wrongCredentials}</div>
        {isRegister() ? (
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={(e) => inputHandler(e)}
              onBlur={(e) =>
                errorHandler(e.target.name, e.target.value, "username")
              }
            />
          </Form.Group>
        ) : (
          <div></div>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) => errorHandler(e.target.name, e.target.value, "email")}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <div className="errorInput">{userError.emailError}</div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {isRegister() ? (
        <div>
          <p>Already have an account?</p>
          <p onClick={() => navigate("/login")}>Login</p>
        </div>
      ) : (
        <div>
          <p>Do not have an account?</p>
          <p onClick={() => navigate("/register")}>Register</p>
        </div>
      )}
    </div>
  );
};

export default Authentication;
