import React from 'react'

import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {signout} from "../actions/userAction";

function Header() {
    const dispatch = useDispatch()
    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo} = userSignin
    const logoutHandler = () => {

        dispatch(signout())
    }


    return (
        <header>

          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <LinkContainer to='/dashboard'>
                        <Navbar.Brand>Admin Dashboard</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <LinkContainer to='/signin'>
                            <Nav.Link>
                                {userInfo ? (
                                    <NavDropdown title={userInfo.username} id='username'>

                                        {userInfo.is_superuser === true ? (
                                            <LinkContainer to='/dashboard'>
                                                <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                            </LinkContainer>
                                        ) : (
                                            <LinkContainer to='/userprofile'>
                                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                            </LinkContainer>

                                        )}

                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to='/signin'>
                                        <Nav.Link>
                                            <i className='fas fa-user'></i> Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                )}

                            </Nav.Link>
                        </LinkContainer>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>

    )
}

export default Header