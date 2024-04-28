import React from 'react';
import { Accordion, Button, Container } from 'react-bootstrap';
import "../css/Order.css"

const CourierOrder = () => {
    const order =  {number:34, idStatusOrder:3};
    return(
    <div>
        <Accordion defaultActiveKey="0">
    <Accordion.Item eventKey="0" className='pupleAccordion'>
        <Accordion.Header title={'Номер заказа:' + order.number}></Accordion.Header>
        <Accordion.Body>
            <div className='order_accordion_list'>
                <h2>Населённый пункт: </h2>
                <h2>Улица:</h2>
                <h2>Дом: {order.house_number}</h2>
                <h2>Дата доставки: {order.data_order}</h2>
                <h2>Время доставки: {order.time_order}</h2>
                <h2>Анонимная доставка: {order.anonymized} </h2>
                <h2>Дополнительная информация: {order.adress_comment}</h2>
            </div>
            <Button type='submit' className='pupleButton' //onClick={//статус заказа изменить прямо тут }
            > Сменить статус заказа</Button>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
    </div>
        )
};
 
export default CourierOrder;