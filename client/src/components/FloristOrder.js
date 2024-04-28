import React, { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { ApiService } from '../http/api.service';
import BoquetItemOrder from './BouquetItemOrder';
import { Modal, message } from 'antd';

const apiService = new ApiService ();
const FloristOrder = () => {
    const [orders,setOrders] = useState([])
    const [composition, setComposition] = useState([]);
    
    function fetchDataOrder(){
        apiService.get('/order/florist')
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
        content: 'Статус заказа '+number_order+' изменён на "Изготавливается"',
        duration: 5,
        });
    };

    function saveStatus(number_order){//добавить отменён
        apiService.post('/order',{
            number_order: number_order,
            statusOrderIdRecord: 4,//5
        }).then(() =>
            success(number_order)
        )
        fetchDataOrder();
        setVisibleStatusChange(false);
    }

    return(
       <div className='mt-3 '>
        {contextHolder}
        {orders.map((order)=>
            <>
                 <Accordion className='mb-0 mt-0'>
                    <Accordion.Item onClick={() => setSelectOrder(order.number_order)} >
                        <Accordion.Header>
                            <div className='d-flex justify-content-between'>
                                <h5>Номер заказа: {order.number_order} </h5>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p>Состав заказа:</p>
                            {composition.map(bouquet =>
                                <BoquetItemOrder key={bouquet.arc} bouquet={bouquet}/>
                            )}
                            <p> Комментарий к заказу: {order.comment}</p>
                    <Button type='submit' className='pupleButton mt-3 mb-2' variant='outlined-light' onClick={()=>{  setVisibleStatusChange(true);}} //onClick={//статус заказа изменить прямо тут }
                        > Сменить статус заказа на "Изготавливается"</Button>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Modal
                title= {'Подтвердить смену статуса заказа '  + selectOrder + ' на "Принят"?'}
                open={visibleStatusChange}
    		    okText='Да'
    		    cancelText='Нет'
    		    onCancel={() => setVisibleStatusChange(false)}
    		    centered
                footer={[
                    <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => saveStatus(selectOrder)} >
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