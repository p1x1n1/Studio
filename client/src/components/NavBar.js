import React, { useContext } from 'react';
import { Context } from '..';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Image} from "react-bootstrap"
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, SHOP_ROUTE,Boquet_ROUTE, IndBoquet_ROUTE } from '../utils/consts';
import logo from '../base_img/logo1.png';
import '../css/NavBar.css';

const NavBar = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOut = () => {
      user.setUser();
      user.setIsAuth(false);
    }
    console.log(user.isAuth)
    return (
        <Navbar className="Navbar" style={{height:50,fontFamily:'Marmelad'}}>
        <Container className='d-flex justife-content-between'>
          <Nav bg = "light" lassName='d-flex justife-content-between' >
            <NavLink className= "navlink" to={Boquet_ROUTE}>Каталог</NavLink>
            <NavLink className= "navlink" to={IndBoquet_ROUTE}>Индивидуальный Букет</NavLink>
          </Nav>

          <Navbar.Brand href=""  style={{height:50}}>
            <NavLink to={SHOP_ROUTE}>
                <Image width={220} height={60} src={logo}/>
            </NavLink>
            </Navbar.Brand>
          <Nav >
            <Nav.Link href="#pricing">Доставка</Nav.Link>
            <Nav.Link href="#pricing">О нас</Nav.Link>
            <Nav.Link href="#pricing">Контакты</Nav.Link>
          </Nav>
          {user.isAuth ?
          <Nav>
            <NavLink className="navlink">Кабинет</NavLink>
            <NavLink className="navlink" onClick={logOut}>Выйти</NavLink>
          </Nav>
          : <Button variant={"outline-success"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
          }
        </Container>
      </Navbar>
    );
};

export default NavBar;