import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
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
    <Container fluid className="lifterContainer py-3 px-md-5 px-4">
      <Row>
        <Col>
          <div className="lifterTitle text-center">
            Hello, {userData.username}
          </div>
        </Col>
      </Row>
      {editing === false && editingPassword === false ? (
        <Row className="d-flex justify-content-center py-5">
          <Col xs="10" sm="4" lg="3">
            <p className="lifterProfile">
              USERNAME :{" "}
              <span className="lifterProfile blackText">
                {userData.username}
              </span>
            </p>
            <p className="lifterProfile">
              NAME:{" "}
              <span className="lifterProfile blackText">{userData.name}</span>
            </p>
            <p className="lifterProfile">
              SURNAME:{" "}
              <span className="lifterProfile blackText">
                {userData.surname}
              </span>
            </p>
            <p className="lifterProfile">
              AGE:{" "}
              <span className="lifterProfile blackText">{userData.age}</span>
            </p>
            <p className="lifterProfile">
              ADDRESS:{" "}
              <span className="lifterProfile blackText">
                {userData.address}
              </span>
            </p>
            <p className="lifterProfile">
              EMAIL:{" "}
              <span className="lifterProfile blackText">{userData.email}</span>
            </p>
          </Col>
          <Col xs="10" sm="3" className="d-flex flex-column align-items-center">
            <Button
              className="lifterButton my-3"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
            <Button
              className="lifterButton my-3"
              onClick={() => setEditingPassword(true)}
            >
              Edit Password
            </Button>
          </Col>
        </Row>
      ) : editingPassword === true ? (
        <Form onSubmit={(e) => submitPasswordHandler(e)}>
          <Row className="d-flex justify-content-center py-5 profileRow">
            <Col xs="10" sm="4" lg="3">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="lifterText mt-2">
                  Edit password
                </Form.Label>
                <Form.Control
                  className="lifterInput"
                  name="password"
                  type="password"
                  placeholder="Enter your new password"
                  onChange={(e) => inputHandler(e)}
                />
              </Form.Group>
            </Col>
            <Col
              xs="10"
              sm="3"
              className="d-flex flex-column align-items-center"
            >
              <Button
                className="lifterButton my-3"
                type="button"
                onClick={() => setEditingPassword(false)}
              >
                Back
              </Button>
              <Button
                className="lifterButton my-3"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      ) : (
        <Form onSubmit={(e) => submitHandler(e)}>
          <Row className="d-flex justify-content-center py-5 profileRow">
            <Col xs="10" sm="4" lg="3">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="lifterText mt-2">Username</Form.Label>
                <Form.Control
                  className="lifterInput"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={editedData.username}
                  onChange={(e) => inputHandler(e)}
                />
                <Form.Label className="lifterText mt-2">Name</Form.Label>
                <Form.Control
                  className="lifterInput"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={editedData.name}
                  onChange={(e) => inputHandler(e)}
                />
                <Form.Label className="lifterText mt-2">Surname</Form.Label>
                <Form.Control
                  className="lifterInput"
                  name="surname"
                  type="text"
                  placeholder="Enter your surname"
                  value={editedData.surname}
                  onChange={(e) => inputHandler(e)}
                />
                <Form.Label className="lifterText mt-2">Age</Form.Label>
                <Form.Control
                  className="lifterInput"
                  name="age"
                  type="text"
                  placeholder="Enter your age"
                  value={editedData.age}
                  onChange={(e) => inputHandler(e)}
                />
                <Form.Label className="lifterText mt-2">Address</Form.Label>
                <Form.Control
                  className="lifterInput"
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  value={editedData.address}
                  onChange={(e) => inputHandler(e)}
                />
              </Form.Group>
            </Col>
            <Col
              xs="10"
              sm="3"
              className="d-flex flex-column align-items-center"
            >
              <Button
                className="lifterButton my-3"
                onClick={() => setEditing(false)}
                variant="primary"
                type="button"
              >
                Cancel
              </Button>
              <Button
                className="lifterButton my-3"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Container>
  );
}

export default Profile;
