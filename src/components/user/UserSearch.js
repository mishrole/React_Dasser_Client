import React from "react";
import { useFetchStatus } from '../../hooks/useFetchStatus';
import { Col, Container, Form, Row } from "react-bootstrap"; 

export const UserSearch = ({ setParams }) => {

    const { status, loading } = useFetchStatus();

    return (
        <>
            <Container>
                <Row>
                    <Col className="my-4" xs = {2}>
                    <Form.Control as="select">
                        {
                            status.map(status => {
                                return (
                                    <option key={`status-${status.id}`} value={status.id}>{status.name}</option>
                                )
                            })
                        }
                    </Form.Control>
                    </Col>
                </Row>
            </Container>
        </>
    )
}