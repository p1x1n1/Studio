import React from 'react';
import {  Carousel, Image, Tab,Tabs } from 'react-bootstrap';
import ExampleCarouselImage from '../base_img/car1.jpg';
import ExampleCarouselImage2 from '../base_img/car2.jpg';
import ExampleCarouselImage3 from '../base_img/car3.jpg';
import { useNavigate } from 'react-router-dom';
import { Boquet_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import '../css/Tabs.css';


const Shop = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='d-flex flex-column justify-content-center'>
                <Carousel style={{width:'100%'}} >
                    <Carousel.Item >
                        <Image src={ExampleCarouselImage} className="d-block w-100 img-fluid" text="First slide" />
                        <Carousel.Caption>
                            <h1 className='h_carousel'>Твой букет всё скажет за тебя</h1>
                            <button className='button_carousel' onClick={() => navigate(Boquet_ROUTE)}> <div className='p_car'>Каталог</div> </button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={ExampleCarouselImage2} className="d-block w-100 " text="Second slide" />
                        <Carousel.Caption>
                            <h1 className='h_carousel'>Зарегистрируйся и формируй свою персональную скидку</h1>
                            <button className='button_carousel'  onClick={() => navigate(REGISTRATION_ROUTE)}>Зарегистрироваться</button>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </>
    );
};

export default Shop;