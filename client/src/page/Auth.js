import React, { useContext,useState } from 'react';
import { Button,Row, Card, Container,Form } from 'react-bootstrap';
import { LOGIN_ROUTE, REGISTRATION_ROUTE,SHOP_ROUTE } from '../utils/consts';
import { useLocation,NavLink } from 'react-router-dom';
import {logins, registration} from "../http/userApi";
import {Context} from "../index";

const Auth = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    //const history = useHistory()
    
    const isLogin = location.pathname === LOGIN_ROUTE
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [Name, setName] = useState('')
    const [LastName, setLastName] = useState('')
    const [SurName,setSurName] = useState('')
    const [phone,setPhone] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await logins(login, password);
            } else {
                data = await registration(login,email,password,Name,LastName,SurName,phone);
            }
            user.setUser(data)
            user.setIsAuth(true)
            //history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <Container 
        className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 70}}>
             <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                {isLogin ?
                <div>
                    <Form.Control
                        className="mt-4"
                        placeholder="Введите ваш login..."
                        value={email}
                        onChange={e=>setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        type="password"
                        autoComplete="on"
                    />
                    </div>
                : <div>
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
                </div>
                }
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;
