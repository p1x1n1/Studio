import {React } from 'react';
import { Container } from 'react-bootstrap';
import CourierOrder from '../components/CourierOrder';


const OrderPage = () => {
    const order = {number:34};
    return (
        <Container>
            <CourierOrder/>
        </Container>
    );
};


export default OrderPage;