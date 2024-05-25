import React, { useEffect, useState } from 'react';
import {  Carousel, Image, Tab,Tabs } from 'react-bootstrap';
import ExampleCarouselImage from '../base_img/car1.jpg';
import ExampleCarouselImage2 from '../base_img/car2.jpg';
import ExampleCarouselImage3 from '../base_img/car3.jpg';
import { useNavigate } from 'react-router-dom';
import { Boquet_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import '../css/Tabs.css';
import { ApiService } from '../http/api.service';
import TABS from '../components/Tabs';
import CategoryTab from '../components/CategoryTabs';


const apiService = new ApiService()
const Shop = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        apiService.get('/category').then(res => {
            setCategories(res);
            console.log(res);
        })}, [])
    
    return (
        <>
            <div className='d-flex flex-column justify-content-center'>
                <Carousel style={{width:'100%'}} >
                    <Carousel.Item >
                        <Image src={ExampleCarouselImage} className="d-block w-100 img-fluid" text="First slide" />
                        <Carousel.Caption>
                            <h1 className='h_carousel'>Твой букет всё скажет за тебя</h1>
                            <button className='button_carousel' id='catalogButton' onClick={() => navigate(Boquet_ROUTE)}> Каталог </button>
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
            <div className='d-flex justify-content-center'>
                {categories.map(сategory =>
                    <CategoryTab category={сategory}></CategoryTab>
                )}
            </div>
            <TABS></TABS>
        </>
    );
};

export default Shop;