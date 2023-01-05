import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { editPassword, editProfile, getProfile } from "../../services/ApiCalls";

function Profile() {
  const [userData, setUserData] = useState({
    address: "",
    age: "",
    email: "",
    name: "",
    surname: "",
    username: "",
  });
  const [editedData, setEditedData] = useState({
    address: userData.address,
    age: userData.age,
    email: userData.email,
    name: userData.name,
    surname: userData.surname,
    username: userData.username,
    password: "",
  });

  const [editing, setEditing] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  useEffect(() => {
    getProfile().then((data) =>
      setUserData({
        address: data.address,
        age: data.age,
        username: data.username,
        email: data.email,
        name: data.name,
        surname: data.surname,
      })
    );
  }, []);
  useEffect(() => {
    setEditedData({
      address: userData.address,
      age: userData.age,
      email: userData.email,
      name: userData.name,
      surname: userData.surname,
      username: userData.username,
      password: "",
    });
  }, [userData]);
  useEffect(() => {
    getProfile().then((data) =>
      setUserData({
        address: data.address,
        age: data.age,
        username: data.username,
        email: data.email,
        name: data.name,
        surname: data.surname,
      })
    );
  }, [editing]);

  let body = {
    address: editedData.address,
    age: editedData.age,
    username: editedData.username,
    name: editedData.name,
    surname: editedData.surname,
  };

  const inputHandler = (e) => {
    setEditedData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    editProfile(body).then(() => setEditing(false));
  };

  const submitPasswordHandler = (e) => {
    e.preventDefault();
    let newPassword = {
      password: editedData.password,
    };
    editPassword(newPassword).then(() => setEditingPassword(false));
  };

  return (
    <Container>
      <Row>
        {editing === false && editingPassword === false ? (
          <Col>
            <p>Username: {userData.username}</p>
            <p>Name: {userData.name}</p>
            <p>Surname: {userData.surname}</p>
            <p>Age: {userData.age}</p>
            <p>Address: {userData.address}</p>
            <p>Email: {userData.email}</p>
            <Button onClick={() => setEditing(true)}>Edit</Button>
            <Button onClick={() => setEditingPassword(true)}>
              Edit Password
            </Button>
          </Col>
        ) : editingPassword === true ? (
          <Col>
            <Form onSubmit={(e) => submitPasswordHandler(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Edit password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter your new password"
                  onChange={(e) => inputHandler(e)}
                />
              </Form.Group>

              <Button type="button" onClick={() => setEditingPassword(false)}>
                Back
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        ) : (
          <Col>
            <Form onSubmit={(e) => submitHandler(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={editedData.username}
                  onChange={(e) => inputHandler(e)}
                />
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={editedData.name}
                  onChange={(e) => inputHandler(e)}
                />
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  name="surname"
                  type="text"
                  placeholder="Enter your surname"
                  value={editedData.surname}
                  onChange={(e) => inputHandler(e)}
                />
                <Form.Label>Age</Form.Label>
                <Form.Control
                  name="age"
                  type="text"
                  placeholder="Enter your age"
                  value={editedData.age}
                  onChange={(e) => inputHandler(e)}
                />
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  value={editedData.address}
                  onChange={(e) => inputHandler(e)}
                />
              </Form.Group>

              <Button
                onClick={() => setEditing(false)}
                variant="primary"
                type="button"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Profile;
