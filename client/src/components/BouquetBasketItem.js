import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/Item.css';
import { Boquet_ROUTE } from '../utils/consts';
import { InputNumber } from 'antd';
import basket from '../base_img/icons/green_basket.png';
import heart from '../base_img/icons/green_heart.png';
import { Context } from '../index';
import { ApiService } from '../http/api.service';
import { observer } from 'mobx-react-lite';
import { message } from 'antd';

// Создание экземпляра ApiService
const apiService = new ApiService();

const BouquetBasketItem = (props) => {
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const { bouquet, fetch, DeleteOne } = props;
    const [inSelected, setInSelected] = useState(false);
    const login = user.user.login;
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        // Проверка, находится ли букет в избранном
        apiService.get(`/selected/${login}/${bouquet.arc}`).then(() => {
            setInSelected(true);
        }).catch((err) => {
            console.log(err)
        });
    }, [bouquet.arc, login]);

    const addSelected = (arc) => {
        apiService.post('/selected', { login, arc }).then(() => {
            messageApi.open({
                type: 'success',
                content: 'Добавлено в избранное',
                duration: 5,
            });
            setInSelected(true);
        }).catch((err) => {
            console.log(err)
        });
    };

    const deleteSelected = (arc) => {
        apiService.delete(`/selected/${login}/${arc}`).then(() => {
            messageApi.open({
                type: 'error',
                content: 'Удаленно из избранного',
                duration: 5,
            });
            setInSelected(false);
        }).catch((err) => {
            console.log(err)
        });
    };

    const updateCnt = (cnt) => {
        apiService.post(`/basket/${bouquet.arc}`, { userLogin: user.user.login, boquetArc: bouquet.arc, cnt }).then(() => {
            fetch();
        }).catch((err) => {
            console.log(err)
        });
    };

    return (
        <>
         {contextHolder}
            <Row className='d-flex mt-3'>
                <Col md={5}>
                    <Image 
                        className='card_img' 
                        src={process.env.REACT_APP_API_URL + bouquet.img} 
                        width={300}  
                        onClick={() => navigate(`${Boquet_ROUTE}/${bouquet.arc}`)}
                    />
                </Col>
                <Col md={7}>
                    <div className='d-flex flex-column puple_text'>
                        <h1>{bouquet.title}</h1>
                        <h1>Арт. {bouquet.arc}</h1>
                        <h3>{bouquet.price} руб.</h3>
                    </div>
                    <InputNumber 
                        className='d-flex justify-content-between puple_border' 
                        changeOnWheel 
                        keyboard={true} 
                        size="large" 
                        min={1}
                        defaultValue={bouquet.cnt}  
                        onChange={updateCnt}
                    />
                    <Row className='mt-2'>
                        <Col span={12}>
                            <Button 
                                style={{ width: '100%', height: '100%' }} 
                                variant='light' 
                                onClick={() => {
                                    inSelected ? deleteSelected(bouquet.arc) : addSelected(bouquet.arc);
                                }}
                            >
                                <Image width={50} height={50} src={heart} />
                                <p>{inSelected ? 'В избранном' : 'Добавить в избранное'}</p>
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button 
                                variant='light' 
                                style={{ width: '100%', height: '100%' }} 
                                onClick={() => DeleteOne(bouquet.arc)}
                            >
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

// Оборачиваем в observer, если используем MobX для управления состоянием
export default observer(BouquetBasketItem);
