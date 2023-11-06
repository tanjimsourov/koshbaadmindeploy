import React, {useEffect, useState} from 'react'
import Header from "../../components/Header";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useSelector} from "react-redux";
import axios from "axios";
import {baseurl} from "../../ApiEndpoint/Api";

const EmployeeList = () => {
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
    const [employees, setEmployee] = useState([])
    useEffect(() => {

        axios.get(`${baseurl}/api/employeelist`, config)
            .then(resp => {
                setEmployee(resp.data)
                console.log(resp.data)

            })
    }, [])

    const [message, setMessage] = useState()
    // const deleteHandler = (id) => {
    //
    //     axios.delete(`http://127.0.0.1:8000/api/deleteproduct/${id}`, config)
    //         .then(resp => {
    //             setMessage(resp.data)
    //             console.log(resp)
    //         })
    //
    // }


    return (
        <>
            <Header/>
            <Container>

                <Row className='align-items-center'>
                    <Col>
                        <h1>Employees</h1>

                    </Col>
                </Row>
                <Row>

                    <Col className='text-left'>


                        <Button className='my-3'>
                            <i className='fas fa-download'></i> Download Employees
                        </Button>
                        <br/>
                        <LinkContainer to={'/addstaff'}>
                            <Button className='my-3'>
                                <i className='fas fa-plus-circle'></i> Add Employee
                            </Button>
                        </LinkContainer>
                        <br/>

                    </Col>
                </Row>
                <Table

                    style={{padding: "10px 10px 5px 5px", margin: "10px 10px 10px 10px"}}>
                    <thead>
                    <tr>
                        <th>Id</th>
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
                    {employees.map((employee) => (
                    <tr key={employee.id} >
                        <td>{employee.id}</td>
                        <td>{employee.username}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.is_active}</td>
                        <td>{employee.is_admin}</td>
                        <td>{employee.is_staff}</td>
                        <td>{employee.is_verified}</td>
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

export default EmployeeList