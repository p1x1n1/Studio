import React, { useContext,useState } from 'react';
import { Button,Row, Card, Container,Form } from 'react-bootstrap';
import { LOGIN_ROUTE} from '../utils/consts';
import { useLocation,NavLink,useNavigate } from 'react-router-dom';
import {registration} from "../http/userApi";
import {Context} from "../index";

const Reg = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [Name, setName] = useState('')
    const [LastName, setLastName] = useState('')
    const [SurName,setSurName] = useState('')
    const [phone,setPhone] = useState('')

    const click = async () => {
        try {
            let data = await registration(login,email,password,Name,LastName,SurName,phone);
            user.setUser(data)
            user.setIsAuth(true)
            navigate("/")
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <Container id='container_auth'
        className="d-flex justify-content-center align-items-center">
             <Card id='card_auth' className="p-5" >
                <h2 className="m-auto">"Регистрация"</h2>
                <Form className="d-flex flex-column">
                     <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш login..."
                        value={login}
                        onChange={e=>setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите вашу почту..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        
                    />
                     <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите вашe Имя..."
                        value={Name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите вашe Фамилия..."
                        value={LastName}
                        onChange={e => setLastName(e.target.value)}
                        
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите вашe Отчество..."
                        value={SurName}
                        onChange={e => setSurName(e.target.value)}
                        
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш ..."
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                               <div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></div> 
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            'Регистрация'
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Reg;