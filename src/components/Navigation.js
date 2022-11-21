import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from 'react-redux';


const Navigation = () => {
    const nav = useNavigate();
    const location = useLocation();
    const [navShow, setNavShow] = useState(false);
    const { mainVideoClick } = useSelector(state => state.main)

    useEffect(() => {
        if (location.pathname.indexOf('/home') == -1) {
            setNavShow(true);
        } else { //홈화면일 경우
            window.addEventListener("scroll", () => {
                if (window.scrollY > 100) {
                    setNavShow(true);
                } else {
                    setNavShow(false);
                }
            })

            return () => {
                window.removeEventListener("scroll", () => { })
            }
        }
    }, [])

    console.log(navShow);

    return (
        <div className={navShow || mainVideoClick ? "nav-bar-down" : "nav-bar-up"}>
            <Navbar bg="navbar-inverse" variant='dark' expand="lg" >
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img width={100}
                            src={process.env.PUBLIC_URL + `/img/main_logo.png`}
                            onClick={() => nav('/home')}
                            alt="main_logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Link to="/home" className='nav-bar-item'>홈</Link>
                            <Link to="/movies" className='nav-bar-item'>영화</Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="검색"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-danger">
                                <FontAwesomeIcon icon="fa-magnifying-glass" />
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;