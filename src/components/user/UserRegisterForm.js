import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap"
import { generatePath, useHistory } from "react-router-dom";
import { postUser } from "../../helpers/postUser";
import { useFetchRoles } from "../../hooks/useFetchRoles";
import { useFetchStatus } from "../../hooks/useFetchStatus";

export const UserRegisterForm = () => {

    const [displayAlert, setDisplayAlert] = useState({
        isActive: false,
        message: '',
        type: ''
    });

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [lastnameValue, setLastnameValue] = useState('');
    const [firstnameValue, setFirstnameValue] = useState('');
    const [statusValue, setStatusValue] = useState(1);
    const [roleValue, setRoleValue] = useState(1);

    const regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    const { status } = useFetchStatus();
    const { roles } = useFetchRoles();

    const history = useHistory();

    if(status.error || roles.error ) {
        history.push(generatePath("/"));
    }

    function alertMessage(message, type) {
        setDisplayAlert({
            isActive: true,
            message: message,
            type: type
        });

        setTimeout(function () { 
            setDisplayAlert({
                isActive: false
            });
        }, 4000);
    }

    const handleLastnameChange = (event) => {
        setLastnameValue(event.target.value);
    }

    const handleFirstnameChange = (event) => {
        setFirstnameValue(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmailValue(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPasswordValue(event.target.value);
    }

    const handleStatusChange = (event) => {
        setStatusValue(event.target.value);
    }

    const handleRoleChange = (event) => {
        setRoleValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {lastnameValue, firstnameValue, emailValue, passwordValue, roleValue, statusValue};

        if(lastnameValue.trim().length > 0 && firstnameValue.trim().length > 0 && emailValue.trim().length > 0
        && passwordValue.trim().length > 0 && roleValue > 0 &&  statusValue > 0) {
            if(regexEmail.test(emailValue)) {
                postUser(data)
                .then(user => {
                    if(user.title === 'Success') {
                        setLastnameValue('');
                        setFirstnameValue('');
                        setEmailValue('');
                        setPasswordValue('');
                        setRoleValue(1);
                        setStatusValue(1);

                        alertMessage(user.detail, 'success');
                        
                    } else {
                        alertMessage(user.detail, 'danger');
                    }
                }).catch(error => {
                    console.error(error);
                });
            } else {
                alertMessage('Enter a valid email address', 'danger');
            }
        } else {
            alertMessage('All fields are required', 'danger');
        }
    }

    return (
        <>
            {
                !status.error && !roles.error && <Container>
                <Row className="justify-content-center mt-2">
                <Col className="my-4" xs = {12} md = {6}>
                        {
                            displayAlert.isActive && <Alert variant={displayAlert.type} className="my-5">{displayAlert.message}</Alert>
                        }

                        <h3 className="text-center">New User</h3>

                        <Form onSubmit= {handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicLastname">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control value={lastnameValue} type="text" placeholder="Enter lastname" autoComplete="off" onChange={ handleLastnameChange }/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicFirstname">
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control value={firstnameValue} type="text" placeholder="Enter firstname" autoComplete="off" onChange={ handleFirstnameChange }/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control value={emailValue} type="text" placeholder="Enter email" autoComplete="off" onChange={ handleEmailChange }/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={passwordValue} type="password" placeholder="Enter password" autoComplete="off" onChange={ handlePasswordChange }/>
                            </Form.Group>

                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control value={statusValue} as="select" onChange={ handleStatusChange }>
                                        {
                                            status.map(status => {
                                                return (
                                                    <option key={`status-${status.id}`} value={status.id}>{status.name}</option>
                                                )
                                            })
                                        }
                                    </Form.Control>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control value={roleValue} as="select" onChange={ handleRoleChange }>
                                        {
                                            roles.map(role => {

                                                const name = role.name.substring(role.name.indexOf('_') + 1);

                                                return (
                                                    <option key={`status-${role.id}`} value={role.id}>{name.charAt(0) + name.substring(1, name.length).toLowerCase()}</option>
                                                )
                                            })
                                        }
                                    </Form.Control>
                                </Col>
                            </Row>

                            <div className="text-center mt-5">
                                <Button variant="primary" type="submit">Create</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
            }
        </>
    )

}