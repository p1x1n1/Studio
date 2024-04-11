import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const Admin = () => {
    return (
        <Container className='mb-3'>
            <Row className='mb-3'>
                <Col md={3}><Button className='pupleButton'> Букеты:</Button></Col>
                <Col md={3}><Button className='pupleButton'> Пользователи:</Button></Col>
                <Col md={3}><Button className='greenButton'> Добавить:</Button></Col>
                <Col md={3}><Button className='greenButton'> Изменить:</Button></Col>
                <Col md={3}><Button className='greenButton'> Удалить:</Button></Col>

            </Row>
            <Row className='mb-3'>
                <Col md={4}><Button className='pupleButton'>Инвентаризация</Button></Col>
                <Col md={2}><Button className='pupleButton'>Главная</Button></Col>
            </Row>
        </Container>
    );
};

export default Admin;