import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import CategoryBar from "../components/CategoryBar"
import BoquetList from '../components/BoquetList';

const BoquetPage = () => {
    return (
        <>
            <Container className="d-flex justify-content-between align-items-center mt-3" >
                <Row className="mt-3">
                    <Col md = {3} className="mr-2">
                        <CategoryBar style={{ width: 100,height: 100}}/>
                    </Col>
                    <Col md = {9}>
                        <BoquetList/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default BoquetPage;