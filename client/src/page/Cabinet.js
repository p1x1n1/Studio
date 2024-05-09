import {React, useContext, useState,useEffect } from 'react';
import { Button, Col, Container, FormControl,  Row, Spinner } from 'react-bootstrap';
import avatar from '../base_img/icons/green_avatar.png';
import EmployerPanel from '../components/EmloyerPanel';
import { Context } from '../index';
import { Avatar, Form, Image, Input,Modal } from 'antd';
import { ApiService } from '../http/api.service'
import { check } from '../http/userApi';
import {Form as ReactForm} from 'react-bootstrap';
import { DOCUMENT, ORDER } from '../utils/consts';
import { useNavigate } from 'react-router-dom';


const apiService = new ApiService()
const Cabinet = () => {
    const {user} = useContext(Context);
    console.log('user', user);
    const [modalVisible, setModalVisible] = useState(false)
    const [UserRecord, setUserRecord] = useState({})
    const [loading, setLoading] = useState(true)
	const [img,setImg] = useState(null)
	const navigate = useNavigate();
    function saveItem(login) {
		const formData = new FormData();
		formData.append('avatar', img);
		formData.append('email', UserRecord.email);
		formData.append('lastname', UserRecord.lastname ); 
		formData.append('name_', UserRecord.name_);
		formData.append('surname', UserRecord.surname);
		formData.append('phone', UserRecord.phone);
		formData.append('login', UserRecord.login);
		formData.append('postIdRecord', UserRecord.postIdRecord);
        (user.user.post==='user')?
		apiService.postformData('/user/'+login, formData).then(() => {
			close()
			//fetchData()
		})
        :
        apiService.postformData('/employee/'+login, formData).then(() => {
            close()
			//fetchData()
		})

	}
    function close() {
        check().then(data => {
            console.log(data)
            user.setUser(data);
            user.setIsAuth(true);
          }).finally(() => setLoading(false));
          if (loading){
            return <Spinner animation={"grows"}/>
          }
        
		setUserRecord({})
		setModalVisible(false)
	}

    return (
        <div className='mt-4'>
            <Row>
                <Col md={5}>
                    <Image className='center'  style = {{width:'70%',height:'70%', margin:'auto 0',padding:'auto 0',borderRadius: "70px"}} src={user.user.avatar ? process.env.REACT_APP_API_URL+user.user.avatar:avatar}/>
					<h1 style={{fontFamily:'goosberry'}}> Вы зашли под профилем {user.user.post} </h1>
				</Col>
                <Col md={7} className='cabinet'>
                    <h1 style={{fontFamily:'goosberry'}}>Добрый день{user.user.name_ ? ', '+ user.user.name_ : <></>} !</h1>
                    <div style={{ display: 'flex', flexDirection:' column'}} >
                        <h1> Email: {user.user.email}</h1>
                        <h1> Имя: {user.user.name_ ?  user.user.name_ : <></>}</h1>
                        <h1> Фамилия: {user.user.surname ?  user.user.surname : <></>}</h1>
                        <h1> Отчество: {user.user.lastname ?  user.user.lastname : <></>}</h1>
						<h1> Телефон: {user.user.phone ?  user.user.phone : <></>}</h1>
                    </div>
                    <Button className='pupleButton' variant='outline-light' 
                    onClick={() => {setModalVisible(true); setUserRecord(user.user)}}> Редактировать информацию </Button>
                    {console.log('role',user.user.post)}
                    {(user.user.post==='user')? 
						<>
							<Button className='greenButton' onClick={()=>navigate(DOCUMENT)}>Заказы</Button>
							<h1>Персональная скидка: {user.user.procent} {' процентов'}</h1>
							<h1>Сумма заказов: {user.user.order_sum} {' руб.'}</h1>
						</>
						: <EmployerPanel post={user.user.post}/> }
                </Col>
            </Row>
            <Modal
					title={'Изменение информации о ' + UserRecord.login}
					open={modalVisible}
					okText='Сохранить'
					cancelText='Отмена'
					onCancel={() => close()}
					centered
					footer={[
						<Button className='mb-3 greenButton' type='primary' onClick={() =>  saveItem(UserRecord.login) } disabled={!UserRecord.login && !UserRecord.email }>
							Сохранить
						</Button>,
						<Button className='mb-3 greenButton' onClick={() => close()}>Отмена</Button>
					]
				}
				>
					{console.log('EmployeeRec',UserRecord)}
					
					<Form labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>

						<Form.Item label='Почта'>
							<Input 
								onChange={v =>
									setUserRecord(prevState => {
										return { ...prevState, email: v.target.value }//... - operator spret - ...
									})
								}
								value={UserRecord.email}
							/>
						</Form.Item>
						<Form.Item label='Телефон'>
							<Input
								onChange={v =>
									setUserRecord(prevState => {
										return { ...prevState, phone: v.target.value }//... - operator spret - ...
									})
								}
								value={UserRecord.phone}
							/>
						</Form.Item>
						<Form.Item label='Имя'>
							<Input
								onChange={v =>
									setUserRecord(prevState => {
										return { ...prevState, name_: v.target.value }//... - operator spret - ...
									})
								}
								value={UserRecord.name_}
							/>
						</Form.Item>
						<Form.Item label='Фамилия'>
							<Input
								onChange={v =>
									setUserRecord(prevState => {
										return { ...prevState, surname: v.target.value }//... - operator spret - ...
									})
								}
								value={UserRecord.surname}
							/>
						</Form.Item>
						<Form.Item label='Отчество'>
							<Input
								onChange={v =>
									setUserRecord(prevState => {
										return { ...prevState, lastname: v.target.value }//... - operator spret - ...
									})
								}
								value={UserRecord.lastname}
							/>
						</Form.Item>
						<ReactForm.Group controlId="formFile" className="mb-3">
							<ReactForm.Label>Изображение</ReactForm.Label>
							<ReactForm.Control type="file" 
								onChange={v =>
								{
									console.log(v.target.files[0]);
									setImg(v.target.files[0]);
								}
							}/>
						</ReactForm.Group>
					</Form>
				</Modal>
        </div>
        
    );
};

export default Cabinet;