import React, { useContext, useEffect, useState } from 'react';
import '../css/IndBoquet.css';
import { ApiService } from '../http/api.service'
import { Button, Col, Container, Row } from 'react-bootstrap';
import FormBoquet from '../components/FormBoquet';
import { useNavigate } from 'react-router-dom';
import { Basket_ROUTE } from '../utils/consts';
import { Context } from '../index';

const apiService = new ApiService()

const Indboquet = () => {
    const {user} = useContext(Context);
    const post = user.user.post;
    const navigate = useNavigate();

    const [wrappers,setWrapper] = useState([])
	const [flowers,setFlower] = useState([])
    function fetchDataWrapper() {
		apiService.get('/wrapper').then(res => {
			setWrapper(res);
		})
		console.log('wrapper',wrappers)
	}
	function fetchDataFlower() {
		apiService.get('/flower').then(res => {
			setFlower(res)
		})
		console.log('flower',flowers)
	}
    useEffect(() => {
		fetchDataFlower();
		fetchDataWrapper();
	}, [])

    const [boquetCount, setBoquetCount] = useState(1);
    let bouquets = [];

    const handleAddBoquet = () => {
        setBoquetCount(boquetCount + 1);
    };

    function addBouquet(bouquet,position){
        if (position >= bouquets.length) {
            bouquets.push(bouquet); // Добавляем в конец массива
        } else {
            bouquets.splice(position, 1, bouquet); // Заменяем букет на указанной позиции
        }
        console.log('bouquets',bouquets);
    }

    return (
        <>
            <Container className='banner'>
                    <h2 className='banner_h2'>Индивидуальный букет</h2>
                    <h3 className='banner_h3'>Создайте уникальный подарок</h3>
            </Container>
            <Container>
                {/* Отображаем нужное количество компонентов FormBoquet */}
                {[...Array(boquetCount)].map((_, index) => (
                    <FormBoquet key={index} position={index} flowers={flowers} wrappers={wrappers} addBouquet={addBouquet} post={post} login = {user.user.login} stoimost={1.5}/>
                ))}
                <Row className='mt-2'>
                    <Col md={2}>
                        <Button style={{width: '100%'}} className='banner_button'  variant='light' onClick={handleAddBoquet}>Добавить букет</Button>
                    </Col>
                    <Col md={3}>
                        <Button style={{width: '100%'}} className='banner_button'  variant='light' onClick={() => navigate(Basket_ROUTE)}>Перейти в корзину</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Indboquet;
