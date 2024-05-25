import React, { useContext, useEffect, useState } from 'react';
import { Button, Card,  Image } from 'react-bootstrap';
import basket from '../base_img/icons/green_basket.png';
import heart from '../base_img/icons/green_heart.png';
import {useNavigate} from 'react-router-dom';
import '../css/Item.css';
import { Boquet_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { ApiService } from '../http/api.service';
import { Context } from '../index';
import { Col, Modal, Row, message } from 'antd';

const BoquetItem = (props) => {
    const navigate = useNavigate();
    const bouquet = props.bouquet
    const {user} = useContext(Context)
    const [inBasket,setInBasket] = useState(false);
    const [inSelected,setInSelected] = useState(false);
    const [moduleVisible,setModuleVisible] = useState(false);
    const login = user.user.login;
    console.log('login', login,'bouquet',bouquet);
    const cnt = 1;
    function addBasket(arc) {
        let cnt = 1;
		apiService.post('/basket',{login,arc,cnt}).then(() => {
            messageApi.open({
                type: 'success',
                content: 'Добавлено в корзину',
                duration: 5,
                });
            setInBasket(true) 
		})
        .catch(err => {
            alert(err.message);
        })
	}
    function addSelected(arc) {
		apiService.post('/selected',{login,arc}).then(() => {
            messageApi.open({
                type: 'success',
                content: 'Добавлено в избранное',
                duration: 5,
                });
            setInSelected(true) 
		}).catch(err => {
            alert(err.message);
        })
	}
    function deleteSelected(arc) {
		apiService.delete('/selected/'+login+'/'+arc).then(() => {
            messageApi.open({
                type: 'error',
                content: 'Удаленно из избранного',
                duration: 5,
                });
             
            setInSelected(false) 
		})
	}
    function deleteBasket(arc){
        apiService.delete('/basket/'+login+'/'+arc).then(res => {
            messageApi.open({
                type: 'error',
                content: 'Удаленно из корзины',
                duration: 5,
                });
            setInBasket(false);
        })
    }
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        const bouquet = props.bouquet
        console.log(bouquet);
        if(user.user.post === 'user' && bouquet.arc ){
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
                {contextHolder}
                <Card className='card_bouquet_item' style={{cursor: 'pointer'}} border={"pink"}>
                   <Image className='card_img' style={{width:'100%'}}  src={process.env.REACT_APP_API_URL +bouquet.img} onClick={() => navigate(Boquet_ROUTE+'/'+bouquet.arc)}/>
                    <div className='d-flex justify-content-between '>
                    </div>
                <div className='d-flex flex-column align-items-center'>
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
                                <p><Image width={25}  src={basket} /> Убрать из корзины   </p>
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
                                <p><Image width={25}  src={heart} /> Убрать из избранного </p>
                            </Button>
                        </Col>
                    }
                </Row>
                :  
                (user.user.post === undefined) ? 
                <Row>
                        <Col span={12}>
                            <Button style={{width:'100%',height:'100%'}} variant='light' onClick={()=>setModuleVisible(true)}>
                                <Image width={50} height={50} src={basket} />
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button style={{width:'100%',height:'100%'}} variant='light' onClick={()=>setModuleVisible(true)}> 
                                <Image width={50} height={50} src={heart} />
                            </Button>
                        </Col>
                </Row>
                :<></>}
                <Modal
				title={'Для продолжения необходимо войти в учетную запись. Хотите зарегистрироваться?'}
				open={moduleVisible}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={() => setModuleVisible(false)}
				centered
				footer={[
					<Button 
                    className='pupleButton'
                    onClick={() => setModuleVisible(false)}>Отмена</Button>
				]
                }>
                    <Button variant={"outline-success"} style={{ marginLeft:"2%" }} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </Modal>
             </Card>
        </>
    );
};

export default BoquetItem;