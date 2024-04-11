import {React } from 'react';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import avatar from '../base_img/avatar.png';
import EmployerPanel from '../components/EmloyerPanel';

const Cabinet = () => {
    const User = [{email: '', password:'',phone:"",name:"",surname:"",lastname:"",sumOrder:""}];
    const Employer = {email: '', password:'',phone:"",name:"",surname:"",lastname:"",postId:'1'};
    const Post =[{id:1, name:"Администратор"},{id:2, name:"Флорист"},{id:3, name:"Курьер"}]
    const postId = Employer.postId ;
    console.log(postId);
    return (
        <Container className='mt-4'>
            <Row>
                <Col md={6}>
                    <FormControl type='image' src={avatar}/>
                </Col>
                <Col md={6}>
                    <h1 style={{fontFamily:'Marck Script'}}>Добрый день, {User.name} !</h1>
                    <div style={{ display: 'flex', flexDirection:' column'}}>
                        <h1> Email: {User.email}</h1>
                        <h1> Имя: {User.name}</h1>
                        <h1> Фамилия: {User.surname}</h1>
                        <h1> Отчество: {User.lastname}</h1>
                    </div>
                    <Button className='pupleButton'> Редактировать информация</Button>
                    <h1>Сумма заказов: {User.sumOrder} {' руб.'}</h1>
                    <EmployerPanel postId={postId}/>
                  
                </Col>
                
            </Row>
        </Container>
        
    );
};

export default Cabinet;