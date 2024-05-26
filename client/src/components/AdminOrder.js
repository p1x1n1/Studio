import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Stack, Form } from 'react-bootstrap';
import { ApiService } from '../http/api.service';
import BoquetItemOrder from './BouquetItemOrder';
import { Modal, Segmented, Table, Pagination, message } from 'antd';
import { Context } from '../index';

const employee_columns = [
    {
        title: 'Логин',
        dataIndex: 'login',
        key: 'login'
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: 'Имя',
        dataIndex: 'name_',
        key: 'name_'
    },
    {
        title: 'Фамилия',
        dataIndex: 'surname',
        key: 'surname'
    },
    {
        title: 'Отчество',
        dataIndex: 'lastname',
        key: 'lastname'
    },
];

const options = [
    {
        label: 'В обработке',
        value: 1
    },
    {
        label: 'Готовы к доставке',
        value: 5
    },
    {
        label: 'Завершены',
        value: 7
    },
    {
        label: 'Отменен',
        value: 3
    },
    {
        label: 'Все',
        value: 0
    },
];

const apiService = new ApiService();

const AdminOrder = () => {
    const { user } = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [selectOrder, setSelectOrder] = useState({});
    const [status, setStatus] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const ordersPerPage = 10;
    const [visibleStatusChange, setVisibleStatusChange] = useState(false);
    const [visibleFloristSelect, setVisibleFloristSelect] = useState(false);
    const [visibleCourierSelect, setVisibleCourierSelect] = useState(false);
    const [florists, setFlorists] = useState([]);
    const [selectFlorist, setFlorist] = useState('');
    const [VisibleConfirmFlorist, setVisibleConfirmFlorist] = useState(false);
    const [couriers, setCouriers] = useState([]);
    const [selectCourier, setCourier] = useState('');
    const [VisibleConfirmCourier, setVisibleConfirmCourier] = useState(false);
    const [VisibleCancelOrder, setVisibleCancelOrder] = useState(false);

    const offset = (currentPage - 1) * ordersPerPage;

    function fetchDataOrder() {
        console.log(status);
        let url = `/order/admin/${status}?offset=${offset}&limit=${ordersPerPage}`;
        if (searchQuery) {
            url += `&number_order=${searchQuery}`;
        }
        apiService.get(url)
            .then(response => {
                console.log(response);
                setOrders(response.orders);
                setTotalOrders(response.total);
            })
            .catch(err => {
                console.log(err, 'error');
            });
    }

    function fetchDataFlorist() {
        apiService.get('/employee/florist')
            .then(response => {
                setFlorists(response);
            });
    }

    function fetchDataCourier() {
        apiService.get('/employee/courier')
            .then(response => {
                setCouriers(response);
            });
    }

    useEffect(() => {
        fetchDataOrder();
        fetchDataFlorist();
        fetchDataCourier();
    }, [status, currentPage, searchQuery]);

    const [messageApi, contextHolder] = message.useMessage();

    const success = (number_order) => {
        messageApi.open({
            type: 'success',
            content: `Статус заказа ${number_order} изменён на ${selectOrder.status === 1 ? "Принят" : "Передан в доставку"}`,
            duration: 5,
        });
    };

    function saveStatus(number_order, next_status) {
        apiService.post('/order', {
            number_order: number_order,
            statusOrderIdRecord: next_status,
            employeeLogin: user.user.login,
        }).then(() => {
            success(number_order);
            fetchDataOrder();
            setVisibleStatusChange(false);
        }
    );
    }

    function cancelOrder(number_order) {
        apiService.post('/order', {
            number_order: number_order,
            statusOrderIdRecord: 3,
            employeeLogin: user.user.login,
        }).then(() => {
            messageApi.open({
                type: 'error',
                content: `Заказ ${number_order} отменен.`,
                duration: 5,
            });
            fetchDataOrder();
            setVisibleCancelOrder(false);
        });
    }

    function closeFloristSelect() {
        setFlorist('');
        setVisibleConfirmFlorist(false);
        setVisibleFloristSelect(false);
    }

    function saveFloristSelect(number_order) {
        apiService.post('/order', {
            number_order: number_order,
            floristLogin: selectFlorist,
        });
        fetchDataOrder();
        closeFloristSelect();
    }

    function closeCourierSelect() {
        setCourier('');
        setVisibleConfirmCourier(false);
        setVisibleCourierSelect(false);
    }

    function saveCourierSelect(number_order) {
        apiService.post('/order', {
            number_order: number_order,
            courierLogin: selectCourier,
        });
        fetchDataOrder();
        closeCourierSelect();
    }

    const totalPages = Math.ceil(totalOrders / ordersPerPage);

    return (
        <div className='mt-2'>
            {contextHolder}
            <Segmented options={options} className='mb-3'
                onChange={(value) => {
                    setStatus(value);
                }} />
            <Form.Control
                type="text"
                placeholder="Поиск по номеру букета"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='mb-3'
            />
            {(orders && orders.length > 0) ?
            orders.map((order) =>
                <Accordion key={order.number_order} className='mb-0 mt-0'>
                    <Accordion.Item onClick={() => setSelectOrder({ number_order: order.number_order, floristLogin: order.floristLogin, courierLogin: order.courierLogin, status: order.statusOrderIdRecord })}>
                        <Accordion.Header>
                            <Stack direction='horizontal' gap={3} >
                                <h5>Номер заказа: {order.number_order} </h5>
                                <h5 style={{ color: 'green' }} className="p-2 ms-auto">Статус: {order.status_order_title}</h5>
                            </Stack>
                        </Accordion.Header>
                        <Accordion.Body>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th colSpan="2">Информация о покупателе</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Логин:</td>
                                        <td>{order.userLogin}</td>
                                    </tr>
                                    <tr>
                                        <td>Почта:</td>
                                        <td>{order.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Телефон:</td>
                                        <td>{order.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Имя:</td>
                                        <td>{order.name_}</td>
                                    </tr>
                                    <tr>
                                        <td>Фамилия:</td>
                                        <td>{order.surname}</td>
                                    </tr>
                                    <tr>
                                        <td>Отчество:</td>
                                        <td>{order.lastname}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th colSpan="2">Доставка</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Населённый пункт:</td>
                                        <td>{order.localities_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Улица:</td>
                                        <td>{order.streets_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Дом:</td>
                                        <td>{order.house_number}</td>
                                    </tr>
                                    <tr>
                                        <td>Дата доставки:</td>
                                        <td>{order.date_order}</td>
                                    </tr>
                                    <tr>
                                        <td>Время доставки:</td>
                                        <td>{order.time_order}</td>
                                    </tr>
                                    <tr>
                                        <td>Вид доставки:</td>
                                        <td>{order.type_order_title}</td>
                                    </tr>
                                    <tr>
                                        <td>Анонимная доставка:</td>
                                        <td>{order.anonymized ? 'Да' : 'Нет'}</td>
                                    </tr>
                                    <tr>
                                        <td>Дополнительная информация об адресе:</td>
                                        <td>{order.adress_comment}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th colSpan="2">Состав заказа</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.composition.map(bouquet => (
                                        <BoquetItemOrder key={bouquet.arc} bouquet={bouquet} />
                                    ))}
                                    <tr>
                                        <td>Комментарий к заказу:</td>
                                        <td>{order.comment}</td>
                                    </tr>
                                    <tr>
                                        <td>Итоговая стоимость заказа:</td>
                                        <td>{order.price}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th colSpan="2">Назначенные сотрудники</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Флорист:</td>
                                        <td>{order.floristLogin}</td>
                                    </tr>
                                    <tr>
                                        <td>Курьер:</td>
                                        <td>{order.courierLogin}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Stack direction='horizontal' gap={3} className='mt-3 mb-2'>
                                {order.statusOrderIdRecord === 1 &&
                                    <>
                                        <Button type='submit' className='pupleButton ' variant='outline-light' onClick={() => setVisibleStatusChange(true)}>
                                            Сменить статус заказа на 'Принят'
                                        </Button>
                                        <Button type='submit' className='greenButton' variant='outline-success' onClick={() => setVisibleFloristSelect(true)}>
                                            Назначить Флориста
                                        </Button>
                                        <Button type='submit' className='greenButton' variant='outline-success' onClick={() => setVisibleCourierSelect(true)}>
                                            Назначить Курьера
                                        </Button>
                                        <Button type='submit' className='redButton' variant='outline-danger' onClick={() => setVisibleCancelOrder(true)}>
                                            Отменить заказ
                                        </Button>
                                    </>
                                }
                                {order.statusOrderIdRecord === 5 &&
                                    <Button type='submit' className='pupleButton ' variant='outline-light' onClick={() => setVisibleStatusChange(true)}>
                                        Сменить статус заказа на 'Передан в доставку'
                                    </Button>
                                }
                            </Stack>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
            :
            <h3>Заказы не найдены</h3>
            }
            <Pagination
                current={currentPage}
                total={totalOrders}
                pageSize={ordersPerPage}
                onChange={(page) => setCurrentPage(page)}
                className='mt-3'
            />
            <Modal
                title={'Назначить флориста для заказа номер: ' + selectOrder.number_order}
                open={visibleFloristSelect}
                cancelText='Отмена'
                onCancel={() => closeFloristSelect()}
                centered
                width={1200}
                footer={[
                    <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => closeFloristSelect()}>
                        Отмена
                    </Button>
                ]}
            >
                <Table
                    dataSource={florists}
                    columns={employee_columns}
                    onRow={rec => {
                        return {
                            onClick: () => {
                                setFlorist(rec.login);
                                setVisibleConfirmFlorist(true);
                            }
                        };
                    }}
                >
                </Table>
            </Modal>
            <Modal
                title={'Подтвердить назначения флориста ' + selectFlorist + ' на заказ ' + selectOrder.number_order + '?'}
                open={VisibleConfirmFlorist}
                okText='Сохранить'
                cancelText='Отмена'
                onCancel={() => closeFloristSelect()}
                centered
                footer={[
                    <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => saveFloristSelect(selectOrder.number_order)}>
                        Сохранить
                    </Button>,
                    <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => closeFloristSelect()}>
                        Отмена
                    </Button>
                ]}
            ></Modal>
            <Modal
                title={'Назначить курьера для заказа номер: ' + selectOrder.number_order}
                open={visibleCourierSelect}
                cancelText='Отмена'
                onCancel={() => closeCourierSelect()}
                centered
                width={1200}
                footer={[
                    <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => closeCourierSelect()}>
                        Отмена
                    </Button>
                ]}
            >
                <Table
                    dataSource={couriers}
                    columns={employee_columns}
                    onRow={rec => {
                        return {
                            onClick: () => {
                                setCourier(rec.login);
                                setVisibleConfirmCourier(true);
                            }
                        };
                    }}
                >
                </Table>
            </Modal>
            <Modal
                title={'Подтвердить назначения курьера ' + selectCourier + ' на заказ ' + selectOrder.number_order + '?'}
                open={VisibleConfirmCourier}
                okText='Сохранить'
                cancelText='Отмена'
                onCancel={() => closeCourierSelect()}
                centered
                footer={[
                    <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => saveCourierSelect(selectOrder.number_order)}>
                        Сохранить
                    </Button>,
                    <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => closeCourierSelect()}>
                        Отмена
                    </Button>
                ]}
            ></Modal>
            <Modal
                title={'Подтвердить смену статуса заказа ' + selectOrder.number_order + ' на ' + ((selectOrder.status === 1) ? '"Принят"' : '"Передан в доставку"') + '?'}
                open={visibleStatusChange}
                okText='Да'
                cancelText='Нет'
                onCancel={() => setVisibleStatusChange(false)}
                centered
                footer={[
                    <Button className='mb-3 greenButton' variant='outlined-light'
                        onClick={() => {
                            const next_status = (selectOrder.status === 1) ? 2 : 6;
                            saveStatus(selectOrder.number_order, next_status);
                        }}
                        disabled={!selectOrder.floristLogin && !selectOrder.courierLogin}>
                        Да
                    </Button>,
                    <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => setVisibleStatusChange(false)}>
                        Нет
                    </Button>
                ]}
            ></Modal>
            <Modal
                title={'Подтвердить отмену заказа ' + selectOrder.number_order + '?'}
                open={VisibleCancelOrder}
                okText='Да'
                cancelText='Нет'
                onCancel={() => setVisibleCancelOrder(false)}
                centered
                footer={[
                    <Button className='mb-3 redButton' variant='outlined-light'
                        onClick={() => cancelOrder(selectOrder.number_order)}>
                        Да
                    </Button>,
                    <Button className='mb-3 redButton' variant='outlined-light' onClick={() => setVisibleCancelOrder(false)}>
                        Нет
                    </Button>
                ]}
            ></Modal>
        </div>
    );
}

export default AdminOrder;
