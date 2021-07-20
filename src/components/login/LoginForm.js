import React, {useContext, useState} from 'react';
import { Row, Col, Container, Form, Button, Alert } from 'react-bootstrap';
import { generatePath, useHistory } from 'react-router-dom';
import MainContext from '../../context/mainContext';
import { requestToken } from '../../helpers/requestToken';
import { setToken } from '../../helpers/setToken';
import { types } from '../../types/types';

export const LoginForm = () => {

    const { dispatch } = useContext( MainContext );

    const history = useHistory();

    const [emailValue, setEmailValue] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordValue, setpasswordValue] = useState('');

    const regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    const [displayAlert, setDisplayAlert] = useState({
        isActive: false,
        message: '',
        type: ''
    });

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

    const handleEmailChange = (event) => {
        setEmailValue(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setpasswordValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!regexEmail.test(emailValue)) {
            setEmailError(true);
        } else if(passwordValue.trim().length > 0) {
            setEmailError(false);

            requestToken({emailValue, passwordValue})
            .then(token => {
                if(token.status === 200) {

                    if(token["access"] === "Removed") {
                        alertMessage("Authentication error, user has been removed", 'danger');
                    } else if (token["access"] === "Blocked") {
                        alertMessage("Authentication error, user has been blocked", 'danger');
                    } else if (token["access"] === "Active") {
                        setToken(token["access_token"], token["refresh_token"], token["expires_in"]);

                        dispatch({
                            type: types.login,
                            payload: {
                                user: token
                            }
                        });

                        history.push(generatePath("/user"));
                    } else {
                        alertMessage("An error occurred while performing the operation", 'danger');
                    }

                } else {
                    alertMessage("Authentication error, please check your credentials", 'danger');
                }
            });
        }
    }

    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    <Col className="my-4" xs = {12} md = {6}>
                        
                        {
                            displayAlert.isActive && <Alert variant={displayAlert.type} className="my-5">{displayAlert.message}</Alert>
                        }

                        <h3>Welcome Back!</h3>
                        <p className="mb-4">Please Log in to your account</p>
                        <Form onSubmit= {handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control value={emailValue} type="text" placeholder="Enter email" autoComplete="off" onChange={ handleEmailChange }/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={passwordValue} type="password" placeholder="Password" autoComplete="off" onChange={ handlePasswordChange }/>
                            </Form.Group>
                            <div className="text-center">
                                <Button variant="primary" type="submit">Login</Button>
                            </div>
                        </Form>
                            {
                                emailError && <p>Your email is invalid</p>                            
                            }
                    </Col>
                </Row>
            </Container>
        </>
    )
}