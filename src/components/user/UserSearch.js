import React from "react";
import { useFetchStatus } from '../../hooks/useFetchStatus';
import { Col, Form, Row } from "react-bootstrap"; 

export const UserSearch = ({ setParams }) => {

    const { status, loading } = useFetchStatus();

    return (
        <>
            <Row>
                <Col className="my-4" xs = {12}>
                <Form.Control as="select">
                <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="black">Black</option>
          <option value="orange">Orange</option>
                </Form.Control>
                </Col>
            </Row>
        </>
    )
}