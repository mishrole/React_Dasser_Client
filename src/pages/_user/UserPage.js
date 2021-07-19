import React, { useState } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserGrid } from '../../components/user/UserGrid';
import { HeaderNav } from '../../components/header/HeaderNav';

export const UserPage = () => {

    const [params, setParams] = useState({
        lastname: '',
        login: '',
        status: 1
    });
    
    return (
        <>
            <HeaderNav></HeaderNav>
            
            <Container fluid>
                <Row>
                    <Col className="my-4" xs = {12}>
                        <UserGrid key="user-grid" params={params}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}