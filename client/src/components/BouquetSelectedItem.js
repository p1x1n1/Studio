import React, { useContext, useEffect, useState } from 'react';
import { Button, Card,Image } from 'react-bootstrap';
import basket from '../base_img/icons/green_basket.png';
import heart from '../base_img/icons/green_heart.png';
import {useNavigate} from 'react-router-dom';
import '../css/Item.css';
import { Boquet_ROUTE } from '../utils/consts';
import { ApiService } from '../http/api.service';
import { Context } from '../index';
import { Col, Row } from 'antd';
//1.41
const BoquetSelectedItem = (props) => {
    const bouquet = props.bouquet;
    const navigate = useNavigate();
    const {user} = useContext(Context)
    const login = user.user.login;
    

    useEffect(() => {
        if(user.user.post === 'user'){
            apiService.get('/basket/'+login+'/'+bouquet.arc).then((res) => {
                props.setInBasket(true)                
            }).catch((err) => {})
        }
    },[])
    
    const apiService = new ApiService()
    return (
         <>
        <Col md={8}  style={{padding:'20px'}}
             className='d-flex justify-content-between align-items-center mt-3'>
                <Card className='card_bouquet_item' style={{cursor: 'pointer'}} border={"pink"}>
                   <Image className='card_img'  src={process.env.REACT_APP_API_URL +bouquet.img} onClick={() => navigate(Boquet_ROUTE+'/'+bouquet.arc)}/>
                    <div className='d-flex justify-content-between '>
                    </div>
                <div className='d-flex flex-column  align-items-center'>
                    <div>{bouquet.title}</div>
                    <div>Арт.{bouquet.arc}</div>
                    <div>{bouquet.price} руб.</div>
                </div>
                <Row>
                        {!props.inBasket ? 
                            <Col span={12}>
                                <Button style={{width:'100%',height:'100%'}}variant='light' onClick={()=>{props.addBasket(bouquet.arc)}}>
                                    <Image width={50} height={50} src={basket} />
                                </Button>
                            </Col>:
                            <Col span={12}>
                                <Button style={{width:'100%',height:'100%'}} variant='light' onClick={()=>{props.deleteBasket(bouquet.arc)}}>
                                <p><Image width={25}  src={basket} /> Убрать из корзины   </p>
                                </Button>
                            </Col>
                        }
                          <Col span={12}>
                            <Button variant='light' style={{width:'100%',height:'100%'}} onClick={()=>{props.deleteSelected(bouquet.arc)}} > 
                            <p><Image width={25}  src={heart} /> Убрать из избранного </p>
                            </Button>
                        </Col>
                    </Row>
             </Card>
        </Col>
    </>
    );
};

export default BoquetSelectedItem;