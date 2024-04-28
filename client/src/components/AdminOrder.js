import React, { useEffect, useState } from 'react';
import { Accordion, Button, Stack } from 'react-bootstrap';
import { ApiService } from '../http/api.service';
import BoquetItemOrder from './BouquetItemOrder';
import { Modal, Table } from 'antd';
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
const apiService = new ApiService ();
const AdminOrder = () => {
    const [orders,setOrders] = useState([])
    const [composition, setComposition] = useState([]);

    const [selectOrder,setSelectOrder] = useState('');
    const [visibleFloristSelect, setVisibleFloristSelect] = useState(false);
    //const [visibleCourierSelect, setVisibleCourierSelect] = useState(false);
    //const [visibleStatusChange, setVisibleStatusChange] = useState(false);
    const [florists, setFlorists] = useState([]);
    //const [couriers, setCouriers] = useState([]);
    const [selectFlorist, setFlorist] = useState('');
    const [VisibleConfirmFlorist, setVisibleConfirmFlorist] = useState(false);
    //const [selectCourier, setCourier] = useState('')

    function fetchDataOrder(){
        apiService.get('/order/admin')
        .then( (response) => {
            console.log(response,'response');
            const updatedOrders = response.map((order)=>
            {
                apiService.get('/ordercomposition/'+order.number_order).then((res) => {
                    setComposition(res);
                    //console.log(res,'composition');
                }).catch((err) => {
                    console.log(err,'error');
                });
                return {
					...order,
					composition: composition
				};
			});
			setOrders(updatedOrders);
            //console.log(updatedOrders,'updatedOrders');
        }) 
    }
    function fetchDataFlorist(){
        apiService.get('/employee/florist')
        .then( (response) => 
           { setFlorists(response);
            console.log(florists,'florists');}
        )
    }
    useEffect(() => {
		fetchDataOrder();
		fetchDataFlorist();
	}, [])
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
    return(
        <>
         {orders.map((order)=>
           <>
                <Accordion>
                    <Accordion.Item onClick={() => setSelectOrder(order.number_order)}>
                        <Accordion.Header>
                            <div className='d-flex justify-content-between'>
                                <h5>Номер заказа: {order.number_order} </h5>
                                {/* <p style={{color: 'green'}}>Статус: В сборке</p> */}
                            </div>
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
                                <Button type='submit' className='pupleButton ' variant='outlined-light'  
                                    > Сменить статус заказа на 'Принят'</Button>
                                <Button type='submit' className='greenButton' variant='outlined-light'  onClick={()=>{  setVisibleFloristSelect(true);}}
                                    > Назначить Флориста</Button>
                                <Button type='submit' className='greenButton' variant='outlined-light'  //onClick={setVisibleCourierSelect(true)}
                                    > Назначить Курьера</Button>
                            </Stack>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            <Modal
    		title= {'Назначить флориста для заказа номер: ' + selectOrder}
    		open={visibleFloristSelect}
    		cancelText='Отмена'
    		onCancel={() => closeFloristSelect()}
    		centered
            width={1200}
    		footer={[
                // <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => saveFloristSelect()} disabled={!FlowerRecord.title}>
                //                     Сохранить
                // </Button>,
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
                title= {'Подтвердить назначения флориста ' + selectFlorist + ' на заказ ' + selectOrder + '?'}
                open={VisibleConfirmFlorist}
    		    okText='Сохранить'
    		    cancelText='Отмена'
    		    onCancel={() => closeFloristSelect()}
    		    centered
                footer={[
                    <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => saveFloristSelect(selectOrder)}>
                                        Сохранить
                    </Button>,
                    <Button className='mb-3 greenButton' variant='outlined-light' onClick={() => closeFloristSelect()}
                    >Отмена</Button>
                ]
                }></Modal>
           </>
        )}
        </>
    );
}
 
export default AdminOrder;