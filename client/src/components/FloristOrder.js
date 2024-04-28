import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Stack } from 'react-bootstrap';
import { ApiService } from '../http/api.service';
import BoquetItemOrder from './BouquetItemOrder';
import { Modal, Segmented, message } from 'antd';
import { Context } from '../index';

const apiService = new ApiService ();
const options = [
    {
        label: 'Принят',
        value: 2
    },
    {
        label: 'Изготавливается',
        value: 4
    },
    {
        label: 'Все',
        value: 0
    },
]
const FloristOrder = () => {
    const {user} = useContext(Context)
    const [orders,setOrders] = useState([])
    const [composition, setComposition] = useState([]);
    let status = 2 ,next_status;
    function fetchDataOrder(){
        apiService.get('/order/florist/'+user.user.login+'/'+status)
        .then( (response) => {
            console.log(response,'response');
            const updatedOrders = response.map((order)=>
            {
                apiService.get('/ordercomposition/'+order.number_order).then((res) => {
                    setComposition(res);
                }).catch((err) => {
                    console.log(err,'error');
                });
                return {
					...order,
					composition: composition
				};
			});
			setOrders(updatedOrders);
        }) 
    }
    useEffect(() =>{
        fetchDataOrder();
    }, [])

    const [selectOrder,setSelectOrder] = useState({});

    const [visibleStatusChange, setVisibleStatusChange] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const success = (number_order) => {
        messageApi.open({
        type: 'success',
        content: 'Статус заказа '+number_order+' изменён на ' + ((selectOrder.status===2)?"Изготавливается":"Готов к доставке"),
        duration: 5,
        });
    };

    function saveStatus(number_order,next_status){//добавить отменён
        apiService.post('/order',{
            number_order: number_order,
            statusOrderIdRecord: next_status,//5
        }).then(() =>
            success(number_order)
        )
        fetchDataOrder();
        setVisibleStatusChange(false);
    }

    return(
       <div className='mt-3 '>
        {contextHolder}
        <Segmented options={options} className='mb-3'
            onChange={(value) => {
                status = value;
                console.log(value,status);
                fetchDataOrder();
            }}/>
        {orders.map((order)=>
            <>
                 <Accordion className='mb-0 mt-0'>
                    <Accordion.Item onClick={() => setSelectOrder({number_order:order.number_order,status:order.statusOrderIdRecord})} >
                        <Accordion.Header>
                            <Stack direction='horizontal' gap={8} >
                                <h5>Номер заказа: {order.number_order} </h5>
                                <h5 style={{color: 'green'}} className="p-2 ms-auto">Статус: {order.status_order_title}</h5>
                            </Stack>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p>Состав заказа:</p>
                            {composition.map(bouquet =>
                                <BoquetItemOrder key={bouquet.arc} bouquet={bouquet}/>
                            )}
                            <p> Комментарий к заказу: {order.comment}</p>
                   {(order.statusOrderIdRecord!==0)? <Button type='submit' className='pupleButton mt-3 mb-2' variant='outlined-light' onClick={()=>{  setVisibleStatusChange(true);}} //onClick={//статус заказа изменить прямо тут }
                        > Сменить статус заказа на {((order.statusOrderIdRecord===2)?'"Изготавливается"':'"Готов к доставке"')}</Button>:<></>}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Modal
                title= {'Подтвердить смену статуса заказа '  + selectOrder.number_order + ' на '+((selectOrder.status===2)?"Изготавливается":"Готов к доставке")+'?'}
                open={visibleStatusChange}
    		    okText='Да'
    		    cancelText='Нет'
    		    onCancel={() => setVisibleStatusChange(false)}
    		    centered
                footer={[
                    <Button className='mb-3 greenButton' variant='outlined-light' 
                    onClick={() => {
                        (selectOrder.status === 2) ? next_status = 4 : next_status = 5; 
                        saveStatus(selectOrder.number_order,next_status);
                    }} 
                    >
                     Да
                    </Button>,
                    <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => setVisibleStatusChange(false)}
                    >Нет</Button>
                ]
                }></Modal>
            </>
        )}
       </div>
    );
}
 
export default FloristOrder;