import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from 'react-redux';
import { StoreContext } from '../redux/StoreContext';


const Navigation = () => {
    const nav = useNavigate();
    const location = useLocation();
    const { keyword, navShow, activePage, selectGenre } = useContext(StoreContext);
    const { mainVideoClick } = useSelector(state => state.main)

    const searchMovie = (e) => {
        e.preventDefault();

        nav('/movies')
    }

    const handlelinkClick = (type ='link') => {
        //초기화
        activePage[1](1);
        selectGenre[1](0);

        if (type == 'home')
            nav('/home')
    }

    useEffect(() => {
        if (location.pathname.indexOf('/home') === -1) {
            navShow[1](true);
        } else { //홈화면일 경우
            window.addEventListener("scroll", () => {
                if (window.scrollY > 100) {
                    navShow[1](true);
                } else {
                    navShow[1](false);
                }
            })

            return () => {
                window.removeEventListener("scroll", () => { })
            }
        }
    }, [])

    return (
        <div className={navShow[0] || mainVideoClick ? "nav-bar-down" : "nav-bar-up"}>
            <Navbar bg="navbar-inverse" variant='dark' expand="lg" >
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img width={100}
                            src={process.env.PUBLIC_URL + `/img/main_logo.png`}
                            onClick={() => handlelinkClick('home')}
                            alt="main_logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Link to={'/home'} onClick={() => handlelinkClick()} className='nav-bar-item'>홈</Link>
                            <Link to={'/movies'} onClick={() => handlelinkClick()}  className='nav-bar-item'>영화</Link>
                            <Link to={'/nowmovies'} onClick={() => handlelinkClick()} className='nav-bar-item'>현재 상영 영화</Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={(e) => searchMovie(e)}>
                            <Form.Control
                                type="search"
                                placeholder="검색"
                                className="me-2"
                                aria-label="Search"
                                value={keyword[0]}
                                onChange={(event) => keyword[1](event.target.value)}
                            />
                            <Button variant="outline-danger" type="submit">
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