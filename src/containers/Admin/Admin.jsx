import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Pagination from "../../components/Pagination/Pagination";
import { deleteUser, getAllUsers } from "../../services/ApiCalls";
import { useJwt } from "react-jwt";


function Admin() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [show, setShow] = useState(false);
  const token = sessionStorage.getItem("jwt");

  const { decodedToken } = useJwt(token);
  const role = decodedToken?.role;

  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    getAllUsers().then((data) => setUsers(data));
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const deleteUserHandler = (email) => {
    let body = {
      email: email,
    };

    deleteUser(body).then(() => {
      getAllUsers().then((data) => setUsers(data));
    })
    .then(() => handleClose());
  };

  if(role===1){
    return (
      <Container>
        <Row className="d-flex justify-content-center">
          {currentUsers.map((user) => {
            return (
              <Col
                xs="11"
                md="4"
                lg="3"
                className="lifterCard noPointer mx-3"
                key={user.id_user}
              >
                <p>
                  <span className="resultsText">USERNAME : </span>
                  {user.username}
                </p>
                <p>
                  <span className="resultsText">EMAIL : </span>
                  {user.email}
                </p>
                <p>
                  <span className="resultsText">NAME : </span>
                  {user.name}
                </p>
                <p>
                  <span className="resultsText">SURNAME : </span>
                  {user.surname}
                </p>
                <p>
                  <span className="resultsText">REGISTERED : </span>
                  {user.createdAt.slice(0, 10)}
                </p>
                <div className="d-flex justify-content-center mb-1">
                  <Button className="mobileButton" onClick={() => handleShow()}>
                    Delete
                  </Button>
                </div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Body>
                    Are you sure you want to delete the user?{" "}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="mobileButton" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      className="mobileButton"
                      onClick={() => deleteUserHandler(user?.email)}
                    >
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Pagination
              perPage={perPage}
              total={users.length}
              paginate={paginate}
            />
          </Col>
        </Row>
      </Container>
    );
  }else {
    return <div className="lifterTitle d-flex justify-content-center">Access denied</div>;
  }
}

export default Admin;
