import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col, Container} from 'react-bootstrap'

import {useDispatch, useSelector} from 'react-redux'

import Header from "../../components/Header";
import {baseurl} from "../../ApiEndpoint/Api";

const UserList = () => {

    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo} = userSignin

    if (!userInfo) {
        document.location.href = '/'
    }
    const config = {
        headers: {
            Authorization: 'Bearer ' + userInfo.token
        }
    }
    //
    const [users, setUser] = useState([])
    useEffect(() => {

        axios.get(`${baseurl}/api/userlist`, config)
            .then(resp => {
                setUser(resp.data)
                console.log(resp.data)

            })
    }, [])
    //
    //
    // const deleteHandler = (id) => {
    //
    //   axios.delete(`http://127.0.0.1:8000/api/deleteproduct/${id}`, config)
    //     .then(resp => {
    //       console.log(resp)
    //     })
    //
    // }
    // const downloadHandler = () => {
    //
    //   axios.get(`http://127.0.0.1:8000/api/productsdownload`, config)
    //     .then(resp => {
    //       console.log(resp)
    //     })
    //
    // }

    return (
        <>
            <Header/>
            <Container>

                <Row className='align-items-center'>
                    <Col>
                        <h1>Customers</h1>

                    </Col>
                </Row>
                <Row>

                    <Col className='text-left'>


                        <Button className='my-3'>
                            <i className='fas fa-download'></i> Download Customers
                        </Button>
                        <br/>

                        <LinkContainer to={'/addcustomer'}>
                            <Button className='my-3'>
                                <i className='fas fa-plus-circle'></i> Add Customer
                            </Button>
                        </LinkContainer>
                        <br/>


                    </Col>
                </Row>
                <Table

                    style={{padding: "10px 10px 5px 5px", margin: "10px 10px 10px 10px"}}>
                    <thead>
                    <tr>
                        <th>Account Number</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Active</th>
                        <th>Admin</th>
                        <th>Staff</th>
                        <th>Verified</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                         <tr key={user.id} >
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.is_active}</td>
                        <td>{user.is_admin}</td>
                        <td>{user.is_staff}</td>
                        <td>{user.is_verified}</td>
                        <td>


                            <LinkContainer to={`/profile`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className="fas fa-user"></i>
                                </Button>
                            </LinkContainer>

                            <Button
                                variant='danger'
                                className='btn-sm'

                            >
                                <i className='fas fa-trash'></i>
                            </Button>
                        </td>
                    </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>


        </>
    )
}

export default UserList