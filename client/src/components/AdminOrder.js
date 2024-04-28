import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Stack } from 'react-bootstrap';
import { ApiService } from '../http/api.service';
import BoquetItemOrder from './BouquetItemOrder';
import { Modal, Segmented, Table, message } from 'antd';
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
]
const options = [
    {
        label: 'В обработке',
        value: 1
        //value: {statusNow: 1, statusNext: 2, nameNext: 'Принят'}//добавить отмёнен как-то
    },
    {
        label: 'Готовы к доставке',
        value: 5
        //value: {statusNow: 5, statusNext: 6,nameNext: 'Передан в доставку'}
    },
    {
        label: 'Завершены',
        value: 6
    },
    {
        label: 'Все',
        value: 0
    },
]

const apiService = new ApiService ();

const AdminOrder = () => {
    
    const {user} = useContext(Context)
    const [orders,setOrders] = useState([])
    const [composition, setComposition] = useState([]);

    const [selectOrder,setSelectOrder] = useState({});

    let status = 1 , next_status;

    const [visibleStatusChange, setVisibleStatusChange] = useState(false);

    const [visibleFloristSelect, setVisibleFloristSelect] = useState(false);
    const [visibleCourierSelect, setVisibleCourierSelect] = useState(false);
    
    const [florists, setFlorists] = useState([]);
    const [selectFlorist, setFlorist] = useState('');
    const [VisibleConfirmFlorist, setVisibleConfirmFlorist] = useState(false);
    const [couriers, setCouriers] = useState([]);
    const [selectCourier, setCourier] = useState('')
    const [VisibleConfirmCourier, setVisibleConfirmCourier] = useState(false);

    function fetchDataOrder(){
        apiService.get('/order/admin/'+status)
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
    function fetchDataFlorist(){
        apiService.get('/employee/florist')
        .then( (response) => 
           { setFlorists(response);
            //console.log(florists,'florists');
        })
    }
    function fetchDataCourier(){
        apiService.get('/employee/courier')
        .then( (response) => 
           { setCouriers(response);
            console.log(couriers,'couriers');}
        )
    }
    useEffect(() => {
		fetchDataOrder();
		fetchDataFlorist();
        fetchDataCourier();
	}, [])

    const [messageApi, contextHolder] = message.useMessage();

    const success = (number_order) => {
        messageApi.open({
        type: 'success',
        content: 'Статус заказа '+number_order+' изменён на ' + ((selectOrder.status === 1)?"Принят":"Передан в доставку"),
        duration: 5,
        });
    };

    function saveStatus(number_order,next_status){//добавить отменён
        apiService.post('/order',{
            number_order: number_order,
            statusOrderIdRecord: next_status,
            employeeLogin: user.user.login,
        }).then(() =>
            success(number_order)
        )
        fetchDataOrder();
        setVisibleStatusChange(false);
    }

    function closeFloristSelect() {
		setFlorist({})
        setVisibleConfirmFlorist(false)
		setVisibleFloristSelect(false)
	}
    function saveFloristSelect(number_order){
        apiService.post('/order',{
            number_order: number_order,
            floristLogin: selectFlorist,
        })
        fetchDataOrder();//можно убрать чтобы меньше нагрузки было
        closeFloristSelect();
    }
    function closeCourierSelect() {
		setCourier({})
        setVisibleConfirmCourier(false)
		setVisibleCourierSelect(false)
	}
    function saveCourierSelect(number_order){
        apiService.post('/order',{
            number_order: number_order,
            courierLogin: selectCourier,
        })
        fetchDataOrder();//можно убрать чтобы меньше нагрузки было
        closeCourierSelect();
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
                        <Accordion.Item onClick={() => setSelectOrder({number_order: order.number_order,floristLogin:order.floristLogin,courierLogin:order.courierLogin, status: order.statusOrderIdRecord})}>
                            <Accordion.Header>
                                <Stack direction='horizontal' gap={3} >
                                    <h5>Номер заказа: {order.number_order} </h5>
                                    <h5 style={{color: 'green'}} className="p-2 ms-auto">Статус: {order.status_order_title}</h5>
                                </Stack>
                            </Accordion.Header>
                            <Accordion.Body>
                                <h5>Информация о покупателе:</h5>
                                    <p>Логин: {order.userLogin} </p>
                                    <p>Почта: {order.email} Телефон: {order.phone}</p>
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
                                <h5>Состав заказа:</h5>
                                    {composition.map(bouquet =>
                                        <BoquetItemOrder key={bouquet.arc} bouquet={bouquet}/>
                                    )}
                                    <p>Комментарий к заказу: {order.comment}</p>
                                    <p>Итоговая стоимость заказа: {order.price}</p>
                                <h5>Нзначенные сотрудники:</h5>
                                    <p>Флорист: {order.floristLogin}</p>
                                    <p>Курьер: {order.courierLogin}</p>
                                <Stack direction='horizontal' gap={3} className='mt-3 mb-2'>
                                    {(order.statusOrderIdRecord == 1) ?
                                    <>
                                        <Button type='submit' className='pupleButton ' variant='outline-light' onClick={()=>{  setVisibleStatusChange(true);}}
                                        >  Сменить статус заказа на 'Принят'
                                        </Button>
                                        <Button type='submit' className='greenButton' variant='outline-success'  onClick={()=>{  setVisibleFloristSelect(true);}}
                                            > Назначить Флориста</Button>
                                        <Button type='submit' className='greenButton' variant='outline-success'  onClick={()=>setVisibleCourierSelect(true)}
                                            > Назначить Курьера</Button>
                                    </>
                                    :( (order.statusOrderIdRecord  == 5) ?
                                        <>
                                        <Button type='submit' className='pupleButton ' variant='outline-light' onClick={()=>{  setVisibleStatusChange(true);}}
                                        >  Сменить статус заказа на 'Передан в доставку'
                                        </Button>
                                        </>
                                        :
                                    <></>  )                                      
                                    }
                                </Stack>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                <Modal
                title= {'Назначить флориста для заказа номер: ' + selectOrder.number_order}
                open={visibleFloristSelect}
                cancelText='Отмена'
                onCancel={() => closeFloristSelect()}
                centered
                width={1200}
                footer={[
                    <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => closeFloristSelect()}
                    >Отмена</Button>
                ]
                }
                >
                    <Table
                        dataSource={florists}
                        columns={employee_columns}
                        onRow={rec => {//поведение для строчки
                            return {
                                onClick: () =>{ 
                                    setFlorist(rec.login);
                                    setVisibleConfirmFlorist(true);
                                }
                            }
                        }}
                    >
                    </Table>
                </Modal>
                <Modal
                    title= {'Подтвердить назначения флориста ' + selectFlorist + ' на заказ ' + selectOrder.number_order + '?'}
                    open={VisibleConfirmFlorist}
                    okText='Сохранить'
                    cancelText='Отмена'
                    onCancel={() => closeFloristSelect()}
                    centered
                    footer={[
                        <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => saveFloristSelect(selectOrder.number_order)}>
                                            Сохранить
                        </Button>,
                        <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => closeFloristSelect()}
                        >Отмена</Button>
                    ]
                    }></Modal>
                <Modal
                title= {'Назначить курьера для заказа номер: ' + selectOrder.number_order}
                open={visibleCourierSelect}
                cancelText='Отмена'
                onCancel={() => closeCourierSelect()}
                centered
                width={1200}
                footer={[
                    <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => closeCourierSelect()}
                    >Отмена</Button>
                ]
                }
                >
                    <Table
                        dataSource={couriers}
                        columns={employee_columns}
                        onRow={rec => {//поведение для строчки
                            return {
                                onClick: () =>{ 
                                    setCourier(rec.login);
                                    setVisibleConfirmCourier(true);
                                }
                            }
                        }}
                    >
                    </Table>
                </Modal>
                <Modal
                    title= {'Подтвердить назначения курьера ' + selectCourier + ' на заказ ' + selectOrder.number_order + '?'}
                    open={VisibleConfirmCourier}
                    okText='Сохранить'
                    cancelText='Отмена'
                    onCancel={() => closeCourierSelect()}
                    centered
                    footer={[
                        <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => saveCourierSelect(selectOrder.number_order)}>
                                            Сохранить
                        </Button>,
                        <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => closeCourierSelect()}
                        >Отмена</Button>
                    ]
                    }></Modal>
                <Modal
                    title= {'Подтвердить смену статуса заказа '  + selectOrder.number_order + ' на '+((selectOrder.status === 1)?'"Принят"':'"Передан в доставку"')+'?'}
                    open={visibleStatusChange}
                    okText='Да'
                    cancelText='Нет'
                    onCancel={() => setVisibleStatusChange(false)}
                    centered
                    footer={[
                        <Button className='mb-3 greenButton' variant='outlined-light' 
                        onClick={() => {
                            (selectOrder.status === 1) ? next_status = 2 : next_status = 6; 
                            saveStatus(selectOrder.number_order,next_status);
                        }} 
                        disabled={!selectOrder.floristLogin && !selectOrder.courierLogin}>
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
 
export default AdminOrder;