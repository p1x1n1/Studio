import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import deliveryImg from '../base_img/background1.jpg';  // Добавьте вашу картинку в папку assets

const Delivery = () => {
    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <h3 className="text-center">Доставка и оплата</h3>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                    <Image src={deliveryImg} fluid rounded />
                </Col>
                <Col md={6}>
                    <Card className="p-4">
                        <Card.Body>
                            <Card.Title><h3>ВРЕМЯ ДОСТАВКИ</h3></Card.Title>
                            <Card.Text>
                                Мы доставляем букеты ежедневно с 9:00 до 21:00.
                                <br /><br />
                                Если вы хотите получить заказ в другое время, то просим вас заранее связаться с нами.
                                <br /><br />
                                Мы доставим сегодня букет, если вы оформите и подтвердите заказ до 19:00.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                    <Card className="p-4">
                        <Card.Body>
                            <Card.Title><h3>СТОИМОСТЬ ДОСТАВКИ</h3></Card.Title>
                            <Card.Text>
                                Курьерская - 500
                                <br />
                                Экспресс - 3300
                                <br />
                                <b>Доставка самовывозом бесплатно!</b>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="p-4">
                        <Card.Body>
                            <Card.Title><h3>НАСЕЛЁННЫЕ ПУНКТЫ</h3></Card.Title>
                            <Card.Text>
                                Новокуйбышевск
                                <br />
                                Кинель
                                <br />
                                Белозерки
                                <br />
                                Зубчаниновка
                                <br />
                                Крутые ключи
                                <br />
                                Управленческий
                                <br />
                                Красная Глинка
                                <br />
                                16 км
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Delivery;
