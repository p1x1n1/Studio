import {React, useContext, useEffect, useState } from 'react';
import BouquetBasketItem from '../components/BouquetBasketItem';
import { Button, Col, Row } from 'react-bootstrap';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';
import { REG_ORDER } from '../utils/consts';
import { ApiService } from '../http/api.service';
import { observer } from 'mobx-react-lite';


const apiService = new ApiService()
const Basket = observer (() => {  
    const [bouquet,setBouquet] = useState([]);
    const {user} = useContext(Context)
    const navigate = useNavigate()
    function fetchDataBouquet() {
		apiService.get('/basket/'+user.user.login).then(res => {
            setBouquet(res);
        })
        console.log('bouquet',bouquet);
	}
    useEffect(() => {
        console.log('bouquet',bouquet);
        fetchDataBouquet();
	}, [])
    function DeleteAll(){
        apiService.delete('/basket/'+user.user.login).then(res => {
            setBouquet([]);
        })
    }
    return (
        <>
            <Row>
            <Col md={8}>
                <Row>
                    <Col md={8}>
                        <h1> Корзина </h1>
                    </Col>
                    <Col md={4}>
                        <h2 style={{color:'blueviolet'}} onClick={()=>{DeleteAll()}}> Удалить всё </h2>
                    </Col>
                </Row>             
                {console.log(bouquet)}
                {bouquet.map(bouquet =>  
                    <BouquetBasketItem key={bouquet.arc} bouquet={bouquet}/>
                )}
            </Col>
            <Col md={4}>
                <div className='puple_border_box'>
                    <h1>Итого </h1>
                    <div>
                        <p>Количество букетов</p>
                        <p>Сумма</p>
                        <p>Персональная скидка:</p>
                    </div>
                </div>
                <div className='d-flex justife-content-center align-items-center mt-3'>
                    <Button className='pupleButton' variant='outline-light' onClick={() => navigate(REG_ORDER+'/'+user.user.login)}>Оформить заказ</Button>
                </div>
               
            </Col>
            </Row>
        </>
    );
});

export default Basket;