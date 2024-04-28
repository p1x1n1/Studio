import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Stack } from 'react-bootstrap';
import { ApiService } from '../http/api.service';
import BoquetItemOrder from './BouquetItemOrder';
import { Modal, Segmented, Table, message } from 'antd';
import { Context } from '../index';


const options = [
    {
        label: 'Переданы в доставку',
        value: 6
    },
    {
        label: 'Завершены',
        value: 7
    },
    {
        label: 'Все',
        value: 0
    },
]

const apiService = new ApiService ();

const CourierOrder = () => {
    
    const {user} = useContext(Context)
    const [orders,setOrders] = useState([])
    const [selectOrder,setSelectOrder] = useState({});

    let status = 6;

    const [visibleStatusChange, setVisibleStatusChange] = useState(false);



    function fetchDataOrder(){
        apiService.get('/order/courier/'+user.user.login+'/'+status)
        .then( (response) => {
            console.log(response,'response');
			setOrders(response);
        }) 
    }

    useEffect(() => {
		fetchDataOrder();
	}, [])

    const [messageApi, contextHolder] = message.useMessage();

    const success = (number_order) => {
        messageApi.open({
        type: 'success',
        content: 'Статус заказа '+number_order+' изменён на "Доставлен"',
        duration: 5,
        });
    };

    function saveStatus(number_order,next_status){//добавить отменён
        apiService.post('/order',{
            number_order: number_order,
            statusOrderIdRecord: next_status,
        }).then(() =>
            success(number_order)
        )
        fetchDataOrder();
        setVisibleStatusChange(false);
    }


    return(
        <div className='mt-2'>
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
                        <Accordion.Item onClick={() => setSelectOrder({number_order: order.number_order, status: order.statusOrderIdRecord})}>
                            <Accordion.Header>
                                <Stack direction='horizontal' gap={3} >
                                    <h5>Номер заказа: {order.number_order} </h5>
                                    <h5 style={{color: 'green'}} className="p-2 ms-auto">Статус: {order.status_order_title}</h5>
                                </Stack>
                            </Accordion.Header>
                            <Accordion.Body>
                                <h5>Информация о отправителе:</h5>
                                    <p>Телефон: {order.phone}</p>
                                    <p>Имя: {order.name_} Фамилия: {order.surname} Отчество: {order.lastname}</p>
                                <h5>Доставка:</h5>
                                    <p>Населённый пункт: {order.localities_name} </p>
                                    <p>Улица: {order.streets_name}</p>
                                    <p>Дом: {order.house_number}</p>
                                    <p>Дата доставки: {order.date_order}</p>
                                    <p>Время доставки: {order.time_order}</p>
                                    <p>Вид доставки: {order.type_order_title}</p>
                                    <p>Анонимная доставка: {order.anonymized ? 'Да' : 'Нет'} </p>
                                    <p>Дополнительная информация об адресе: {order.adress_comment}</p>
                                    <p>Комментарий к заказу: {order.comment}</p>
                                    <p>Итоговая стоимость заказа: {order.price}</p>
                                <Stack direction='horizontal' gap={3} className='mt-3 mb-2'>
                                    {(order.statusOrderIdRecord  === 6) ?
                                        <Button type='submit' className='pupleButton ' variant='outline-light' onClick={()=>{  setVisibleStatusChange(true);}}
                                        >  Сменить статус заказа на 'Доставлен'
                                        </Button>
                                        :
                                        <></>                                        
                                    }
                                </Stack>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                <Modal
                    title= {'Подтвердить смену статуса заказа '  + selectOrder.number_order + ' на "Доставлен"?'}
                    open={visibleStatusChange}
                    okText='Да'
                    cancelText='Нет'
                    onCancel={() => setVisibleStatusChange(false)}
                    centered
                    footer={[
                        <Button className='mb-3 greenButton' variant='outlined-light' 
                        onClick={() => {
                            saveStatus(selectOrder.number_order,7);
                        }} >
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
 
export default CourierOrder;