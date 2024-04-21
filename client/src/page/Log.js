import React, { useContext,useState } from 'react';
import { Button,Row, Card, Container,Form } from 'react-bootstrap';
import { LOGIN_ROUTE, REGISTRATION_ROUTE,SHOP_ROUTE } from '../utils/consts';
import { useLocation,NavLink,useNavigate } from 'react-router-dom';
import {getUser, logins} from "../http/userApi";
import {Context} from "../index";
import '../css/Auth.css';


const Auth = () => {
    const {user} = useContext(Context)
    const location = useLocation()
   
    const navigate = useNavigate()

    const isLogin = location.pathname === LOGIN_ROUTE
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')


    const click = async () => {
        try {
            let  data = await logins(login, password);
            console.log('data',data);
            user.setUser(data);
            user.setIsAuth(true);
            // let info = await getUser(login, password,user.user.post);
            ////////////////////////////////////////////////////////////////
            //console.log('info',info);
            //user.setInfo(info);

            ////////////////////////////////
            navigate("/");
        } 
        catch (e) {
            alert(e.response.data.message)
        }
        
        
    }
    return (
        <Container 
        className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>
             <Card style={{width: 600}} className="p-5" id='card_auth'>
                <h2 className="m-auto">'Авторизация' </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-4"
                        placeholder="Введите ваш login..."
                        value={login}
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
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                        'Войти' 
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;
