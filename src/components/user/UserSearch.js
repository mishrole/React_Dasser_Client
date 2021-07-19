import React, { useState } from "react";
import { useFetchStatus } from '../../hooks/useFetchStatus';
import { Button, Col, Container, Form, Row } from "react-bootstrap"; 
import { generatePath, useHistory } from "react-router-dom";

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
    
    const history = useHistory();

    const handleClick = () => {
        history.push(generatePath("/user/create"));
    }

    return (
        <>
            <Container>
                <Row className="my-4">
                    <Form onSubmit = {handleSubmit}>
                        <Row className="justify-content-center">
                            <Col xs = {6} md = {3} className="my-2">
                                <Form.Control value={lastnameValue} type="text" placeholder="Lastname" onChange={handleLastnameChange}></Form.Control>
                            </Col>
                            <Col xs = {6} md = {3} className="my-2">
                                <Form.Control value={emailValue} type="text" placeholder="Email" onChange={handleEmailChange}></Form.Control>
                            </Col>
                            <Col xs = {6} md = {2} className="my-2">
                                <Form.Control value={statusValue} as="select" onChange={handleStatusChange}>
                                    {
                                        status.map(status => {
                                            return (
                                                <option key={`status-${status.id}`} value={status.id}>{status.name}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Col>
                            <Col xs = {3} md = {2} className="text-center my-2">
                                <Button variant="dark" type="submit">Search</Button>
                            </Col>
                            <Col xs = {3} md = {1} className="text-center my-2">
                                <Button variant="primary" type="submit" onClick={handleClick}>New</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Container>
        </>
    )
}