import React, { useContext } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { generatePath, Link, useHistory } from "react-router-dom";
import MainContext from "../../context/mainContext";
import { types } from "../../types/types";

export const HeaderNav = (param) => {

    const { user, dispatch } = useContext(MainContext);

    const history = useHistory();

    const handleLogout = () => {
        dispatch({
            type: types.logout
        })

        history.push(generatePath("/login"));
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand>Dasser</Navbar.Brand>
                <Nav className="m-auto">
                    <Link className="nav-link" to={`/user`}>User</Link>
                </Nav>
                <p className="nav-item nav-link text-info m-0"> { user.user ? user.user.name : '' } </p>
                <Button className="text-light btn" variant="" onClick={ handleLogout }>Logout</Button>
                </Container>
            </Navbar>
        </>
    )
}