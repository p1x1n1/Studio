import React, { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import Admin from './AdminPanel';
import { useNavigate } from 'react-router-dom';
import { ORDER } from '../utils/consts';
import { Context } from '../index';


const EmployerPanel = () => {
    const {user} = useContext(Context);
    const post = user.user.post;
    console.log(post);
    const navigate = useNavigate();
    return (
        <Container className='mb-3'>
             { (post=== 'Администратор') ?
                <Admin/> 
                : (post=== 'Флорист') ? <Button className='pupleButton' variant='outline-light' >Инвентаризация</Button> :<></> }
            <Button className='greenButton mb-3' variant='outline-success' onClick={()=>navigate(ORDER) } >Текущие заказы</Button>
        </Container>
        
    );
};

export default EmployerPanel;