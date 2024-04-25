import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, NavLink, Row } from 'react-bootstrap';
import { DatePicker, Form, Input, Select, Switch, TimePicker } from 'antd';
import { ApiService } from '../http/api.service';
import { useNavigate} from 'react-router-dom';
import { Context } from '../index';
import BouquetBasketOrder from '../components/BouquetBasketOrder';
const { TextArea } = Input;


const apiService = new ApiService()
const RegOrderPage = () => {
    const { user } = useContext(Context);
    const [basket, setBasket] = useState([]);
    const [localities, setlocalities] = useState([]);
    const [streets, setstreets] = useState([]);
    const [deliveries, setdeliveries] = useState([]);
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
    const handleDeliveryChange = (id) => {
        console.log(id);
        const delivery = deliveries.find(delivery => delivery.id_record === id);
        setSelectedDelivery(delivery); // Обновляем выбранный тип доставки
        setFormData(prevState => { return { ...prevState, deliveryIdRecord: id }});
        console.log(formData);
    };

    const [isRecepient, setIsRecepient] = useState(false); // Состояние для отслеживания кто получатель
    const [RecepientPhone, setRecepientPhone] = useState(''); // Состояние для хранения номера телефона получателя
    const [Anonim, setAnonim] = useState(false); // Состояние для отслеживания нужна ли анонимная доставка
    const [NeedPostCard, setNeedPostCard] = useState(false);
    const [formData,setFormData] = useState({
        anonymized: false,
        localityIdRecord:0,
        streetIdRecord: 0,
        house_number: '',
        adress_comment: '',
        comment: '',
        deliveryIdRecord: 0,
        date_order: '',
        time_order: '',
        status: 0,
        price:0,

    });

    function onSubmit(){
        console.log(formData);
    }

    const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
       <Container>
            <h1 className='form_text'>Оформление заказа</h1>
            <Row>
                <Col md={8}>
                    <Form layout="vertical" className='form_text'>
                        <Form.Item label='Адрес' >
                            {/* <h3>Адрес:</h3> */}
                            <Form.Item label='Населённый пункт' className='form_text'>
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
                            <Form.Item label='Улица' className='form_text'>
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
                            <Form.Item label='Дом' className='form_text'>
                                <Input placeholder="11a"  onChange={(value) => setFormData(formData => { return { ...formData, house_number: value.target.value}})}></Input>
                            </Form.Item>
                        </Form.Item>                            
                        <Form.Item>
                            <Row>
                                <Col md={6}>
                                    <Form.Item label='Способ доставки:'>
                                        <Select
                                        onChange={handleDeliveryChange}
                                        options={deliveries.map(localities => ({ value: localities.id_record, label: localities.title }))}
                                        >
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label='Дата доставки:'>
                                        <DatePicker
                                            format={{
                                                format: 'YYYY-MM-DD',
                                                type: 'mask',
                                            }}
                                            
                                            />
                                    </Form.Item>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label='Стоимость доставки:'>
                                    <Input disabled placeholder = {selectedDelivery? selectedDelivery.price+" руб.":''}/>
                                    </Form.Item>
                                    <Form.Item name="time-picker" label='Время доставки:'>
                                        <TimePicker                                        
                                         format='HH:00' 
                                         onChange={(value) => setFormData(formData => { return { ...formData, date_order: value.target.value}})}
                                         />
                                        {/* <Input type='time'/> */}
                                    </Form.Item>
                                    <NavLink>Условия доставки</NavLink>
                                    
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item className="mb-3">
                            <Form.Item className='form_text' valuePropName="checked" style={{fontSize: 24}} label='Я получатель'>
                                <Switch
                                    className='form_text'
                                    checked={isRecepient}
                                    onChange={() => {
                                        // setIsRecepient(e.target.checked);
                                        setIsRecepient(!isRecepient);
                                    }}
                                />
                            </Form.Item>
                            {!isRecepient && (
                            <>
                                <h3>Получатель</h3>
                                <Form.Item className='form_text' style={{fontSize: 24}} label='Номер телефона получателя:'>
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
                            )} 
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
                        {basket.map(bouquet => {
                            console.log('bouquet',bouquet);
                            <>
                            <BouquetBasketOrder key={bouquet.arc} bouquet={bouquet}/>
                            <Switch className='form_text'
                                checked={NeedPostCard}
                                onChange={() => {                                           
                                    setNeedPostCard(!NeedPostCard);           
                                    setFormData(formData => { 
                                        return { 
                                            ...formData, 
                                            basket: formData.basket.map(item => {
                                                if (item.arc === bouquet.arc) {
                                                    return {
                                                        ...item,
                                                        need_postcard: NeedPostCard,
                                                        postcard_comment: item.postcard_comment || ''
                                                    };
                                                }
                                                return item;
                                            })
                                        }
                                    });                             
                                }}
                            />
                            {NeedPostCard ? 
                                <TextArea showCount maxLength={100} 
                                    onChange={(value) => setFormData(formData => { 
                                        return { 
                                            ...formData, 
                                            basket: formData.basket.map(item => {
                                                if (item.arc === bouquet.arc) {
                                                    return {
                                                        ...item,
                                                        postcard_comment: value.target.value
                                                    };
                                                }
                                                return item;
                                            })
                                        }
                                    })}
                                /> : null}
                        </>
                        })}         
                        {basket.map(bouquet => {
                            <BouquetBasketOrder key={bouquet.arc} bouquet={bouquet}/>
                        })}               
                        <Button id='basket' type='submit' onClick={onSubmit()}>
                            Оформить заказ
                         </Button>
                    </div>
                </Col>
            </Row>
       </Container>
    );
};

export default RegOrderPage;
