import { useRef, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap"
import { generatePath, useHistory } from "react-router-dom";
import { putUser } from "../../helpers/putUser";
import { useFetchRoles } from "../../hooks/useFetchRoles";
import { useFetchStatus } from "../../hooks/useFetchStatus";
import { useFetchUserById } from "../../hooks/useFetchUserById";

export const UserEditForm = ({userId}) => {

    const { status } = useFetchStatus();
    const { roles } = useFetchRoles();
    const { userFound, loading } = useFetchUserById(userId);

    const history = useHistory();

    if(status.error || roles.error || userFound.error ) {
        history.push(generatePath("/"));
    }

    const [displayAlert, setDisplayAlert] = useState({
        isActive: false,
        message: '',
        type: ''
    });

    const regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

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

    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const refLastname = useRef(null);
    const refFirstname = useRef(null);
    const refStatus = useRef(null);
    const refRole = useRef(null);

    const refs = [refEmail, refFirstname, refLastname, refPassword, refStatus, refRole];

    const formIsValid = () => {

        let count = 0;
        
        refs.map(ref => {
            if(ref.current.value.length > 0) {
                count++;
            }

            return count;
        });

        if(count < refs.length) {
            return false;
        }

        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            userId: userId,
            lastnameValue: refLastname.current.value, 
            firstnameValue: refFirstname.current.value, 
            emailValue: refEmail.current.value, 
            passwordValue: refPassword.current.value, 
            roleValue: refRole.current.value, 
            statusValue: refStatus.current.value};

        if(formIsValid) {
            if(regexEmail.test(data.emailValue)) {
                putUser(data)
                .then(user => {
                    if(user.title === 'Success') {
                        // clearForm();
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
                !userFound.error && <Container>
                <Row className="justify-content-center mt-2">
                <Col className="my-4" xs = {12} md = {6}>
                        {
                            displayAlert.isActive && <Alert variant={displayAlert.type} className="my-5">{displayAlert.message}</Alert>
                        }

                        {
                            !loading && <>
                                <h3 className="text-center">Edit User</h3>
                                <Form onSubmit= {handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicLastname">
                                    <Form.Label>Lastname</Form.Label>
                                    <Form.Control ref={refLastname} defaultValue = { userFound.lastname } type="text" placeholder="Enter lastname" autoComplete="off" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicFirstname">
                                    <Form.Label>Firstname</Form.Label>
                                    <Form.Control ref={refFirstname} defaultValue = { userFound.firstname } type="text" placeholder="Enter firstname" autoComplete="off" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control ref={refEmail} defaultValue = { userFound.login } type="text" placeholder="Enter email" autoComplete="off"/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control ref={refPassword} defaultValue = { '' } type="password" placeholder="Enter password" autoComplete="off"/>
                                </Form.Group>

                                <Row>
                                    <Col xs={12} md={6}>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control defaultValue = { userFound.status.id } ref={refStatus} as="select">
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
                                        <Form.Control defaultValue = { userFound.roles["0"].id } ref={refRole}  as="select">
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
                                    <Button variant="primary" type="submit">Save</Button>
                                </div>
                            </Form>
                        </>

                        }
                    </Col>
                </Row>
            </Container>
            }
        </>
    )

}