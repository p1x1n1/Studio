import React, { useEffect, useState } from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import CategoryBar from "../components/CategoryBar"
import BouquetList from '../components/BouquetList';
import { ApiService } from '../http/api.service';

const BouquetPage = () => {
    return (
        <>
            <Container className="d-flex justify-content-between align-items-center mt-3" >
                <Row className="mt-3">
                    <Col md = {3} className="mr-2">
                        <CategoryBar width = {100}/>
                    </Col>
                    <Col md = {9}>
                        <BouquetList/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
//<BoquetList/>

export default BouquetPage;