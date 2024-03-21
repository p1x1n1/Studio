import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import basket from '../base_img/basket.png';
import heart from '../base_img/heart.png';
import {useNavigate} from 'react-router-dom';
import '../css/Item.css';
import { Boquet_ROUTE } from '../utils/consts';
//1.41
const BoquetItem = ({boquet}) => {
    const navigate = useNavigate();
    return (
         <>
        <Col md={4} 
             className='d-flex justify-content-between align-items-center mt-3'
             onClick={() => navigate(Boquet_ROUTE+'/'+boquet.id_bouquet)}>
                <Card style={{cursor: 'pointer'}} border={"dark"}>
                   <Image id='os_img'  src={boquet.img}/>
                    <div className='d-flex justify-content-between '>
                        <Image width={25} height={25} src={basket}/>
                        <Image width={25} height={25} src={heart}/>
                    </div>
                <div className='d-flex flex-column  align-items-center'>
                    <div>Название</div>
                    <div>Артикул</div>
                    <div>Цена</div>
                </div>
             </Card>
        </Col>
    </>
    );
};

export default BoquetItem;