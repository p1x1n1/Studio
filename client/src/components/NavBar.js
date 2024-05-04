import React, { useContext } from 'react';
import { Context } from '..';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Form, Image, NavDropdown, Offcanvas} from "react-bootstrap"
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, SHOP_ROUTE,Boquet_ROUTE, IndBoquet_ROUTE, CABINET, Basket_ROUTE, SELECTED } from '../utils/consts';
import logo from '../base_img/icons/logo_men.png';
import cabinet from '../base_img/icons/green_avatar.png';
import basket from '../base_img/icons/green_basket.png';
import heart from '../base_img/icons/green_heart.png';
import '../css/NavBar.css';


const NavBar = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOut = () => {
      user.setUser({});
      user.setIsAuth(false);
      navigate(LOGIN_ROUTE);
      console.log(user.user)
    }
    
    return (
     <>
     <div className='navbar_background'></div>
        <Navbar className=" mb-3 navbar">
        <Container fluid>
          <Navbar.Brand >
             <NavLink to={SHOP_ROUTE}>
                <div className='brand'>
                  <Image width={200} height={150} src={logo}/> 
                  <h1 className='brand'> FlowerS/Studio</h1>
                </div>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar `} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar `}
            aria-labelledby={`offcanvasNavbarLabel `}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel `}>
                
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown
                  title="Букеты"
                  id={`offcanvasNavbarDropdown `}
                >
                  <NavDropdown.Item href="#action4">
                   <NavLink className= "navlink" to={Boquet_ROUTE}> Каталог</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    <NavLink className= "navlink" to={IndBoquet_ROUTE}>Индивидуальные букеты</NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link  > Доставка </Nav.Link>
                <Nav.Link > Контакты </Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Артикул/Название"
                  className="me-2"
                  aria-label="Артикул/Название"
                />
                <Button variant="outline-success" onClick={()=>navigate(Boquet_ROUTE)}>Поиск</Button>
              </Form>
            </Offcanvas.Body>
            
          </Navbar.Offcanvas>
          <div className='ml-2'>
            {user.isAuth ?
            <Nav>
              <NavLink className='navlink' to={CABINET}> <Image width={50} height={50} src={cabinet}/> </NavLink>
             { (user.user.post === 'user') ?
                <Nav>
                  <NavLink className="navlink" to={Basket_ROUTE +'/'+ user.user.login}> <Image width={50} height={50} src={basket}/> </NavLink>
                  <NavLink className="navlink" to={SELECTED+'/'+ user.user.login}> <Image width={50} height={50} src={heart}/> </NavLink>
                </Nav> 
                : <></>}
              <Button variant={"outline-success"} onClick={logOut}>Выйти</Button>
            </Nav>
            : <Button variant={"outline-success"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
            }
          </div>
        </Container>
      </Navbar>
     </>
      /*
        <Navbar className="Navbar" style={{height:50,fontFamily:'Marmelad'}}>
        <Container className='d-flex justife-content-between'>
          <Nav bg = "light" className='d-flex justife-content-between' >
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
      </Navbar>*/
    );
};

export default NavBar;