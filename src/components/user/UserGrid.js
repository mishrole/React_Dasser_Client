import React from "react";
import { UserGridItem } from "./UserGridItem";
import { useFetchUsers } from '../../hooks/useFetchUsers';
import { Col, Container, Row } from "react-bootstrap";
import { generatePath, useHistory } from "react-router-dom";

export const UserGrid = ({ params }) => {

    const { user: {users, loading}, setUser } = useFetchUsers(params);

    const history = useHistory();

    if(users.error ) {
        history.push(generatePath("/"));
    }

    return (
        <>
            {
                !users.error && <div className="card-grid">
                <Container>
                    <Row>
                        {
                            loading && <p className="animate__animated animate__flash">loading</p>
                        }
                        {
                            users.map(user => {
                                return (
                                    <Col xs = { 12 } sm = { 6 } lg = { 4 } key = {`column-${user.id}`}>
                                        <UserGridItem setUser = {setUser} key={`gridItem-${user.id}`} {...user}/>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </div>
            }
        </>
    )
}