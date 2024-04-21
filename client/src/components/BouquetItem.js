import React from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import basket from '../base_img/icons/green_basket.png';
import heart from '../base_img/icons/green_heart.png';
import {useNavigate} from 'react-router-dom';
import '../css/Item.css';
import { Boquet_ROUTE } from '../utils/consts';
//1.41
const BoquetItem = ({bouquet}) => {
    const navigate = useNavigate();
    //const  arc = bouquet.arc;
    return (
         <>
        <Col md={6} 
             className='d-flex justify-content-between align-items-center mt-3'
             onClick={() => navigate(Boquet_ROUTE+'/'+bouquet.arc)}>
                <Card className='card_bouquet_item' style={{cursor: 'pointer'}} border={"pink"}>
                   <Image className='card_img'  src={bouquet.img}/>
                    <div className='d-flex justify-content-between '>
                   
                    </div>
                <div className='d-flex flex-column  align-items-center'>
                    <div>{bouquet.title}</div>
                    <div>Арт.{bouquet.arc}</div>
                    <div>{bouquet.price} руб.</div>
                    <Row>
                        <Col md={6}>
                            <Button variant='light'><Image width={50} height={50} src={basket}/></Button>
                        </Col>
                        <Col md={6}>
                            <Button variant='light'> 
                                <Image width={50} height={50} src={heart}/>
                            </Button>
                        </Col>
                    </Row>
                </div>
             </Card>
        </Col>
    </>
    );
};

export default BoquetItem;