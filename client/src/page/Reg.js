import React, { useContext, useState } from 'react';
import { Button, Row, Card, Container } from 'react-bootstrap';
import { LOGIN_ROUTE } from '../utils/consts';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { registration } from "../http/userApi";
import { Context } from "../index";
import { Form, Input } from 'antd';

const Reg = () => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    const [authErrorMessage, setAuthErrorMessage] = useState('');
    const [form] = Form.useForm();
    const validateMessages = {
        required: 'Обязательное поле!'
    };

    async function auth() {
        try {
            await form.validateFields();
            const formData = form.getFieldsValue();
            let data = await registration(formData);  
            if (data) {
                user.setUser(data);
                user.setIsAuth(true);
                navigate("/");
            } else {
                setAuthErrorMessage('Такой логин уже есть!');
            }
        } catch (err) {
            console.log('error', err);
            setAuthErrorMessage('Произошла ошибка при регистрации.');
        }
    }

    async function repeatPasswordFieldValidation(formRecord) {
        const passwordField = formRecord.getFieldValue('password_'); // Reference 'password_' field
        const passwordRepeatField = formRecord.getFieldValue('passwordRepeat');
        if (passwordRepeatField && passwordField !== passwordRepeatField) {
            throw Error('Пароли не совпадают!');
        }
    }

    function checkPasswordStrength(rule, value) {
        if (value && value.length >= 8 && value.match(/[a-zA-Z]/)) {
            return Promise.resolve();
        }
        return Promise.reject('Пароль должен состоять минимум из 8 символов и содержать хотя бы 1 букву!');
    }

    return (
        <Container id='container_auth' className="d-flex justify-content-center align-items-center">
            <Card className="p-5 card_auth">
                <h2 className="m-auto">Регистрация</h2>
                <Form
                    className="d-flex flex-column"
                    layout='horizontal'
                    form={form}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        label={<label style={{ color: "white" }}>Логин</label>}
                        name="login"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Введите ваш login..." allowClear />
                    </Form.Item>

                    <Form.Item
                        label={<label style={{ color: "white" }}>Почта</label>}
                        name='email'
                        rules={[
                            { required: true },
                            { type: 'email', message: 'Неверный формат почты' }
                        ]}
                    >
                        <Input placeholder="Введите вашу почту..." allowClear />
                    </Form.Item>

                    <Form.Item
                        label={<label style={{ color: "white" }}>Телефон</label>}
                        name='phone'
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Введите ваш телефон..." allowClear />
                    </Form.Item>

                    <Form.Item
                        label={<label style={{ color: "white" }}>Пароль</label>}
                        name="password_"
                        rules={[
                            { required: true },
                            { validator: checkPasswordStrength }
                        ]}
                    >
                        <Input.Password placeholder="Введите ваш пароль..." allowClear />
                    </Form.Item>

                    <Form.Item
                        label={<label style={{ color: "white" }}>Повторите Пароль</label>}
                        name="passwordRepeat"
                        rules={[
                            { required: true },
                            {
                                validator: (_, value) => repeatPasswordFieldValidation(form)
                            }
                        ]}
                    >
                        <Input.Password placeholder="Повторите ваш пароль..." allowClear />
                    </Form.Item>

                    <Form.Item
                        label={<label style={{ color: "white" }}>Имя</label>}
                        name='name_'
                    >
                        <Input placeholder="Введите ваше Имя..." />
                    </Form.Item>

                    <Form.Item
                        label={<label style={{ color: "white" }}>Фамилия</label>}
                        name='surname'
                    >
                        <Input placeholder="Введите вашу Фамилию..." />
                    </Form.Item>

                    <Form.Item
                        label={<label style={{ color: "white" }}>Отчество</label>}
                        name='lastname'
                    >
                        <Input placeholder="Введите ваше Отчество..." />
                    </Form.Item>

                </Form>
                {authErrorMessage && <div className='auth-error-message'>{authErrorMessage}</div>}
                <Row className="d-flex justify-content-between mt-3 ">
                    <div style={{ color: "white" }}>Есть аккаунт? <NavLink className='navlink' to={LOGIN_ROUTE}>Войдите!</NavLink></div>
                    <Button className='greenButton' onClick={auth}>
                        Регистрация
                    </Button>
                </Row>
            </Card>
        </Container>
    );
};

export default Reg;
