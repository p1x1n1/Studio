import React, { useContext, useEffect, useState } from 'react';
import { ApiService } from '../http/api.service';
import { Context } from '../index';
import { Accordion, Button, Form, Stack, Table } from 'react-bootstrap';
import { Segmented, message } from 'antd';
import BoquetItemOrder from './BouquetItemOrder';

const apiService = new ApiService();

const options = [
    { label: 'В обработке', value: 1 },
    { label: 'Приняты', value: 2 },
    { label: 'Отменены', value: 3 },
    { label: 'Изготавливаются', value: 4 },
    { label: 'Переданы в доставку', value: 6 },
    { label: 'Доставлены', value: 7 },
    { label: 'Все', value: 0 },
];

const UserOrderDocument = (props) => {
    const {user} = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [composition, setComposition] = useState([]);
    const [status, setStatus] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisibleChooseDate,setModalChooseDate]= useState(false);
    const createAndDownloadPdf = (Order) => {
        console.log(user.user.name_, Order);
        apiService.get('/ordercomposition/' + Order.number_order)
            .then((res) => {
                const updatedOrders = {
                    ...Order,
                    composition: res
                };
                console.log('updatedOrders', updatedOrders);
                apiService.post('/document/user', updatedOrders)
                    .then(
                        props.getDocument('/document')
                    )
            }).catch((err) => {
                console.log(err, 'error');
            });
    }
    const repeatOrder = (order) => {
        const { number_order, ...orderWithoutNumber } = order;
        apiService.post('/order/', orderWithoutNumber).then((res) => {
            const newNumberOrder = res.number_order;
            apiService.get('/ordercomposition/' + number_order)
                .then((orderCompositions) => {
                    orderCompositions.forEach((composition) => {
                        console.log(composition);
                        apiService.post('/ordercomposition/create?num='+newNumberOrder, composition);
                    });
                    messageApi.open({
                        type: 'success',
                        content: `Заказ ${number_order} повторён.`,
                        duration: 5,
                    });
                    setStatus(status);
                })
                .catch((err) => {
                    console.log(err, 'error');
                });
        }).catch((err) => {
            console.log(err, 'error');
        });
    };

    function fetchDataOrder() {
        apiService.get('/order/user/' + user.user.login+'?status='+status+`&number_order=${searchQuery}`)
            .then((response) => {
                console.log(response, 'response');
                const updatedOrders = response.map((order) => {
                    apiService.get('/ordercomposition/' + order.number_order)
                        .then((res) => {
                            setComposition(res);
                        }).catch((err) => {
                            console.log(err, 'error');
                        });
                    return {
                        ...order,
                        composition: composition
                    };
                });
                setOrders(updatedOrders);
            })
    }

    useEffect(() => {
        fetchDataOrder();
    }, [status, searchQuery])

    const [messageApi, contextHolder] = message.useMessage();


    return (
        <>
        {contextHolder}
        <Segmented options={options} className='mb-3'
                onChange={(value) => {
                    setStatus(value);
                }} />
        <Form.Control
                type="text"
                placeholder="Поиск по номеру заказа"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='mb-3'
            />
        <Accordion className='mb-0 mt-0' flush>
            {orders.map((order) =>
                        <Accordion.Item eventKey={order.number_order}>
                            <Accordion.Header>
                                <Stack direction='horizontal' gap={5}>
                                    <h5>Номер заказа: {order.number_order} </h5>
                                    <h5 style={{ color: 'green' }} className="p-2 ms-auto">Статус: {order.status_order_title}</h5>
                                    {(order.statusOrderIdRecord === 7) ? <Button className='pupleButton' onClick={() => createAndDownloadPdf(order)}>Получить Чек</Button> : <></>}
                                    {(order.statusOrderIdRecord > 3) ? <Button className='greenButton' onClick={() =>{ repeatOrder(order); setModalChooseDate(true)}}>Повторить заказ</Button> : <></>}
                                </Stack>
                            </Accordion.Header>
                            <Accordion.Body>
                                <h5>Информация о покупателе:</h5>
                                <Table striped bordered hover>
                                    <tbody>
                                        <tr>
                                            <td>Логин</td>
                                            <td>{order.userLogin}</td>
                                        </tr>
                                        <tr>
                                            <td>Почта</td>
                                            <td>{order.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Телефон</td>
                                            <td>{order.phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Имя</td>
                                            <td>{order.name_}</td>
                                        </tr>
                                        <tr>
                                            <td>Фамилия</td>
                                            <td>{order.surname}</td>
                                        </tr>
                                        <tr>
                                            <td>Отчество</td>
                                            <td>{order.lastname}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <h5>Доставка:</h5>
                                <Table striped bordered hover>
                                    <tbody>
                                        <tr>
                                            <td>Населённый пункт</td>
                                            <td>{order.localities_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Улица</td>
                                            <td>{order.streets_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Дом</td>
                                            <td>{order.house_number}</td>
                                        </tr>
                                        <tr>
                                            <td>Дата доставки</td>
                                            <td>{order.date_order}</td>
                                        </tr>
                                        <tr>
                                            <td>Время доставки</td>
                                            <td>{order.time_order}</td>
                                        </tr>
                                        <tr>
                                            <td>Вид доставки</td>
                                            <td>{order.type_order_title}</td>
                                        </tr>
                                        <tr>
                                            <td>Анонимная доставка</td>
                                            <td>{order.anonymized ? 'Да' : 'Нет'}</td>
                                        </tr>
                                        <tr>
                                            <td>Дополнительная информация об адресе</td>
                                            <td>{order.adress_comment}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <h5>Состав заказа:</h5>
                                {composition.map(bouquet =>
                                    <BoquetItemOrder key={bouquet.arc} bouquet={bouquet} />
                                )}
                                <Table striped bordered hover>
                                    <tbody>
                                        <tr>
                                            <td>Комментарий к заказу</td>
                                            <td>{order.comment}</td>
                                        </tr>
                                        <tr>
                                            <td>Итоговая стоимость заказа</td>
                                            <td>{order.price}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <h5>Назначенные сотрудники:</h5>
                                <Table striped bordered hover>
                                    <tbody>
                                        <tr>
                                            <td>Флорист</td>
                                            <td>{order.floristLogin}</td>
                                        </tr>
                                        <tr>
                                            <td>Курьер</td>
                                            <td>{order.courierLogin}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
            )}
        </Accordion>
        </>
    );
}

export default UserOrderDocument;
