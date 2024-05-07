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
//1.41
const BoquetItem = (props) => {
    const navigate = useNavigate();
    const bouquet = props.bouquet
    const {user} = useContext(Context)
    const [inBasket,setInBasket] = useState(false);
    const [inSelected,setInSelected] = useState(false);
    const login = user.user.login;
    console.log('login', login);
    const cnt = 1;
    function addBasket(arc) {
		apiService.post('/basket',{login,arc,cnt}).then(() => {
            alert('Добавлено в корзину');
            setInBasket(true) 
		})
        .catch(err => {
            alert(err.message);
        })
	}
    function addSelected(arc) {
		apiService.post('/selected',{login,arc}).then(() => {
            alert('Добавлено в избранное');
            setInSelected(true) 
		})
	}
    function deleteSelected(arc) {
		apiService.delete('/selected/'+login+'/'+arc).then(() => {
            alert('Удаленно из избранного');  
            setInSelected(false) 
		})
	}
    function deleteBasket(arc){
        apiService.delete('/basket/'+user.user.login+'/'+arc).then(res => {
            alert('Удаленно из корзины'); 
            setInBasket(false);
        })
    }
    useEffect(() => {
        if(user.user.post === 'user'){
            apiService.get('/basket/'+login+'/'+bouquet.arc).then((res) => {
                setInBasket(true)                
            }).catch((err) => {})
            apiService.get('/selected/'+login+'/'+bouquet.arc).then((res) => {
                setInSelected(true)                
            }).catch((err) => {})
        }
    },[setInBasket,setInSelected])
    const apiService = new ApiService()
    return (
        <>
                <Card className='card_bouquet_item' style={{cursor: 'pointer'}} border={"pink"}>
                   <Image className='card_img'  src={process.env.REACT_APP_API_URL +bouquet.img} width={300} height={300} onClick={() => navigate(Boquet_ROUTE+'/'+bouquet.arc)}/>
                    <div className='d-flex justify-content-between '>
                    </div>
                <div className='d-flex flex-column  align-items-center'>
                    <div>{bouquet.title}</div>
                    <div>Арт.{bouquet.arc}</div>
                    <div>{bouquet.price} руб.</div>
                </div>
                { (user.user.post === 'user') ?
                <Row >
                    {!inBasket ? 
                        <Col span={12}>
                            <Button style={{width:'100%',height:'100%'}} variant='light' onClick={()=>{addBasket(bouquet.arc)}}>
                                <Image width={50} height={50} src={basket} />
                            </Button>
                        </Col>:
                        <Col span={12}>
                            <Button style={{width:'100%',height:'100%'}} variant='light' onClick={()=>{deleteBasket(bouquet.arc)}}>
                                <p>В корзине</p>
                                <Image width={50} height={50} src={basket} />
                            </Button>
                        </Col>
                    }
                    {!inSelected ?
                        <Col span={12}>
                            <Button style={{width:'100%',height:'100%'}} variant='light' onClick={()=>{addSelected(bouquet.arc)}}> 
                                <Image width={50} height={50} src={heart} />
                            </Button>
                        </Col>
                        :
                        <Col span={12}>
                            <Button style={{width:'100%',height:'100%'}} variant='light' onClick={()=>{deleteSelected(bouquet.arc)}}> 
                                <p>В избранном</p>
                                <Image width={50} height={50} src={heart} />
                            </Button>
                        </Col>
                    }
                </Row>
                :<></>}
             </Card>
        </>
    );
};

export default BoquetItem;