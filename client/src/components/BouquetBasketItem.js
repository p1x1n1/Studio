import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import '../css/Item.css';
import { Boquet_ROUTE } from '../utils/consts';
import { InputNumber } from 'antd';
import basket from '../base_img/icons/green_basket.png';
import heart from '../base_img/icons/green_heart.png';
import { Context } from '../index';
import { ApiService } from '../http/api.service';
import { observer } from 'mobx-react-lite';


const apiService = new ApiService()
const BouquetBasketItem = (props) => {
    const navigate = useNavigate();
    const {user} = useContext(Context)
    const bouquet = props.bouquet;
    //const  arc = bouquet.arc;
    // bouquet = 
    //     {arc:2, title: 'Букет1',ready_made:true,price:1500,cnt:15,img:'https://cvetaevatomsk.ru/uploads/goods/2021-11/1636032945_img_5057.jpg'}
    const [inSelected,setInSelected] = useState(false);
    const login = user.user.login;
    console.log('login', login);
    useEffect(() => {
        apiService.get('/selected/'+login+'/'+bouquet.arc).then((res) => {
            setInSelected(true)                
        }).catch((err) => {});
	}, [])
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
    function updateCnt(cnt){
        apiService.post('/basket/'+bouquet.arc,{userLogin:user.user.login, boquetArc:bouquet.arc,cnt:cnt})
    }
    return (
         <>
        <Row className='d-flex   mt-3'>
            <Col md={5}>
                <Image className='card_img'  src={process.env.REACT_APP_API_URL +bouquet.img} width={300}  onClick={() => navigate(Boquet_ROUTE+'/'+bouquet.arc)}/>
            </Col>
            <Col md = {7}>
                <div className='d-flex flex-column puple_text'>
                        <h1>{bouquet.title}</h1>
                        <h1>Арт. {bouquet.arc}</h1>
                        <h3>{bouquet.price} руб.</h3>
                </div>
                <InputNumber className='d-flex justify-content-between puple_border' changeOnWheel keyboard={true} size="large" min={1}
                 defaultValue={bouquet.cnt}  onChange={updateCnt}/>
                
                    <Row className='mt-2'>
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
                        <Col span={12}>
                        <Button variant='light' style={{width:'100%',height:'100%'}} onClick={()=>{props.DeleteOne(bouquet.arc)}}>
                            <p>Удалить из корзины</p>
                            <Image width={50} height={50} src={basket} />
                        </Button>
                        </Col>
                </Row>
            </Col>
        </Row>
        
        <Row className='green_line'></Row>
        </>
    );
};

export default BouquetBasketItem;