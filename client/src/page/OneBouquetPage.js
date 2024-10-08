import { Accordion, Button, Col, Container, Image, Row } from "react-bootstrap";
import basket from '../base_img/icons/pink_basket.png';
import heart from '../base_img/icons/pink_heart_.png';
import { ApiService } from "../http/api.service";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from '../index';
import { message } from "antd";
import UnFindInfo from "../components/UnFindInfo";

const apiService = new ApiService();
const OneBouquetPage = () => {
    let {arc} = useParams();
    const {user} = useContext(Context)
    const login = user.user.login;
    console.log('arc',arc);
    const [isFind,setIsFind] = useState(false);
    const [bouquet,setBouquet] = useState([]);
    const [composition,setComposition] = useState([{}])
    const [inBasket,setInBasket] = useState(false);
    const [inSelected,setInSelected] = useState(false);

    function fetchDataBouquet() {
		apiService.get('/bouquet/'+arc).then(res => {
            setBouquet(res);
            setIsFind(true);
            apiService.get('/bouquetcomposition/'+res.arc).then(res => {
                setComposition(res);
                console.log('composition',composition);
            })
            if(user.user.post === 'user'){
                apiService.get('/basket/'+login+'/'+res.arc).then((res) => {
                    setInBasket(true)                
                }).catch((err) => {})
                apiService.get('/selected/'+login+'/'+res.arc).then((res) => {
                    setInSelected(true)                
                }).catch((err) => {})
            }
        }).catch(
            err => {
                setIsFind(false);
            }
        )
        console.log('bouquet',bouquet);
	}
    useEffect(() => {
        console.log('bouquet',bouquet);
        fetchDataBouquet();
	}, [arc,setInBasket,setInSelected])
    function addBasket(arc) {
        let cnt = 1;
		apiService.post('/basket',{login,arc,cnt}).then(() => {
            messageApi.open({
                type: 'success',
                content: 'Добавлено в корзину',
                duration: 5,
                });
            setInBasket(true) 
		})
        .catch(err => {
            alert(err.message);
        })
	}
    function addSelected(arc) {
		apiService.post('/selected',{login,arc}).then(() => {
            messageApi.open({
                type: 'success',
                content: 'Добавлено в избранное',
                duration: 5,
                });
            setInSelected(true) 
		}).catch(err => {
            alert(err.message);
        })
	}
    function deleteSelected(arc) {
		apiService.delete('/selected/'+login+'/'+arc).then(() => {
            messageApi.open({
                type: 'error',
                content: 'Удаленно из избранного',
                duration: 5,
                });
             
            setInSelected(false) 
		})
	}
    function deleteBasket(arc){
        apiService.delete('/basket/'+login+'/'+arc).then(res => {
            messageApi.open({
                type: 'error',
                content: 'Удаленно из корзины',
                duration: 5,
                });
            setInBasket(false);
        })
    }
    const [messageApi, contextHolder] = message.useMessage();

    const [openItems, setOpenItems] = useState([]);

    const handleToggle = (eventKey) => {
        if (openItems.includes(eventKey)) {
            setOpenItems(openItems.filter(key => key !== eventKey));
        } else {
            setOpenItems([...openItems, eventKey]);
        }
    };
    return (
        <>
            {contextHolder}
           {(isFind) ?
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
                            <h3  style={{color:'#3f1d61'}}>Арт. {bouquet.arc}</h3>
                            <h1  style={{color:'#2F611D'}}>{bouquet.price} р.</h1>
                        </Row>
                        <Row>
                            <p style={{color:'#3f1d61'}}>
                                Для максимального повтора состава и цветовой гаммы,
                                 букет необходимо заказать за 7-10 дней. 
                                 В случае заказа позже, возможны замены цветочного состава
                            </p>
                            
                        </Row>
                        { (user.user.post === 'user') ?
                       <Row className="d-flex row">
                       {!inBasket ? 
                           <Col span={12}>
                               <Button id='basket' style={{width:'100%',height:'100%'}} variant='light' onClick={()=>{addBasket(bouquet.arc)}}>
                                   <Image width={50} height={50} src={basket} />
                               </Button>
                           </Col>:
                           <Col span={12}>
                               <Button id='basket' style={{width:'100%',height:'100%'}} variant='light' onClick={()=>{deleteBasket(bouquet.arc)}}>
                                   <p>В корзине</p>
                                   <Image width={50} height={50} src={basket} />
                               </Button>
                           </Col>
                       }
                       {!inSelected ?
                           <Col span={12}>
                               <Button id='heart' style={{width:'100%',height:'100%'}} variant='light' onClick={()=>{addSelected(bouquet.arc)}}> 
                                   <Image width={50} height={50} src={heart} />
                               </Button>
                           </Col>
                           :
                           <Col span={12}>
                               <Button id='heart' style={{width:'100%',height:'100%'}} variant='light' onClick={()=>{deleteSelected(bouquet.arc)}}> 
                                   <p>В избранном</p>
                                   <Image width={50} height={50} src={heart} />
                               </Button>
                           </Col>
                        }
                        </Row>
                        :<></>
                        }
                        <Row>
                        <Accordion className="mt-3" activeKey={openItems} onSelect={handleToggle}>
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
                                        return <li key={index}>
                                            <div>
                                                <Image src={process.env.REACT_APP_API_URL +item.img} height={50} width={50} roundedCircle />
                                                <p>{item.flower_name} : {item.cnt} шт. </p>
                                            </div>
                                            </li>
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
          <UnFindInfo page={'onebouquet'}></UnFindInfo>}
        </>
    );
};

export default OneBouquetPage;