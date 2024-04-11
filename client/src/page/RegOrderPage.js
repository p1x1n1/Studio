import React, { useState } from 'react';
import { Button, Col, Container, Form, NavLink, Row } from 'react-bootstrap';


const RegOrderPage = () => {
    const localities = [{ id: 1, name: "Самара" }, { id: 2, name: "Жигулевск" }, { id: 3, name: "Кинель" }, { id: 4, name: "Новокуйбышевск" }];
    const streets = [{ id: 1, name: "Академика Кузнецова" }, { id: 2, name: "Александра Матросова" }, { id: 3, name: "Александра Невского" }, { id: 4, name: "Алексея Росовского" }];
    const deliveries = [{id:1, name: "Самовывозом", price:0}, {id:2, name: "Курьером", price:1}, {id:3, name: "Экспресс-доставка",price:500}]
    
    const [selectedDelivery,setSelectedDelivery] = useState('');//Создаем массив для хранения выбранного типа доставки
    const handleDeliveryChange = (e) => {
        const delivery = deliveries.find(delivery => delivery.name === e.target.value);
        setSelectedDelivery(delivery); // Обновляем выбранный тип доставки
    };

    const [isRecepient, setIsRecepient] = useState(false); // Состояние для отслеживания кто получатель
    const [RecepientPhone, setRecepientPhone] = useState(''); // Состояние для хранения номера телефона получателя
    const [Anonim, setAnonim] = useState(false); // Состояние для отслеживания нужна ли анонимная доставка
    return (
       <Container>
            <h1 className='form_text'>Оформление заказа</h1>
            <Row>
                <Col md={8}>
                    <Form>
                        <Form.Group className='form_text'>
                            <h3>Адрес:</h3>
                            <Form.Label className='form_text'>Населённый пункт</Form.Label>
                            <Form.Control as="select"  required className='form_text'>
                                {localities.map((locality) => (
                                    <option key={locality.id} value={locality.name}>
                                        {locality.name}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Label>Улица</Form.Label>
                            <Form.Control as="select" className="form_text">
                                {streets.map((street) => (
                                    <option key={street.id} value={street.name}>
                                        {street.name}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Label>Дом</Form.Label>
                            <Form.Control type="address" placeholder="44a" />
                            <Form.Label>Комментарий к адресу</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Способ доставки:</Form.Label>
                                    <Form.Select
                                    value={selectedDelivery.name}
                                    onChange={handleDeliveryChange}
                                    >
                                        <option disabled selected></option>
                                        {deliveries.map((delivery) => (
                                        <option key={delivery.id} value={delivery.name}>
                                            {delivery.name}
                                        </option>
                                    ))}
                                    </Form.Select>
                                    <Form.Label>Дата доставки:</Form.Label>
                                    <Form.Control type='date'/>
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Стоимость доставки:</Form.Label>
                                    <Form.Control disabled placeholder = {selectedDelivery.price+" руб."}/>
                                    <Form.Label>Время доставки:</Form.Label>
                                    <Form.Control type='time'/>
                                    <NavLink>Условия доставки</NavLink>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='form_text' style={{fontSize: 24}}>Я получатель</Form.Label>
                            <Form.Check
                                className='form_text'
                                type="switch"
                                label="Да"
                                onChange={(e) => setIsRecepient(e.target.checked)}
                            />
                            {isRecepient && ( // Проверка, нужна ли открытка
                            <>
                                <h3>Получатель</h3>
                                <Form.Label className='form_text' style={{fontSize: 24}}>Номер телефона получателя:</Form.Label>
                                <Form.Control
                                    className='form_text'
                                    type="phone"
                                    value={RecepientPhone}
                                    onChange={(e) => setRecepientPhone(e.target.value)}
                                />
                                <Form.Check className='form_text'
                                    label="Анонимная доставка"
                                    value={Anonim}
                                    onChange={(e) => setAnonim(e.target.value)}>
                                </Form.Check>
                            </>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <h3>Дополнительная информация</h3>
                            <Form.Label className='form_text' style={{fontSize: 24}}>Особые пожелания:</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={4}>
                    <div className='frame'>
                        <h4>Ваш заказ:</h4>
                        <Button id='basket' type='submit'>
                            Оформить заказ
                         </Button>
                    </div>
                </Col>
            </Row>
       </Container>
    );
};

export default RegOrderPage;
