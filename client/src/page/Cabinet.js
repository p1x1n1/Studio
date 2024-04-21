import {React, useContext } from 'react';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import avatar from '../base_img/icons/green_avatar.png';
import EmployerPanel from '../components/EmloyerPanel';
import { Context } from '../index';

const Cabinet = (props) => {
    const {user} = useContext(Context);
    console.log('user', user);
    //const User = {email: '', password:'',phone:"",name:"",surname:"",lastname:"",sumOrder:""};
    // const Employer = {email: '', password:'',phone:"",name:"",surname:"",lastname:"",postId:'1'};
    // const Post =[{id:1, name:"Администратор"},{id:2, name:"Флорист"},{id:3, name:"Курьер"}]
    // const postId = Employer.postId ;
    // console.log(postId);
    return (
        <Container className='mt-4'>
            <Row>
                <Col md={5}>
                    <FormControl type='image' src={avatar}/>
                </Col>
                <Col md={7}>
                    <h1 style={{fontFamily:'Marck Script'}}>Добрый день {user.user.name_ ? ','+ user.user.name_ : <></>} !</h1>
                    <div style={{ display: 'flex', flexDirection:' column'}}>
                        <h1> Email: {user.user.email}</h1>
                        <h1> Имя: {user.user.name_ ?  user.user.name_ : <></>}</h1>
                        <h1> Фамилия: {user.user.surname ?  user.user.surname : <></>}</h1>
                        <h1> Отчество:{user.user.lastname ?  user.user.lastname : <></>}</h1>
                    </div>
                    <Button className='pupleButton' variant='outline-light'> Редактировать информация </Button>
                    {console.log('role',user.user.post)}
                    {(user.user.post==='user')? <h1>Сумма заказов: {user.sumOrder} {' руб.'}</h1> : <EmployerPanel post={user.user.post}/> }
                </Col>
            </Row>
        </Container>
        
    );
};

export default Cabinet;