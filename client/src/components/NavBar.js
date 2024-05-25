import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Form, Image, NavDropdown, Offcanvas, Stack} from "react-bootstrap"
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, SHOP_ROUTE,Boquet_ROUTE, IndBoquet_ROUTE, CABINET, Basket_ROUTE, SELECTED } from '../utils/consts';
import logo from '../base_img/icons/label.png';
import cabinet from '../base_img/icons/green_user_2.png';
import basket from '../base_img/icons/flower-basket.png';
import heart from '../base_img/icons/heart.png';
import '../css/NavBar.css';
import { ApiService } from "../http/api.service";


const apiService = new ApiService();

const NavBar = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOut = () => {
      user.setUser({});
      user.setIsAuth(false);
      navigate(LOGIN_ROUTE);
      console.log(user.user)
    }
    const [NameOrArc,setNameOrArc] = useState();
    useEffect(() => {}, [NameOrArc])
    
    return (
     <>
     <div className='navbar_background'></div>
        <Navbar className=" mb-3 navbars">
        <Container fluid>
          <Navbar.Brand >
             <NavLink to={SHOP_ROUTE}>
                <Stack direction='horizontal'>
                  <Image style={{width:'13%'}} src={logo}/> 
                  <h1 className='brand' > FlowerS/Studio</h1>
                </Stack>
            </NavLink>
          </Navbar.Brand>
            <Navbar.Toggle aria-controls='bouquet' />
              <NavDropdown 
                  variant="light"
                  title="Букеты" 
                  id='bouquet'
                  style={{ color: "white", margin:"1%" }}
                >
                  <NavDropdown.Item href="#action4">
                   <NavLink id='catalog' className= "navlink" to={Boquet_ROUTE}> Каталог</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    <NavLink className= "navlink" to={IndBoquet_ROUTE}>Индивидуальные букеты</NavLink>
                  </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link  style={{ color: "white", margin:"1%"}}> Доставка </Nav.Link>
              <Nav.Link  style={{ color: "white", margin:"1%" }}> Контакты </Nav.Link>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Артикул/Название букета"
                  className="me-2"
                  id='search_input'
                  aria-label="Артикул/Название"
                  onChange={(v)=>{
                    setNameOrArc(v.target.value);
                    console.log(NameOrArc)
                  }}
                />
                <Button id='search_button' style={{ marginLeft:"1%" }} variant="outline-success" onClick={()=>{navigate(Boquet_ROUTE+'/'+NameOrArc)}}>Поиск</Button>
              </Form>
          <div className='ml-2'>
            {user.isAuth ?
            <Nav>
              <NavLink className='navlink ' id='cabinet' style={{ marginLeft:"1%" }} to={CABINET}> <Image className='hover_white' width={50} height={50} src={cabinet}/> </NavLink>
             { (user.user.post === 'user') ?
                <Nav>
                  <NavLink  style={{ marginLeft:"1%" }}  id='baskets' className="navlink" to={Basket_ROUTE +'/'+ user.user.login} > <Image width={50} height={50} src={basket}/> </NavLink>
                  <NavLink  style={{ marginRight:"2%" }} className="navlink" to={SELECTED+'/'+ user.user.login}> <Image width={50} height={50} src={heart}/> </NavLink>
                </Nav> 
                : <></>}
              <Button variant={"outline-success"} style={{ marginLeft:"1%" }} onClick={logOut}>Выйти</Button>
            </Nav>
            : <Button variant={"outline-success"} style={{ marginLeft:"2%" }} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
            }
          </div>
        </Container>
      </Navbar>
     </>
    );
};

export default NavBar;