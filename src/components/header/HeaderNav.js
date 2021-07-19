import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const HeaderNav = (param) => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand>Dasser</Navbar.Brand>
                <Nav className="m-auto">
                    <Link className="nav-link" to={`/user`}>User</Link>
                </Nav>
                <Button variant="secondary">Logout</Button>
                </Container>
            </Navbar>
        </>
    )
}