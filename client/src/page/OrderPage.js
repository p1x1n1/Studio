import {React, useContext } from 'react';
import { Container } from 'react-bootstrap';
import CourierOrder from '../components/CourierOrder';
import FloristOrder from '../components/FloristOrder';
import AdminOrder from '../components/AdminOrder';
import { Context } from '../index';


const OrderPage = () => {
    const {user} = useContext(Context)
    return (
        <>{ (user.user.post ==='Администратор') ?
            <AdminOrder/>: (user.user.post ==='Курьер') ?
            <CourierOrder />:
            <FloristOrder />}
        </>
    );
};


export default OrderPage;