import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import contactImg from '../base_img/background2.jpg'; 


const Contacts = () => {
    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <h3 className="text-center">Контакты</h3>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                    <Card className="p-4 mb-4">
                        <Card.Body>
                            <Card.Title><h3>Г. САМАРА</h3></Card.Title>
                            <Card.Text>
                                <strong>Режим работы</strong>
                                <br />
                                Работаем ежедневно с 9:00 до 21:00
                                <br />
                                Доставка заказов осуществляется с 9:00 до 21:00
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="p-4">
                        <Card.Body>
                            <Card.Title><h3>О НАС</h3></Card.Title>
                            <Card.Text>
                                Наша история началась с желания помогать людям дарить друг другу радость и эмоции и продолжилась в намерении выращивать цветы самостоятельно, чтобы сделать наш продукт лучше, качественнее и красивее.
                                <br /><br />
                                Наша миссия – показать истинную красоту цветов, которые делают нашу жизнь лучше. Цветы дарят эмоции, о которых мы забываем в бесконечной рутине, эстетику, которая вдохновляет и заряжает нас положительной энергией, дарят способ красиво выразить свою любовь и благодарность.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Image src={contactImg} fluid rounded />
                </Col>
            </Row>
        </Container>
    );
};

export default Contacts;
