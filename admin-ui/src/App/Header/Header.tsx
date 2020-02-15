import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

interface I_props {
    alert?: string | null
    isAuth: boolean | null
    logOut: () => void
}

function Header({alert, isAuth, logOut}: I_props) {
    return (
        <Navbar bg="primary" expand="lg" variant="dark" >
            <Navbar.Brand href="#home">Address Book App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                <Nav className="mr-auto">
                    <Nav.Link href="/products">products</Nav.Link>
                </Nav>
                <Nav className="mr-auto">
                    <Nav.Link href="/login">products</Nav.Link>
                </Nav>
                <Nav className="mr-auto">
                    <Nav.Link onClick={logOut}>products</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
