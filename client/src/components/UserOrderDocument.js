import React, { useContext, useEffect, useState } from 'react';
import { ApiService } from '../http/api.service';
import { Context } from '../index';
import { Accordion, Button, Stack, Table } from 'react-bootstrap';
import { message } from 'antd';
import BoquetItemOrder from './BouquetItemOrder';

const apiService = new ApiService();

const UserOrderDocument = (props) => {
    const {user} = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [composition, setComposition] = useState([]);

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

    function fetchDataOrder() {
        apiService.get('/order/user/' + user.user.login)
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
    }, [])

    const [messageApi, contextHolder] = message.useMessage();


    return (
        <>
            {orders.map((order) =>
                <>
                    <Accordion className='mb-0 mt-0'>
                        <Accordion.Item>
                            <Accordion.Header>
                                <Stack direction='horizontal' gap={5}>
                                    <h5>Номер заказа: {order.number_order} </h5>
                                    <h5 style={{ color: 'green' }} className="p-2 ms-auto">Статус: {order.status_order_title}</h5>
                                    {(order.statusOrderIdRecord === 7) ? <Button className='pupleButton' onClick={() => createAndDownloadPdf(order)}>Получить Чек</Button> : <></>}
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
                    </Accordion>
                </>
            )}
        </>
    );
}

export default UserOrderDocument;
