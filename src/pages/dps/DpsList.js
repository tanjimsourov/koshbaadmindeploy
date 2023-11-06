import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col, Container} from 'react-bootstrap'
import { useSelector} from 'react-redux'
import Header from "../../components/Header";
import {baseurl} from "../../ApiEndpoint/Api";

const DpsList = () => {

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
    const [dps, setDPS] = useState([])
    useEffect(() => {

        axios.get(`${baseurl}/api/dpslist`, config)
            .then(resp => {
                setDPS(resp.data)
                console.log(resp.data)

            })
    }, [])
    //
    //

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
                        <h1>DPS List</h1>

                    </Col>
                </Row>
                <Row>

                    <Col className='text-left'>


                        <Button className='my-3'>
                            <i className='fas fa-download'></i> Download DPS-List
                        </Button>
                        <br/>

                        <LinkContainer to={'/getuser'}>
                            <Button className='my-3'>
                                <i className='fas fa-plus-circle'></i> Add DPS
                            </Button>
                        </LinkContainer>
                        <br/>

                    </Col>
                </Row>
                <Table

                    style={{padding: "10px 10px 5px 5px", margin: "10px 10px 10px 10px"}}>
                    <thead>
                    <tr>
                        <th>Serial no</th>
                        <th>Username</th>
                        <th>Contact</th>
                        <th>DPS Type</th>
                        <th>Somiti Type</th>
                        <th>Account Balance</th>
                        <th>Added By</th>
                        <th>Opening Time</th>

                    </tr>
                    </thead>
                    <tbody>
                    {dps.map((d) => (
                        <tr key={d.id} >

                        <td>{d.id}</td>
                            <td>{d.accountHolder.username}</td>
                            <td>{d.accountHolder.phone}</td>
                        <td>{d.dpsType}</td>
                            <td>{d.accountHolder.somiti_type}</td>
                        <td>{d.accountBalance}</td>
                        <td>{d.doneby}</td>
                        <td>{d.openingDate}</td>


                        <td>
                        <LinkContainer to={`/adddeposit/${d.id}`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  {/*<LinkContainer to={`/paid/${loan.id}`}>*/}
                  {/*  <Button variant='light' className='btn-sm'>*/}
                  {/*    <i className='fas fa-edit'></i>*/}
                  {/*  </Button>*/}
                  {/*</LinkContainer>*/}
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

export default DpsList