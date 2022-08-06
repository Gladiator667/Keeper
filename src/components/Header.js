import React from "react";
import { Navbar, Container, Nav, Button} from "react-bootstrap";
import { useUserAuth } from "../context/authContext";
import {useNavigate} from "react-router-dom";

const Header = () => {

  const {currentUser} = useUserAuth();
  const {logOut} = useUserAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  }
  return (
  <Navbar style={{backgroundColor: "#f5ba13", boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)"}}>
  <Container>
    <Navbar.Brand style={{fontSize: "2.5rem", color:"#ffffff"}}>Keeper</Navbar.Brand>
    {!currentUser && <Nav className="mjustify-content-end" style={{fontSize: "1.2rem"}}>
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/">Log In</Nav.Link>
      <Nav.Link href="/signup">Sign Up</Nav.Link>
    </Nav>}
    {currentUser && <Button variant="light" style={{float: "right"}} onClick={handleLogOut}>Log Out</Button>}
  </Container>
</Navbar>
  );
}

export default Header;