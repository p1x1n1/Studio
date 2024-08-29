import React, { useEffect, useState } from 'react';
import { Button, Form, Image} from 'react-bootstrap';
import basket from '../base_img/icons/pink_basket.png';
import img_input from "../base_img/icons/pink_image.png";
import { Col, InputNumber, Modal, Row, Select, message } from 'antd';
import { ApiService } from '../http/api.service'
import Reg from '../page/Reg';
import Auth from '../page/Log';

const FormBoquet = (props) => {
    const login = props.login
    const stoimost_rabot = props.stoimost
    const flowers = props.flowers
    const wrappers = props.wrappers
    const apiService = new ApiService()
    
    // const [numFlowers, setNumFlowers] = useState(1);
    const [selectedFlowers, setSelectedFlowers] = useState([]); // Создаем массив для хранения выбранных цветов
    const filteredFlowers = flowers.filter(fw => !selectedFlowers.some(composition => composition.flowerIdRecord === fw.id_record));
    
    const [img,setImg]=useState(null)
    const [moduleVisible,setModuleVisible] = useState(false);
    const [isLog,SetIsLog] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const [bouquet,setBouquet] = useState({
        title: 'Индивидуальный букет',
        description: '',
        price: '',
        img: img_input,
        wrapperIdRecord: '',
        flowers: [],
    });   

    let totalPrice = 0;

    
    useEffect(() => {
        props.addBouquet(bouquet, props.position);
    }, [bouquet]);
    
    const addFlower = () => {
        const newCompositionRecord = [...selectedFlowers, { flowerIdRecord: null, cnt: 1 }];
        setSelectedFlowers(newCompositionRecord);
    };

    const getMaxQuantity = (fw) => {//Определение максимального значение для ползунка количества
        // console.log(flowers)
        // console.log('flowerID',fw.flowerIdRecord);
        const flower = flowers.find((f) => f.id_record == fw.flowerIdRecord);
        // console.log('getMaxQuantityflower', flower);
        return flower ? flower.cnt : 1;
    };
    const calculateTotalPrice = () => {
        let total = 0;
        selectedFlowers.forEach((selectedFlower) => {
            const flower = flowers.find((f) => f.id_record == selectedFlower.flowerIdRecord);//важно чтобы было 2 равно
            if (flower) {
                total += flower.price * selectedFlower.cnt;
            }
        });
        totalPrice = total * stoimost_rabot;
        return totalPrice;
    };
   
    const saveToBouquet = () => {
        const formData = new FormData();
        formData.append('title', bouquet.title);
        formData.append('img', img);
        formData.append('price', calculateTotalPrice());
        formData.append('description', bouquet.description);
        formData.append('ready_made', false);
        formData.append('wrapperIdRecord', bouquet.wrapperIdRecord);

        apiService.postformData('/bouquet', formData).then((res) => {
            const arc = res.arc;
            selectedFlowers.forEach(record => {
                apiService.post(`/bouquetcomposition/${arc}`, record);
            });
            const cnt = 1;
            apiService.post('/basket', { login, arc, cnt }).then(() => {
                messageApi.open({
                    type: 'success',
                    content: 'Добавлено в корзину',
                    duration: 5,
                });
            }).catch(err => {
                console.log(err.message);
            });
            setBouquet({
                title: 'Индивидуальный букет',
                description: '',
                price: '',
                img: img_input,
                wrapperIdRecord: '',
                flowers: [],
            });
            setSelectedFlowers([]);
        }).catch(err => {
            console.log(err.message);
        });
    };

    const handleFlowerChange = (value, index) => {
        const updatedRecords = selectedFlowers.map((item, i) =>
            i === index ? { ...item, flowerIdRecord: value } : item
        );
        setSelectedFlowers(updatedRecords);
        setBouquet(prevState => ({
            ...prevState,
            flowers: updatedRecords
        }));
    };

    const handleQuantityChange = (value, index) => {
        const updatedRecords = selectedFlowers.map((item, i) =>
            i === index ? { ...item, cnt: value } : item
        );
        setSelectedFlowers(updatedRecords);
        setBouquet(prevState => ({
            ...prevState,
            flowers: updatedRecords
        }));
    };

    const removeFlower = (index) => {
        const updatedRecords = selectedFlowers.filter((_, i) => i !== index);
        setSelectedFlowers(updatedRecords);
        setBouquet(prevState => ({
            ...prevState,
            flowers: updatedRecords
        }));
    };
    
    return (
        <div className='form'>
            {contextHolder}
            <Form>
                <Row>
                    <Col md={16}>
                        <Form.Group className="mb-3">
                            <Form.Label className='form_text' style={{ fontSize: 24 }}>Состав:</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            {selectedFlowers.map((composition, index) => (
                                <Row>
                                    <Col span={15}>
                                        <Select
                                            style={{ width: '90%' }}
                                            onChange={v => handleFlowerChange(v, index)}
                                            value={composition.flower_name}
                                        >
                                            {filteredFlowers.map(fw => (
                                                <Select.Option key={fw.id_record} value={fw.id_record}>
                                                    {fw.title}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col span={5}>
                                        <InputNumber
                                            min={1}
                                            max={getMaxQuantity(selectedFlowers[index])}
                                            defaultValue={1}
                                            onChange={v => handleQuantityChange(v, index)}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <Button
                                            className='banner_button'
                                            style={{ width: '80%' }}
                                            variant="light"
                                            onClick={() => removeFlower(index)}
                                        >Удалить</Button>
                                    </Col>
                                </Row>
                            ))}
                            <Button onClick={addFlower} variant="light" className="banner_button">Добавить цветок</Button>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='form_text' style={{ fontSize: 24 }}>Упаковка:</Form.Label>
                            <Select
                                className='form_text'
                                style={{ width: '90%' }}
                                onChange={v => setBouquet(prevState => ({ ...prevState, wrapperIdRecord: v }))}
                            >
                                {wrappers.map(wrapper => (
                                    <Select.Option key={wrapper.id_record} value={wrapper.id_record}>
                                        {wrapper.title}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Group>
                    </Col>
                    <Col md={8}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Изображение с примером букета</Form.Label>
                            <Form.Control type="file" onChange={v => setImg(v.target.files[0])} />
                        </Form.Group>
                        {(selectedFlowers.length > 0 || bouquet.wrapperIdRecord) ? (
                            <div className='d-flex justify-content-between flex-wrap'>
                                {selectedFlowers.map((selectedFlower, index) => {
                                    const flower = flowers.find(f => f.id_record === selectedFlower.flowerIdRecord);
                                    return flower && (
                                        <div key={index} style={{ marginBottom: '10px' }}>
                                            <Image src={process.env.REACT_APP_API_URL + flower.img} height={50} width={50} roundedCircle />
                                            <p>{flower.title}</p>
                                        </div>
                                    );
                                })}
                                {bouquet.wrapperIdRecord && (
                                    wrappers.map(wrapper => (
                                        wrapper.id_record === bouquet.wrapperIdRecord && (
                                            <div key={wrapper.id_record} style={{ marginBottom: '10px' }}>
                                                <Image src={process.env.REACT_APP_API_URL + wrapper.img} height={50} width={50} roundedCircle />
                                                <p>{wrapper.title}</p>
                                            </div>
                                        )
                                    ))
                                )}
                            </div>
                        ) : (
                            <Image src={img_input} height={200} />
                        )}
                    </Col>
                </Row>
                <h3>Итог: {calculateTotalPrice()} рублей</h3>
                <div className='form_line'></div>
                <Button
                    id='basket'
                    disabled={!(selectedFlowers.length > 0 && bouquet.wrapperIdRecord)}
                    onClick={() => (login === undefined) ? setModuleVisible(true) : saveToBouquet()}
                >
                    <Image width={50} height={50} src={basket} />
                    <b style={{ color: 'blueviolet', marginLeft: 6 }}>Добавить в корзину</b>
                </Button>
            </Form>
                    <Modal
				title={'Для продолжения необходимо войти в учетную запись. Хотите зарегистрироваться?'}
				open={moduleVisible}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={() => setModuleVisible(false)}
				centered
				footer={[
                    <Button
                        className='pupleButton'
                        onClick={() => setModuleVisible(false)}>Отмена
                    </Button>
				]
                }>
                    <>
                        <Button
                                className='pupleButton'
                                onClick={() => SetIsLog(true)}>
                                Войти
                        </Button>
                        <Button
                                className='pupleButton'
                                onClick={() => SetIsLog(false)}>
                                    Зарегистрироваться
                        </Button>
                        {(isLog) ? <Auth></Auth>:<Reg/> }
                    </>
                </Modal>
            </div>
    );
};

export default FormBoquet;