import {React, useContext, useEffect, useState } from 'react';
import BouquetBasketItem from '../components/BouquetBasketItem';
import { Button, Col, Row } from 'react-bootstrap';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';
import { REG_ORDER } from '../utils/consts';
import { ApiService } from '../http/api.service';
import { observer } from 'mobx-react-lite';
import UnFindInfo from '../components/UnFindInfo';
import { message } from 'antd';


const apiService = new ApiService()
const Basket = observer (() => {  
    const [bouquet,setBouquet] = useState([]);
    const {user} = useContext(Context)
    const login = user.user.login;
    const [disProcent,setDisProcent] = useState();
   
    const navigate = useNavigate()
    function fetchDataBouquet() {
		apiService.get('/basket/'+login).then(res => {
            setBouquet(res);
        })
        apiService.get('/discount/'+user.user.discountIdRecord).then(res => {
            setDisProcent(res.procent);
        })
        console.log('bouquet',bouquet,'dis',disProcent);
	}
    useEffect(() => {
        console.log('bouquet',bouquet);
        fetchDataBouquet();
	}, [])
    
    function DeleteAll(){
        apiService.delete('/basket/'+login).then(res => {
            setBouquet([]);
        })
    }
    function DeleteOne(arc){
        apiService.delete('/basket/'+login+'/'+arc).then(res => {
            setBouquet([]);
            messageApi.open({
                type: 'error',
                content: 'Удаленно из корзины',
                duration: 5,
                });
        })
        fetchDataBouquet();
    }
    let price;
    function calculatePrice(){
        console.log('bouquet',bouquet,'dis',disProcent);
        let sum = 0;
        bouquet.forEach(bouquet => {
            sum += bouquet.price * bouquet.cnt;
        });
        price = sum 
        return sum;
    }
    function calculatePriceWDiscounts(){
        let sum = price;
        sum = sum * ((100.00 - disProcent) / 100)
        return sum;
    }
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <>
         {contextHolder}
            <Row>
            <Col md={8}>
                <Row>
                    <Col md={8}>
                        <h1> Корзина </h1>
                    </Col>
                    <Col md={4}>
                        <Button className='banner_button' variant='outlined-light'  onClick={()=>{DeleteAll()}}> Удалить всё </Button>
                    </Col>
                </Row>             
                {console.log(bouquet)}
                { (bouquet.length > 0) ?
                    bouquet.map(bouquet =>  
                        <BouquetBasketItem key={bouquet.arc} bouquet={bouquet} DeleteOne={DeleteOne} fetch={fetchDataBouquet}/>
                    )
                    : 
                    <UnFindInfo page={'basket'}></UnFindInfo>
                }
            </Col>
            <Col md={4}>
                <div className='puple_border_box'>
                    <h1>Итого </h1>
                    <div>
                        <p>Количество букетов: {bouquet.length}</p>
                        <p>Сумма: {calculatePrice()}</p>
                        <p>Cумма с персональной скидкой: {calculatePriceWDiscounts()}</p>
                    </div>
                </div>
                <div className='d-flex justife-content-center align-items-center mt-3'>
                    <Button id='order' className='pupleButton' disabled={!bouquet.length} variant='outline-light' onClick={() => { navigate(REG_ORDER+'/'+user.user.login)}}>Оформить заказ</Button>
                </div>
               
            </Col>
            </Row>
        </>
    );
});

export default Basket;