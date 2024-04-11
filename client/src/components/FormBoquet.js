import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import basket from '../base_img/basket_green.png';
import orchid from "../base_img/orchid.png";
import img_input from "../base_img/img_input.png";

const FormBoquet = () => {
    const flowers=[
        {id_flower:1, name: 'Роза',price:40,cnt:20,img:"../base_img/rose.png"},
        {id_flower:2, name: 'Орхидея',price:40,cnt:20,img:"../base_img/orchid.png"},
        {id_flower:3, name: 'Жасмин',price:40,cnt:20,img:"../base_img/jasmine.png"},
        {id_flower:4, name: 'Ромашка',price:40,cnt:4,img:"../base_img/daisies.png"},
        ]
    const wrappers = [
            {id:1, name: 'Бумага'},
            {id:2, name: 'Креп'},
            {id:3, name: 'Фольга'},]
    const [numFlowers, setNumFlowers] = useState(1);
    const [selectedFlowers, setSelectedFlowers] = useState(Array(numFlowers).fill('')); // Создаем массив для хранения выбранных цветов
    const [quantities, setQuantities] = useState(Array(flowers.length).fill(0));//Создаем массив для хранения количество выбранных цветов
    const handleAddSelect = () => {
            setNumFlowers(numFlowers + 1);
            console.log(numFlowers);
    };
    const handleQuantityChange = (index, value) => {//изменение количества
        const newQuantities = [...quantities];
        newQuantities[index] = value;
        setQuantities(newQuantities);
    };
    const getMaxQuantity = (flowerId) => {//Определение максимального значение для ползунка количества
        const flower = flowers.find((f) => f.id_flower == flowerId);
        return flower ? flower.cnt : 0;
    };
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        selectedFlowers.forEach((selectedFlower, index) => {
            const flower = flowers.find((f) => f.id_flower == selectedFlower);
            if (flower) {
                totalPrice += flower.price * quantities[index];
            }
        });
        return totalPrice;
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
                                            <option selected disabled></option>
                                            {flowers.map((flower) => (
                                                <option className='form_text' key={flower.id_flower} data-foo="bar" value={flower.id_flower} style={{backgroundImage: flower.img}} >
                                                    {flower.name}
                                                    <img src={flower.img} alt={flower.name} />
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control 
                                            className='form_text' 
                                            type="number" min={0} max={getMaxQuantity(selectedFlowers[index])}
                                            onChange={(e) => handleQuantityChange(index, e.target.value)}/></Col>
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
                                <Form.Select>
                                    <option className='form_text' style={{backgroundImage: `url('rose.png')`}}></option>
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
                        <p>Итог:{calculateTotalPrice()} рублей</p>
                        <div className='form_line'></div>
                        <Button id='basket' >
                                <Image width={25} height={25} src={basket}/>
                                Добавить в корзину 
                         </Button>
                    </Form>
            </Container>
    );
};

export default FormBoquet;