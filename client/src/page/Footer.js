import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, SHOP_ROUTE,Boquet_ROUTE, IndBoquet_ROUTE, CABINET, Basket_ROUTE, SELECTED } from '../utils/consts';
import logo from '../base_img/icons/label.png';
import { Col, Row } from 'antd';
import { Image, NavDropdown, Stack } from 'react-bootstrap';

function Footer() {
	return (
		<>
			<div className='footer'>
			<Row>
				<Col span={8}>
					<Stack direction='horizontal'>
					<Image style={{width:'13%'}} src={logo}/> 
					<h1 className='brand' > FlowerS/Studio</h1>
					</Stack>
				</Col>
				<Col span={8}>
					<Navbar className="mb-3 d-flex flex-column">
					<NavDropdown 
						variant="light"
						title="Букеты" 
						id={`offcanvasNavbarDropdown `}
						style={{ color: "white" }}
						>
						<NavDropdown.Item href="#action4">
						<NavLink className= "navlink" to={Boquet_ROUTE}> Каталог</NavLink>
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action5">
							<NavLink className= "navlink" to={IndBoquet_ROUTE}>Индивидуальные букеты</NavLink>
						</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link  style={{ color: "white" }}> Доставка </Nav.Link>
						<Nav.Link  style={{ color: "white" }}> Контакты </Nav.Link>
					</Navbar>
				</Col>
				<Col span={8} className="mb-3 d-flex flex-column">
					<a className='footer-link' href='https://github.com/Yar-B/react-fullstack'>
						Репозиторий проекта
					</a>
					<a className='footer-link' href='https://github.com/Yar-B/react-fullstack'>
						Автор проекта
					</a>
				</Col>
			</Row>
			</div>
		</>
	)
}

export default Footer
