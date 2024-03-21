import React from 'react';
import {  Carousel, Col, Container, Image, Row, Tab,Tabs } from 'react-bootstrap';
import ExampleCarouselImage from '../base_img/carousel1.jpg';
import ExampleCarouselImage3 from '../base_img/car.jpg';
import ExampleCarouselImage2 from '../base_img/car2.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Boquet_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import '../css/Tabs.css';

const Shop = () => {
    const navigate = useNavigate()
    return (
        <>
            <Container >
                <Carousel >
                    <Carousel.Item >
                        <Image src={ExampleCarouselImage} className="d-block w-100 img-fluid" text="First slide" />
                        <Carousel.Caption>
                            <h1 class='h_carousel'>Твой букет всё скажет за тебя</h1>
                            <button class='button_carousel' onClick={() => navigate(Boquet_ROUTE)}> <div className='p_car'>Каталог</div> </button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={ExampleCarouselImage2} className="d-block w-100 " text="Second slide" />
                        <Carousel.Caption>
                            <h1>Second slide label</h1>
                            <button class='button_carousel'  onClick={() => navigate(REGISTRATION_ROUTE)}><h1 className='p_car'>Зарегистрироваться</h1></button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={ExampleCarouselImage3} className="d-block w-100 " text="Second slide" />
                        <Carousel.Caption>
                            <h1 class='h_carousel'>Зарегистрируйся и формируй свою персональную скидку</h1>
                            <button class='button_carousel'  onClick={() => navigate(REGISTRATION_ROUTE)}>Зарегистрироваться</button>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
               
            </Container>
        </>
    );
};

export default Shop;