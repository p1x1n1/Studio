import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { INVENTORY, USER } from '../utils/consts';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    return (
        <div className='mt-3'>
            <Row className='mb-3'>
                <Col md={2}><Button className='pupleButton' variant='outline-light' onClick={()=>navigate(USER)} > Пользователи</Button></Col>
                <Col md={3}><Button className='pupleButton' variant='outline-light' onClick={()=>navigate(INVENTORY)} >Инвентаризация</Button></Col>
            </Row>
        </div>
    );
};

export default Admin;