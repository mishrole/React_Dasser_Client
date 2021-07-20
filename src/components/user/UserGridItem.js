import React from "react";
import { Card, CardGroup, Row, Col, Button } from 'react-bootstrap';
import { generatePath, useHistory } from "react-router-dom";
import { deletetUser } from "../../helpers/deleteUser";
import { getUsers } from "../../helpers/getUsers";

export const UserGridItem = ({id, lastname, firstname, login, status, roles, create_date, update_date, setUser}) => {

    const history = useHistory();

    const handleClick = (userId) => () => {
        history.push(generatePath("/user/edit/:userId", {userId}));
    }

    if(!id ) {
        history.push(generatePath("/"));
    }

    const handleDelete = () => {
        deletetUser(id)
        .then(response => {
            getUsers({lastname: '', login: '', status: 1})
            .then(user => {
                setUser({
                    users: user,
                    loading: false
                });
            });
        })
    }
    
    let badgeColor = '';

    if(status) {
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
   }

    return (
        <>
            {
                id && <CardGroup className="m-2 d-block animate__animated animate__fadeIn" key={`cardGroup-${id}`}>
                <Card className="border-1 py-3" style={{'borderColor': '#ececec'}}>
                    <Row>
                        <Col>
                            <Card.Body onClick={handleClick(id)}>
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
                                <Button variant="danger" onClick={handleDelete}>Delete</Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </CardGroup>
            }
        </>
    )
}