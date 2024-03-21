import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import basket from '../base_img/basket_green.png';
import orchid from "../base_img/orchid.png";
import img_input from "../base_img/img_input.png";

const FormBoquet = () => {
    const flowers=[
        {id_flower:1, name: 'Роза',img:"../base_img/rose.png"},
        {id_flower:2, name: 'Орхидея',img:"../base_img/orchid.png"},
        {id_flower:3, name: 'Жасмин',img:"../base_img/jasmine.png"},
        {id_flower:4, name: 'Ромашка',img:"../base_img/daisies.png"},
        ]
    const wrappers = [
            {id:1, name: 'Бумага'},
            {id:2, name: 'Креп'},
            {id:3, name: 'Фольга'},]
    const [numFlowers, setNumFlowers] = useState(1);
    const [selectedFlowers, setSelectedFlowers] = useState(Array(numFlowers).fill('')); // Создаем массив для хранения выбранных цветов
    const handleAddSelect = () => {
            setNumFlowers(numFlowers + 1);
            console.log(numFlowers);
    };
    const [isCardNeeded, setIsCardNeeded] = useState(false); // Состояние для отслеживания, нужна ли открытка
    const [cardMessage, setCardMessage] = useState(''); // Состояние для хранения текста подписи к открытке
    return (
        <Container className='form'>
                    <Form >
                        <Row>
                            <Col md = {6} >

                                <Form.Group className="mb-3"><Form.Label className='form_text' style={{fontSize: 24}}>Состав:</Form.Label></Form.Group>
                                
                            {[...Array(numFlowers)].map((_, index) => (
                            <Form.Group className="mb-3" key={index}>
                                <Row>
                                    <Col md={8}>
                                        <Form.Select
                                            className='form_text'
                                            value={selectedFlowers[index]}
                                            onChange={(e) => {
                                                const newSelectedFlowers = [...selectedFlowers];
                                                newSelectedFlowers[index] = e.target.value;
                                                setSelectedFlowers(newSelectedFlowers);
                                        }}
                                        >
                                            {flowers.map((flower) => (
                                                <option className='form_text' key={flower.id_flower} value={flower.id_flower} style={{backgroundImage: flower.img}}>
                                                    {flower.name}
                                                <img src={flower.img} alt={flower.name} />
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col md={3}><Form.Control className='form_text' type="number" src={orchid} min={0} /></Col>
                                </Row>
                            </Form.Group>))}

                            <Button variant="light" className="banner_button" onClick={handleAddSelect}>Добавить еще один цветок</Button>

                            <Form.Group>
                                <Form.Label className='form_text' style={{fontSize: 24}}>Упаковка:</Form.Label>
                                <Form.Select className='form_text'>
                                    {wrappers.map((wrapper) => (
                                        <option className='form_text' key={wrapper.id} value={wrapper.id}>
                                            {wrapper.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            
                        <Form.Group className="mb-3">
                            <Form.Label className='form_text' style={{fontSize: 24}}>Нужна ли открытка?</Form.Label>
                            <Form.Check
                                className='form_text'
                                type="switch"
                                label="Да"
                                onChange={(e) => setIsCardNeeded(e.target.checked)}
                            />
                            {isCardNeeded && ( // Проверка, нужна ли открытка
                            <>
                            <Form.Label className='form_text' style={{fontSize: 24}}>Подпись к открытке</Form.Label>
                            <Form.Control
                                className='form_text'
                                type="text"
                                value={cardMessage}
                                onChange={(e) => setCardMessage(e.target.value)}
                            />
                            </>
                            )}
                        </Form.Group>

                            </Col>                            
                            <Col md = {6}>
                                <Form.Group className="mb-3" controlId="formImg">
                                    <Form.Label className='form_text' style={{fontSize:24}}>Пример букета</Form.Label>
                                    <Form.Control type="image" alt="" src={img_input} />
                                </Form.Group>
                            </Col>        
                        </Row>
                        <Button id='basket' >
                                <Image width={25} height={25} src={basket}/>
                                Добавить в корзину 
                         </Button>
                    </Form>
            </Container>
    );
};

export default FormBoquet;