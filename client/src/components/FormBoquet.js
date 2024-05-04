import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Image} from 'react-bootstrap';
import basket from '../base_img/icons/pink_basket.png';
import img_input from "../base_img/icons/pink_image.png";
import { Col, InputNumber, Row, Select } from 'antd';
import { ApiService } from '../http/api.service'

const FormBoquet = (props) => {
    const login = props.login
    const stoimost_rabot = props.stoimost
    const flowers = props.flowers
    const wrappers = props.wrappers
    const apiService = new ApiService()
    // const [numFlowers, setNumFlowers] = useState(1);
    const [selectedFlowers, setSelectedFlowers] = useState([]); // Создаем массив для хранения выбранных цветов
    const filteredFlowers = flowers.filter(fw => !selectedFlowers.some(composition => composition.flowerIdRecord === fw.id_record));
    const addFlower = () => {
		const newCompositionRecord = [...selectedFlowers];
		newCompositionRecord.push({ flowerIdRecord: null, cnt: 1 });
		setSelectedFlowers(newCompositionRecord);
	  };

    let totalPrice = 0;
    
    const [bouquet,setBouquet] = useState({
        title: 'Индивидуальный букет',
        description: '',
        price: '',
        img: img_input,
        wrapperIdRecord: '',
        flowers: [{}],
    }) 
    
    useEffect(()=>{
        props.addBouquet(bouquet,props.position)
    },[bouquet])
    

    const getMaxQuantity = (fw) => {//Определение максимального значение для ползунка количества
        // console.log(flowers)
        console.log('flowerID',fw.flowerIdRecord);
        const flower = flowers.find((f) => f.id_record == fw.flowerIdRecord);
        console.log('getMaxQuantityflower', flower);
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

    function saveToBouquet() {
		console.log('saveItemBouquetandComposition');
		let arc;
		apiService.post('/bouquet', {title:bouquet.title,img:bouquet.img,description:bouquet.description,price: totalPrice,wrapperIdRecord:bouquet.wrapperIdRecord,ready_made:false}).then((res) => {
	        console.log('res',res);
			arc = res.arc
			// eslint-disable-next-line no-lone-blocks
			{bouquet.flowers.map(record =>
				apiService.post('/bouquetcomposition/'+arc, record)
			)}
            let cnt = 1;
            apiService.post('/basket',{login,arc,cnt}).then(() => {
                alert('Добавлено в корзину');
            })
            .catch(err => {
                alert(err.message);
            })
		})
        setBouquet({})
	}
    
    return (
        <div className='form'>
            {console.log('key',props)}
                    <Form >
                        <Row>
                            <Col md = {16} >
                                <Form.Group className="mb-3"><Form.Label className='form_text' style={{fontSize: 24}}>Состав:</Form.Label></Form.Group>    
                                <Form.Group className="mb-3">
                                {selectedFlowers.map((composition, index) => (
                                    <Row>
                                        <Col span={15}>
                                            <Select 
                                                key={index}
                                                onChange={v => {
                                                        //учесть count и учесть flower одновремено тк flower pk потому стоит просто удалить предыдущий состав и заменить на новый
                                                        const updatedRecords = selectedFlowers.map((item, i) => 
                                                        i === index ? { ...item, flowerIdRecord: v } : item);
                                                        setSelectedFlowers(updatedRecords);
                                                        setBouquet((prevState => {
                                                            return { ...prevState,flowers: selectedFlowers}}))
                                                }}
                                                value={composition.flower_name}
                                            >
                                            {filteredFlowers.map(fw => (
                                                <Select.Option key={fw.id_record} value={fw.id_record}>
                                                    {fw.title}
                                                </Select.Option>
                                            ))}
                                            {console.log('filteredFlowers',filteredFlowers,flowers)}
                                            </Select>
                                        </Col>
                                    <Col span={6}>
                                        <InputNumber min={1} max={getMaxQuantity(selectedFlowers[index])}
                                         defaultValue={1} 
                                         onChange={v => {
                                                const updatedRecords = selectedFlowers.map((item, i) => 
                                                i === index ? { ...item, cnt: v } : item);
                                                setSelectedFlowers(updatedRecords);
                                                setBouquet((prevState => {
                                                    return { ...prevState,flowers: selectedFlowers}}))
                                            }} />
                                    </Col>
                                    <Col  span={3}>
                                        <Button onClick={() => {
                                            const updatedRecords = selectedFlowers.filter((item, i) => i !== index);
                                            setSelectedFlowers(updatedRecords);
                                            setBouquet((prevState => {
                                                return { ...prevState,flowers: selectedFlowers}}));
                                        }}>Удалить</Button>
                                    </Col>
                                    </Row>
                                    ))}
                                    <Button onClick={addFlower} variant="light" className="banner_button" >Добавить цветок</Button>
                                </Form.Group>
                              
                                {/* {[...Array(numFlowers)].map((_, index) => (
                                <Form.Group className="mb-3" key={index}>
                                    <Row>
                                        <Col md={8}>
                                            <Form.Select
                                                className='form_text'
                                                value={selectedFlowers[index]}
                                                onChange={(e) => {
                                                    const newSelectedFlowers = [...selectedFlowers];
                                                    newSelectedFlowers[index] = e.target.value;
                                                    console.log('newSelectedFlowers',newSelectedFlowers);
                                                    setSelectedFlowers(newSelectedFlowers);
                                                    setBouquet({bouquet,flowers: newSelectedFlowers})
                                            }}
                                            >
                                                <option selected disabled></option>
                                                {filteredFlowers.map((fw) => (
                                                    <option className='form_text' key={fw.id_record} data-foo="bar" value={fw.id_record} style={{backgroundImage: fw.img}} >
                                                        {fw.title}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Control 
                                                className='form_text' 
                                                type="number" min={1} max={getMaxQuantity(selectedFlowers[index])}
                                                onChange={(e) => handleQuantityChange(index, e.target.value)}/></Col>
                                                {console.log('selectedFlowers',selectedFlowers)}
                                    </Row>
                                </Form.Group>))} */}
                                {/* <Button variant="light" className="banner_button" onClick={handleAddSelect}>Добавить еще один цветок</Button> */}
                            <Form.Group>
                                <Form.Label className='form_text' style={{fontSize: 24}}>Упаковка:</Form.Label>
                                <Select className='form_text'
                                onChange={v => {
                                    setBouquet((prevState => {
                                        return { ...prevState,wrapperIdRecord: v}}))
                                }}
                                >
                                    {wrappers.map((wrapper) => (
                                        <Select.Option className='form_text' key={wrapper.id_record} value={wrapper.id_record}>
                                            {wrapper.title}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Group>
                            </Col>                            
                            <Col md = {8}>
                                <Form.Group className="mb-3" controlId="formImg">
                                    <Form.Label className='form_text' style={{fontSize:24}}>Пример букета</Form.Label>
                                    <Form.Control type="image" alt="" src={bouquet.img} />
                                </Form.Group>
                            </Col>        
                        </Row>
                        <p>Итог:{calculateTotalPrice()} рублей</p>
                        <div className='form_line'></div>
                        { (props.post === 'user') ?
                        <Button id='basket' onClick={() => saveToBouquet()} >
                                <Image width={50} height={50}  src={basket}/>
                                <b style={{color:'blueviolet',marginLeft: 6}}>Добавить в корзину</b>
                        </Button> : <></>}
                    </Form>
            </div>
    );
};

export default FormBoquet;