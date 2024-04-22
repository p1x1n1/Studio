import React, { useContext } from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import basket from '../base_img/icons/green_basket.png';
import heart from '../base_img/icons/green_heart.png';
import {useNavigate} from 'react-router-dom';
import '../css/Item.css';
import { Boquet_ROUTE } from '../utils/consts';
import { ApiService } from '../http/api.service';
import { Context } from '../index';
//1.41
const BoquetItem = ({bouquet}) => {
    const navigate = useNavigate();
    const {user} = useContext(Context)
    const login = user.user.login;
    console.log('login', login);
    const cnt = 1;
    function addBasket(arc) {
		apiService.post('/basket',{login,arc,cnt}).then(() => {
            alert('Добавлено в корзину');
		})
	}
    const apiService = new ApiService()
    return (
         <>
        <Col md={6} 
             className='d-flex justify-content-between align-items-center mt-3'>
                <Card className='card_bouquet_item' style={{cursor: 'pointer'}} border={"pink"}>
                   <Image className='card_img'  src={bouquet.img} onClick={() => navigate(Boquet_ROUTE+'/'+bouquet.arc)}/>
                    <div className='d-flex justify-content-between '>
                    </div>
                <div className='d-flex flex-column  align-items-center'>
                    <div>{bouquet.title}</div>
                    <div>Арт.{bouquet.arc}</div>
                    <div>{bouquet.price} руб.</div>
                    <Row>
                        <Col md={6}>
                            <Button variant='light'><Image width={50} height={50} src={basket} onClick={()=>{addBasket(bouquet.arc)}}/></Button>
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