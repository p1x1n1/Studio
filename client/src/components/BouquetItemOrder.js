import React, { useContext, useEffect, useState } from 'react';
import { Button, Card,  Image } from 'react-bootstrap';
import basket from '../base_img/icons/green_basket.png';
import heart from '../base_img/icons/green_heart.png';
import {useNavigate} from 'react-router-dom';
import '../css/Item.css';
import { Boquet_ROUTE } from '../utils/consts';
import { ApiService } from '../http/api.service';
import { Context } from '../index';
import { Col, Row } from 'antd';


const BoquetItemOrder = ({bouquet}) => {
    const navigate = useNavigate();
    return (
         <>
        <Col md={3} 
             className='d-flex justify-content-between mt-3'>
                {/* {console.log(bouquet,'bouquet')} */}
                <Card className='card_bouquet_item' style={{cursor: 'pointer'}} border={"pink"}>
                   <Image className='card_img'  src={process.env.REACT_APP_API_URL +bouquet.img} onClick={() => navigate(Boquet_ROUTE+'/'+bouquet.arc)}/>
                    <div className='d-flex justify-content-between '>
                    </div>
                <div className='d-flex flex-column  align-items-center'>
                    {(!bouquet.ready_made) ? <p>Индивидуальный букет</p> : <></>}
                    <p>Название: {bouquet.title}</p>
                    <p>Артикул:  {bouquet.arc}</p>
                    <p>Подпись к открытке:  {bouquet.postcard_comment}</p>
                    <p>Состав: </p>
                </div>
                
             </Card>
        </Col>
    </>
    );
};

export default BoquetItemOrder;