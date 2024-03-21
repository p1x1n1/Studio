import { Accordion, Button, Col, Container, Image, Row } from "react-bootstrap";
import basket from '../base_img/basket_green.png';
import heart from '../base_img/heart.png';

const OneBoquetPage = () => {
    const boquet = {id_bouquet:1, name: 'Букет1',ready_made:true,price:1500,img:'https://cvetaevatomsk.ru/uploads/goods/2021-11/1636032945_img_5057.jpg'};
    return (
        <>
           <Container className="mt-4">
                <Row>
                    <Col md={6}>
                        <Row className = "">
                            <Image  width = {600} height = {600} src={boquet.img} />
                        </Row> 
                        <Row className="mt-3 mb-3 display-flex  ">
                                <Col md={4}>
                                   <> <Image  width = {200} height = {200} src={boquet.img} /></>
                                </Col>
                                <Col md={4}>
                                    <><Image  width = {200} height = {200} src={boquet.img} /></>
                                </Col>
                                <Col md={4}>
                                    <><Image  width = {200} height = {200} src={boquet.img} /></>
                                </Col>
                        </Row>
                    </Col>
                    <Col md={6}  >
                        <Row>
                            <h1  style={{color:'#3f1d61'}}>{boquet.name}</h1>
                            <h3  style={{color:'#3f1d61'}}>Арт.{boquet.id_bouquet}</h3>
                            <h1  style={{color:'#2F611D'}}>{boquet.price} р.</h1>
                        </Row>
                        <Row className="d-flex row">
                            <Col>
                                <Button id='basket' >
                                    <Image width={25} height={25} src={basket}/>
                                    Добавить в корзину 
                                    
                                </Button>
                            </Col>
                            <Col>
                                <Button id ='heart'>
                                <Image width={25} height={25} src={heart}/>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                        <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0" >
                                <Accordion.Header  >Описание</Accordion.Header>
                                <Accordion.Body >
                                Яркий стильный букет в бело-фиолетовой цветовой гамме, выполненный из самых свежих сезонных цветов с нашего цветочного производства. Состав, цветовая гамма и стиль букета детально продуманы нашими флористами.
                                С букетом мы отправим конвертик с открыткой с вашими тёплыми пожеланиями, а также инструкцией по уходу за букетом и специальной подкормкой для продления жизни цветов. 
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Состав</Accordion.Header>
                                <Accordion.Body>

                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Уход за цветами</Accordion.Header>
                                <Accordion.Body>

                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        </Row>
                    </Col>
                </Row>
           </Container>
        </>
    );
};

export default OneBoquetPage;