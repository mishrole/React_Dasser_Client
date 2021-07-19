import React, { useState } from "react";
import { useFetchStatus } from '../../hooks/useFetchStatus';
import { Button, Col, Container, Form, Row } from "react-bootstrap"; 

export const UserSearch = ({ setParams }) => {

    // const { status, loading } = useFetchStatus();
    const { status } = useFetchStatus();

    const [lastnameValue, setLastnameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [statusValue, setStatusValue] = useState(1);

    const handleEmailChange = (event) => {
        setEmailValue(event.target.value);
    }

    const handleLastnameChange = (event) => {
        setLastnameValue(event.target.value);
    }

    const handleStatusChange = (event) => {
        setStatusValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        setParams({
            lastname: lastnameValue,
            login: emailValue,
            status: statusValue
        });

    }

    return (
        <>
            <Container>
                <Row className="my-4">
                    <Form onSubmit = {handleSubmit}>
                        <Row className="justify-content-center">
                            <Col xs = {3}>
                                <Form.Control value={lastnameValue} type="text" placeholder="Lastname" onChange={handleLastnameChange}></Form.Control>
                            </Col>
                            <Col xs = {3}>
                                <Form.Control value={emailValue} type="text" placeholder="Email" onChange={handleEmailChange}></Form.Control>
                            </Col>
                            <Col xs = {2}>
                                <Form.Control as="select" onChange={handleStatusChange}>
                                    {
                                        status.map(status => {
                                            return (
                                                <option key={`status-${status.id}`} value={status.id}>{status.name}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Col>
                            <Col xs = {2} className="text-center">
                                <Button variant="dark" type="submit">Search</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Container>
        </>
    )
}