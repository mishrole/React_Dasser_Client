import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { UserGrid } from '../../components/user/UserGrid';
import { HeaderNav } from '../../components/header/HeaderNav';
import { UserSearch } from '../../components/user/UserSearch';

export const UserPage = () => {

    const [params, setParams] = useState({
        lastname: '',
        login: '',
        status: 1
    });
    
    return (
        <>
            <HeaderNav></HeaderNav>

            <UserSearch setParams = { setParams }></UserSearch>
            
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