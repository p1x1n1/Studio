import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Admin from './AdminPanel';
import { useNavigate } from 'react-router-dom';
import { ORDER } from '../utils/consts';


const EmployerPanel = ({postId}) => {
    const navigate = useNavigate();
    return (
        <Container className='mb-3'>
             { (postId === '1') ?
                <Admin/> 
                : <></> }
            <Button className='greenButton mb-3' onClick={()=>navigate(ORDER) } >Текущие заказы</Button>
        </Container>
        
    );
};

export default EmployerPanel;