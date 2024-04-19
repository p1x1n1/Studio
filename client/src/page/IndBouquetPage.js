import React, { useState } from 'react';
import '../css/IndBoquet.css';
import { Button, Container } from 'react-bootstrap';
import FormBoquet from '../components/FormBoquet';
import { useNavigate } from 'react-router-dom';
import { Basket_ROUTE } from '../utils/consts';

const Indboquet = () => {

    const navigate = useNavigate();

    const [boquetCount, setBoquetCount] = useState(1);
    const handleAddBoquet = () => {
        setBoquetCount(boquetCount + 1);
    };

    return (
        <>
            <Container className='banner'>
                <h2 className='banner_h2'>Индивидуальный букет</h2>
                <h3 className='banner_h3'>Создайте уникальный подарок</h3>
            </Container>
            <Container>
                {/* Отображаем нужное количество компонентов FormBoquet */}
                {[...Array(boquetCount)].map((_, index) => (
                    <FormBoquet key={index} />
                ))}
                <Button className='banner_button' style={{background:"#6d699e"}} onClick={handleAddBoquet}>Добавить букет</Button>
                <Button className='banner_button' style={{background:"#6d699e"}} onClick={() => navigate(Basket_ROUTE)}>Перейти в корзину</Button>
            </Container>
        </>
    );
};

export default Indboquet;
