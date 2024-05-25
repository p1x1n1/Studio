import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Stack, Form, Pagination } from 'react-bootstrap';
import { ApiService } from '../http/api.service';
import BoquetItemOrder from './BouquetItemOrder';
import { Modal, Segmented, message } from 'antd';
import { Context } from '../index';

const apiService = new ApiService();
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
];

const FloristOrder = () => {
    const { user } = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [composition, setComposition] = useState([]);
    const [searchOrderNumber, setSearchOrderNumber] = useState('');
    const [status, setStatus] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const ordersPerPage = 10;
    const [selectOrder, setSelectOrder] = useState({});
    const [visibleStatusChange, setVisibleStatusChange] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const offset = (currentPage - 1) * ordersPerPage;

    function fetchDataOrder() {
        let url = `/order/florist/${user.user.login}/${status}?offset=${offset}&limit=${ordersPerPage}`;
        if (searchOrderNumber) {
            url += `&number_order=${searchOrderNumber}`;
        }
        apiService.get(url)
            .then(response => {
                setOrders(response.orders);
                setTotalOrders(response.total);
            })
            .catch(err => {
                console.log(err, 'error');
            });
    }

    useEffect(() => {
        fetchDataOrder();
    }, [status, searchOrderNumber, currentPage]);

    const success = (number_order) => {
        messageApi.open({
            type: 'success',
            content: 'Статус заказа ' + number_order + ' изменён на ' + ((selectOrder.status === 2) ? "Изготавливается" : "Готов к доставке"),
            duration: 5,
        });
    };

    function saveStatus(number_order, next_status) {
        apiService.post('/order', {
            number_order: number_order,
            statusOrderIdRecord: next_status,
        }).then(() =>
            success(number_order)
        )
        fetchDataOrder();
        setVisibleStatusChange(false);
    }

    const totalPages = Math.ceil(totalOrders / ordersPerPage);

    return (
        <div className='mt-3 '>
            {contextHolder}
            <Segmented options={options} className='mb-3'
                onChange={(value) => {
                    setStatus(value);
                }} />
            <Form.Control
                type="text"
                placeholder="Введите номер заказа"
                value={searchOrderNumber}
                onChange={(e) => setSearchOrderNumber(e.target.value)}
                className='mb-3'
            />
            {orders.map((order) =>
                <Accordion className='mb-0 mt-0' key={order.number_order}>
                    <Accordion.Item onClick={() => setSelectOrder({ number_order: order.number_order, status: order.status_order_id_record })}>
                        <Accordion.Header>
                            <Stack direction='horizontal' gap={8}>
                                <h5>Номер заказа: {order.number_order} </h5>
                                <h5 style={{ color: 'green' }} className="p-2 ms-auto">Статус: {order.status_order_title}</h5>
                            </Stack>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p>Состав заказа:</p>
                            {order.composition.map(bouquet =>
                                <BoquetItemOrder key={bouquet.arc} bouquet={bouquet} />
                            )}
                            <p> Комментарий к заказу: {order.comment}</p>
                            {(order.status_order_id_record !== 0) ?
                                <Button type='submit' className='pupleButton mt-3 mb-2' variant='outlined-light' onClick={() => { setVisibleStatusChange(true); }}
                                > Сменить статус заказа на {((order.status_order_id_record === 2) ? '"Изготавливается"' : '"Готов к доставке"')}</Button> : <></>}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )}
            <Pagination className='mt-3'>
                <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
            <Modal
                title={'Подтвердить смену статуса заказа ' + selectOrder.number_order + ' на ' + ((selectOrder.status === 2) ? "Изготавливается" : "Готов к доставке") + '?'}
                open={visibleStatusChange}
                okText='Да'
                cancelText='Нет'
                onCancel={() => setVisibleStatusChange(false)}
                centered
                footer={[
                    <Button className='mb-3 greenButton' variant='outlined-light'
                        onClick={() => {
                            const next_status = (selectOrder.status === 2) ? 4 : 5;
                            saveStatus(selectOrder.number_order, next_status);
                        }}
                    >
                        Да
                    </Button>,
                    <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => setVisibleStatusChange(false)}
                    >Нет</Button>
                ]}
            />
        </div>
    );
}

export default FloristOrder;
