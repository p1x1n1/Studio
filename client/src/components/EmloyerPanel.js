import React, { useContext } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Admin from './AdminPanel';
import { useNavigate } from 'react-router-dom';
import { INVENTORY, ORDER } from '../utils/consts';
import { Context } from '../index';


const EmployerPanel = () => {
    const {user} = useContext(Context);
    const post = user.user.post;
    // console.log(post);
    const navigate = useNavigate();
    return (
        <div className='mb-3'>
            <Row>
                 { (post === 'Администратор') ?
                    <Admin/> 
                    : (post=== 'Флорист') ? <Col md={6} ><Button className='pupleButton mb-3' variant='outline-light' onClick={()=>navigate(INVENTORY)} >Инвентаризация</Button></Col> :<></> }
               <Col md={6}><Button className='greenButton mb-3' variant='outline-success' onClick={()=>navigate(ORDER) } >Текущие заказы</Button></Col>
            </Row>
        </div>
        
    );
};

export default EmployerPanel;