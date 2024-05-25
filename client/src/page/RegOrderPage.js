import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, NavLink, Row } from 'react-bootstrap';
import { DatePicker, Form, Input, Progress, Select, Switch, TimePicker } from 'antd';
import { ApiService } from '../http/api.service';
import { useNavigate} from 'react-router-dom';
import { Context } from '../index';
import BouquetBasketOrder from '../components/BouquetBasketOrder';
import moment from 'moment';//check
const { TextArea } = Input;


const apiService = new ApiService()
const RegOrderPage = () => {
    const { user } = useContext(Context);
    const [basket, setBasket] = useState([]);
    const [localities, setlocalities] = useState([]);
    const [streets, setstreets] = useState([]);
    const [deliveries, setdeliveries] = useState([]);
    const [disProcent,setDisProcent] = useState(0);
    const navigate = useNavigate();
    function fetchData() {
		apiService.get('/locality').then(res => {
            setlocalities(res);
        })
        console.log('localities',localities);

        apiService.get('/street').then(res => {
            setstreets(res);
        })
        apiService.get('/delivery').then(res => {
            setdeliveries(res);
        })
        apiService.get('/discount/'+user.user.discountIdRecord).then(res => {
            setDisProcent(res.procent);
        })
        apiService.get('/basket/'+user.user.login).then(res => {
            setBasket(res);
        })
	}
    useEffect(() => {
        fetchData();
        console.log('basket',basket);
	}, [])
    // const localities = [{ id_record: 1, title: "Самара" }, { id_record: 2, title: "Жигулевск" }, { id_record: 3, title: "Кинель" }, { id_record: 4, title: "Новокуйбышевск" }];
    // const streets = [{ id_record: 1, title: "Академика Кузнецова" }, { id_record: 2, title: "Александра Матросова" }, { id_record: 3, title: "Александра Невского" }, { id_record: 4, title: "Алексея Росовского" }];
    // const deliveries = [{id_record:1, title: "Самовывозом", price:0}, {id_record:2, title: "Курьером", price:1}, {id_record:3, title: "Экспресс-доставка",price:500}]
    
    const [selectedDelivery,setSelectedDelivery] = useState('');//Создаем массив для хранения выбранного типа доставки
    const [isRecepient, setIsRecepient] = useState(false); // Состояние для отслеживания кто получатель
    const [RecepientPhone, setRecepientPhone] = useState(''); // Состояние для хранения номера телефона получателя
    const [Anonim, setAnonim] = useState(false); // Состояние для отслеживания нужна ли анонимная доставка
    const [NeedPostCard, setNeedPostCard] = useState(false);
    const [OrderSubmit, setOrderSubmit] = useState(false);
    let price;

    const [formData,setFormData] = useState({
        anonymized: false,
        localityIdRecord:0,
        streetIdRecord: 0,
        house_number: '',
        adress_comment: '',
        comment: '',
        deliveryIdRecord: 0,
        date_order: null,
        time_order: null,
        statusOrderIdRecord: 1,
        price: 0,
        userLogin: user.user.login,
    });
    const handleDeliveryChange = (id) => {
        console.log(id);
        const delivery = deliveries.find(delivery => delivery.id_record === id);
        setSelectedDelivery(delivery); // Обновляем выбранный тип доставки
        setFormData(prevState => { return { ...prevState, deliveryIdRecord: id }});
        console.log(formData);
    };
    const handleTimeChange = (time) => {
        const timeString = new Date(time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        setFormData({
          ...formData,
          time_order: timeString,
        });
      };
    const handleDateChange = (date) => {
        const dateString = new Date(date).toLocaleDateString();
        setFormData({
        ...formData,
        date_order: dateString
        });
    };
    
    function disabledDate(current) {
        // Дата не может быть раньше сегодняшнего дня и позже чем через 3 месяца
        return current && (current < moment().startOf('day') || current > moment().add(3, 'months').endOf('day'));
    }
    const disabledTime  = () => {
        return {
            disabledHours: () => [0,1,2,3,4,5,6,7,8,22,23],
        }
    }


    const calculatePriceWDiscounts= () => {
        let sum = 0;
        basket.forEach(bouquet => {
            sum += bouquet.price * bouquet.cnt;
            console.log(bouquet);
        });
        if (selectedDelivery.price) sum += parseFloat(selectedDelivery.price);
        sum = sum * ((100.00-disProcent)/100);
        console.log('sum-price',sum, price);
        return sum;
    }

    const SubmitOrder = () => {
        form.validateFields()
        .then (async () =>   {if(!isRecepient){
            console.log('Recepient')
            setFormData({
                ...formData,
                comment: "Номер телефона получателя:"+RecepientPhone+'\n'+formData.comment 
                });
        }
        let sum = 0;
        basket.forEach(bouquet => {
            sum += bouquet.price * bouquet.cnt;
            console.log(bouquet);
        });
        if (selectedDelivery.price) sum += parseFloat(selectedDelivery.price);
         
        setFormData({
            ...formData,
            price: (sum * ((100.00-disProcent)/100))
            // price: (priceBouquet + parseFloat(selectedDelivery.price))
            //price: (priceBouquet + parseFloat(selectedDelivery.price)).toString()//подумать ещё
        });
        console.log('formDara submit',formData);
        apiService.post('/order',formData).then((res) => {
            console.log(res,'success');
            basket.map(bouquet =>{
                apiService.post('/ordercomposition/create',{
                    bouquetArc: bouquet.arc,
                    orderNumberOrder: res.number_order,
                    postcard_comment: bouquet.postcard_comment,
                    postcard: bouquet.need_postcard,
                    cnt: bouquet.cnt
                }).then((res) => {
                    console.log(res,'success');
                }).catch((err) => {
                    console.log(err,'error');
                });
            });
            apiService.delete('/basket/'+user.user.login)
            .catch((err) => {
                console.log(err,'error');
            });
            setOrderSubmit(true);
        })
        .catch((err) => {
            console.log(err,'error');
        });
        console.log('formDara submit',formData);
        })
        .catch((err) => {
            alert('Неккоректные данные');

        });
    }

    const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const validateMessages = {
        required: 'Обязательное поле!',
        
    }
    const [form] = Form.useForm()

    return (
       <Container>
            <h1 className='form_text'>Оформление заказа</h1>
            { !OrderSubmit ?
            <Row>
                <Col md={8}>
                    <Form layout="vertical" className='form_text'
                    validateMessages={validateMessages}
                    form={form}
                    >
                        <Form.Item label='Адрес' >
                            {/* <h3>Адрес:</h3> */}
                            <Form.Item label='Населённый пункт' className='form_text' 
                            name='locality' id='locality'
                            rules={[
								{
									required: true,
								}
							]}>
                                <Select 
                                showSearch
                                placeholder="Самара"
                                optionFilterProp="children"
                                onChange={(value) => {setFormData(formData => { return { ...formData, localityIdRecord: value.value }}); console.log(formData)}}
                                
                                filterOption={filterOption}
                                options={localities.map(localities => ({ value: localities.id_record, label: localities.title }))}
                                labelInValue className='form_text'>
                                </Select>
                            </Form.Item>
                            <Form.Item label='Улица' className='form_text' name='street' id='street'
                            rules={[
								{
									required: true,
								}
							]}>
                                <Select 
                                showSearch
                                placeholder="Краснодонская"
                                optionFilterProp="children"
                                onChange={(value) => setFormData(formData => { return { ...formData, streetIdRecord: value.value }})}
                                
                                filterOption={filterOption}
                                options={streets.map(streets => ({ value: streets.id_record, label: streets.title }))}
                                labelInValue className='form_text'>
                                </Select>
                            </Form.Item>
                            <Form.Item label='Дом' className='form_text' name='house' id='house'
                            rules={[
								{
									required: true,
								}
							]}>
                                <Input placeholder="11a"  onChange={(value) => setFormData(formData => { return { ...formData, house_number: value.target.value}})}></Input>
                            </Form.Item>
                            <Form.Item className="mb-3" label='Комментарий к адресу'>                           
                                <TextArea showCount maxLength={100} 
                                onChange={(value) => setFormData(formData => { return { ...formData, adress_comment: value.target.value}})}
                                />
                            </Form.Item>
                        </Form.Item>                            
                        <Form.Item>
                            <Row>
                                <Col md={6}>
                                    <Form.Item label='Способ доставки:' name='delivery' id='delivery'
                                    rules={[
                                        {
                                            required: true,
                                        }
                                    ]}>
                                        <Select
                                        onChange={handleDeliveryChange}
                                        options={deliveries.map(localities => ({ value: localities.id_record, label: localities.title }))}
                                        >
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label='Дата доставки:'  name='date-picker' id='date-picker'
                                    rules={[
                                        {
                                            required: true,
                                        }
                                    ]}>
                                        <DatePicker
                                            format={{
                                                format: 'YYYY-MM-DD',
                                                type: 'mask',
                                            }}
                                            onChange={handleDateChange}
                                            disabledDate={disabledDate}
                                            picker="date"
                                            placeholder="Выберите дату"
                                            />
                                    </Form.Item>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label='Стоимость доставки:'>
                                    <Input disabled placeholder = {selectedDelivery? selectedDelivery.price+" руб.":''}/>
                                    </Form.Item>
                                    <Form.Item name="time-picker"  id='time-picker' 
                                    value={formData.time_order} label='Время доставки:'
                                    rules={[
                                        {
                                            required: true,
                                        }
                                    ]}>
                                        <TimePicker                                        
                                         format='HH:00' 
                                         onChange={handleTimeChange}
                                         defaultValue={moment('09:00', 'HH:mm')} 
                                         disabledTime={disabledTime}
                                        hideDisabledOptions 
                                         />
                                        {/* <Input type='time' 
                                        onChange={(value) => setFormData(formData => { return { ...formData, time_order: value.target.value}})}/> */}
                                    </Form.Item>
                                    <NavLink>Условия доставки</NavLink>
                                    
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item className="mb-3">
                            <Form.Item className='form_text' valuePropName="checked" style={{fontSize: 24}} label='Я получатель'>
                                <Switch
                                    id='switchRecepient'
                                    className='form_text'
                                    checked={isRecepient}
                                    onChange={() => {
                                        // setIsRecepient(e.target.checked);
                                        setIsRecepient(!isRecepient);
                                    }}
                                />
                            </Form.Item>
                            {!isRecepient ?
                            <>
                                <h3>Получатель</h3>
                                <Form.Item className='form_text' style={{fontSize: 24}} 
                                label='Номер телефона получателя:' name='phoneRecepient' id="phoneR"
                                rules={[
								{
									required: true,
								}
							    ]}>
                                <Input  
                                    className='form_text'
                                    type="phone"
                                    value={RecepientPhone}
                                    onChange={(e) => setRecepientPhone(e.target.value)}
                                />
                                </Form.Item>
                                <Form.Item label="Анонимная доставка" valuePropName="checked">
                                    <Switch className='form_text'
                                        checked={Anonim}
                                        onChange={() => {                                           
                                            setAnonim(!Anonim);
                                            setFormData(formData => { return { ...formData, anonymized: Anonim}});
                                        }}
                                        >
                                    </Switch>
                                </Form.Item>
                            </>
                            :<></>} 
                        </Form.Item>
                        <Form.Item className="mb-3" label='Дополнительная информация'>                           
                            <TextArea showCount maxLength={100} 
                            onChange={(value) => setFormData(formData => { return { ...formData, comment: value.target.value}})}
                              />
                        </Form.Item>
                    </Form>
                </Col>
                <Col md={4}>
                    <div className='frame'>
                        <h4>Ваш заказ:</h4>
                        {basket.map(bouquet =>  
                            <>
                            <BouquetBasketOrder key={bouquet.arc} bouquet={bouquet}/>
                            <Switch className=' mb-1' 
                                checkedChildren='открытка'
                                unCheckedChildren='без открытки'
                                style={{width:'50%',height:'200'}}
                                size='large'
                                onChange={(checked) => {                                                   
                                    setBasket(prevBasket => prevBasket.map(item => {
                                        if (item.arc === bouquet.arc) {
                                            return {
                                                ...item,
                                                need_postcard: checked,
                                                postcard_comment:'',
                                            };
                                        }
                                        return item;
                                    }));   
                                    console.log('basket',basket,checked);                  
                                }}
                            />
                            {bouquet.need_postcard ? 
                                <TextArea showCount maxLength={100} rows={4} className='mt-3 mb-3'
                                    onChange={(value) => {                                        
                                        setBasket(prevBasket => prevBasket.map(item => {
                                            if (item.arc === bouquet.arc) {
                                                return {
                                                    ...item,
                                                    postcard_comment: value.target.value
                                                };
                                            }
                                            return item;
                                        })) 
                                        console.log('basket',basket,value.target.value);
                                        }                                                                            
                                    }
                                /> : null}
                            </>
                        )}     
                         <div className='puple_border_box'>
                        <h1>Итого </h1>
                        <div>
                            <p>Сумма с персональной скидкой: {calculatePriceWDiscounts()}</p>
                        </div>
                        </div>         
                        <Button type='submit' id='basket' onClick={SubmitOrder}>
                            Оформить заказ
                         </Button>
                    </div>
                </Col>
            </Row>
            : 
            <div className='d-glex justify-content-center'>
                <h1>Заявка на заказ отправлена</h1>
                <Progress type="circle" percent={100} />
                <h3>Ваш заказ будет обработан в ближайшее время</h3>
            </div>
           }
       </Container>
    );
};

export default RegOrderPage;
