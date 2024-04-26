import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import '../css/Item.css';
import { Boquet_ROUTE } from '../utils/consts';
import { InputNumber } from 'antd';

const BouquetBasketItem = ({bouquet}) => {
    const navigate = useNavigate();
    //const  arc = bouquet.arc;
    // bouquet = 
    //     {arc:2, title: 'Букет1',ready_made:true,price:1500,cnt:15,img:'https://cvetaevatomsk.ru/uploads/goods/2021-11/1636032945_img_5057.jpg'}
    
    return (
         <>
        <Row className='d-flex   mt-3'>
            <Col md={5}>
                <Image className='card_img'  src={bouquet.img} width={300}  onClick={() => navigate(Boquet_ROUTE+'/'+bouquet.arc)}/>
            </Col>
            <Col md = {7}>
                <div className='d-flex flex-column puple_text'>
                        <h1>{bouquet.title}</h1>
                        <h1>Арт. {bouquet.arc}</h1>
                        <h3>{bouquet.price} руб.</h3>
                </div>
                <InputNumber className='d-flex justify-content-between puple_border' changeOnWheel keyboard={true} size="large" min={1} max={3} defaultValue={bouquet.cnt}  />
            </Col>
        </Row>
        <Row className='green_line'></Row>
        </>
    );
};

export default BouquetBasketItem;