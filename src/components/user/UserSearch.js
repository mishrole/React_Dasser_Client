import React, { useState, useEffect } from "react";
import { useFetchStatus } from '../../hooks/useFetchStatus';
import { Button, Col, Container, Form, Row } from "react-bootstrap"; 
import { generatePath, useHistory } from "react-router-dom";

export const UserSearch = ({ setParams }) => {

    const { status } = useFetchStatus();

    const [lastnameValue, setLastnameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [statusValue, setStatusValue] = useState(1);

    useEffect(
        () => {
            setParams({
                lastname: lastnameValue,
                login: emailValue,
                status: statusValue
            });
        },
        [lastnameValue, emailValue, statusValue, setParams]
      );

    const handleEmailChange = (event) => {
        setEmailValue(event.target.value);
    }

    const handleLastnameChange = (event) => {
        setLastnameValue(event.target.value);
    }

    const handleStatusChange = (event) => {
        setStatusValue(event.target.options[event.target.options.selectedIndex].value);
    }
    
    const history = useHistory();

    if(status.error ) {
        history.push(generatePath("/"));
    }

    const handleClick = () => {
        history.push(generatePath("/user/create"));
    }

    return (
        <>
            {
                !status.error && <Container>
                <Row className="my-4">
                    <Form>
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
                            <Col xs = {6} md = {4} className="text-center my-2">
                                <Button variant="primary" type="button" onClick={handleClick}>New</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Container>
            }
        </>
    )
}