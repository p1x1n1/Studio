import { Accordion, Button, Col, Container, Image, Row } from "react-bootstrap";
import basket from '../base_img/icons/pink_basket.png';
import heart from '../base_img/icons/pink_heart_.png';
import { ApiService } from "../http/api.service";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from '../index';
import { message } from "antd";

const apiService = new ApiService();
const OneBouquetPage = () => {
    let {arc} = useParams();
    const {user} = useContext(Context)
    const login = user.user.login;
    console.log('arc',arc);
    const [bouquet,setBouquet] = useState([]);
    const [composition,setComposition] = useState([{}])
    function fetchDataBouquet() {
		apiService.get('/bouquet/'+arc).then(res => {
            setBouquet(res);
            apiService.get('/bouquetcomposition/'+res.arc).then(res => {
                setComposition(res);
                console.log('composition',composition);
            })
        }).catch(
            err => {
                alert("Букет не найден");
            }
        )
        console.log('bouquet',bouquet);
	}
    useEffect(() => {
        console.log('bouquet',bouquet);
        fetchDataBouquet();
	}, [arc])
    function addBasket(arc) {
        let cnt = 1;
		apiService.post('/basket',{login,arc,cnt}).then(() => {
            alert('Добавлено в корзину');
		})
        .catch(err => {
            alert(err.message);
        })
	}
    function addSelected(arc) {
		apiService.post('/selected',{login,arc}).then(() => {
            alert('Добавлено в избранное');
		}).catch(err => {
            alert(err.message);
        })
	}
    //const bouquet = {arc:1, name: 'Букет1',ready_made:true,price:1500,img:'https://cvetaevatomsk.ru/uploads/goods/2021-11/1636032945_img_5057.jpg'};
    return (
        <>
           {(arc) ?
           <Container className="mt-4">
                <Row>
                    <Col md={6}>
                        <Row className = "">
                            <Image  width = {600} height = {600} src={process.env.REACT_APP_API_URL + bouquet.img} />
                        </Row> 
                        {/* <Row className="mt-3 mb-3 display-flex  ">
                                <Col md={4}>
                                   <> <Image  width = {200} height = {200} src={bouquet.img} /></>
                                </Col>
                                <Col md={4}>
                                    <><Image  width = {200} height = {200} src={bouquet.img} /></>
                                </Col>
                                <Col md={4}>
                                    <><Image  width = {200} height = {200} src={bouquet.img} /></>
                                </Col>
                        </Row> */}
                    </Col>
                    <Col md={6}  >
                        <Row>
                            <h1  style={{color:'#3f1d61'}}>{bouquet.title}</h1>
                            <h3  style={{color:'#3f1d61'}}>Арт.{bouquet.arc}</h3>
                            <h1  style={{color:'#2F611D'}}>{bouquet.price} р.</h1>
                        </Row>
                        { (user.user.post === 'user') ?
                        <Row className="d-flex row">
                            <Col>
                                <Button id='basket' onClick={()=>{addBasket(bouquet.arc)}}>
                                    <Image width={50} height={50} src={basket}/>
                                    
                                </Button>
                            </Col>
                            <Col>
                                <Button id ='heart' onClick={()=>{addSelected(bouquet.arc)}}>
                                <Image width={50} height={50} src={heart}/>
                                </Button>
                            </Col>
                        </Row>
                        :<></>
                        }
                        <Row>
                        <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0" >
                                <Accordion.Header  >Описание</Accordion.Header>
                                <Accordion.Body >
                                    {bouquet.description}
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Состав</Accordion.Header>
                                <Accordion.Body>
                                 <ul>
                                    {composition.map((item,index) => {
                                        return <li key={index}>{item.flower_name}</li>
                                    })}
                                 </ul>
                                </Accordion.Body>
                            </Accordion.Item>

                            {/* <Accordion.Item eventKey="2">
                                <Accordion.Header>Уход за цветами</Accordion.Header>
                                <Accordion.Body>

                                </Accordion.Body>
                            </Accordion.Item> */}
                        </Accordion>
                        </Row>
                    </Col>
                </Row>
           </Container>
           :
           <>
           <h1>Букет не найден</h1>
           <h3>Попробуйте изменить запрос</h3>
           </>}
        </>
    );
};

export default OneBouquetPage;