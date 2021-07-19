import React from "react";
import { Card, CardGroup, Row, Col, Button } from 'react-bootstrap';
import { generatePath, useHistory } from "react-router-dom";

export const UserGridItem = ({id, lastname, firstname, login, status, roles, create_date, update_date}) => {

    const history = useHistory();

    const handleClick = (userId) => () => {
        history.push(generatePath("/user/edit/:userId", {userId}));
    }

    let badgeColor = '';

    switch(status.name) {
        case 'Active':
            badgeColor = 'badge-green';
            break;
        case 'Blocked':
            badgeColor = 'badge-red';
            break;
        case 'Removed':
            badgeColor = 'badge-gray';
            break;
        default:
            badgeColor = 'badge-default';
    }

    return (
        <>
            <CardGroup className="m-2 d-block animate__animated animate__fadeIn" key={`cardGroup-${id}`} onClick={handleClick(id)}>
                <Card className="border-1 py-3" style={{'borderColor': '#ececec'}}>
                    <Row>
                        <Col>
                            <Card.Body>
                                    {
                                        <span className={`badge badge-pill ${badgeColor}`}>{status.name}</span>
                                    }
                                    {
                                        roles.map(role => {

                                            const name = role.name.substring(role.name.indexOf('_') + 1);

                                            return (
                                                <span key={`badge-${role.id}`} className="badge badge-pill badge-default">{name.charAt(0) + name.substring(1, name.length).toLowerCase()}</span>
                                            );

                                        })
                                    }
                                <Card.Title>
                                    <br />
                                    { lastname }
                                    <br />
                                    { firstname }
                                </Card.Title>
                                <Card.Text>
                                    <br />
                                    { login }
                                    <br />
                                    Created: {create_date}
                                    <br />
                                    Updated: {update_date}
                                </Card.Text>
                            </Card.Body>
                            <div className="text-center d-flex justify-content-evenly">
                                {/* <Button variant="dark" style={{'color': 'white'}}>Update</Button> */}
                                <Button variant="danger">Delete</Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </CardGroup>
        </>
    )
}