import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col, Container} from 'react-bootstrap'
import { useSelector} from 'react-redux'
import Header from "../../components/Header";
import {baseurl} from "../../ApiEndpoint/Api";

const FdrList = () => {

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
    const [fdrlist, setFdrlist] = useState([])
    useEffect(() => {

        axios.get(`${baseurl}/api/fdrlist`, config)
            .then(resp => {
                setFdrlist(resp.data)
                console.log(resp.data)

            })
    }, [])
    //
    //

    const url = `${baseurl}/api/fdrlist/download`
    const download =(url)=>{
        const aTag = document.createElement('a')
        aTag.href=url
        aTag.setAttribute('download','fdrlist.csv')
        document.body.appendChild(aTag)
        aTag.click()
        aTag.remove()
    }

    return (
        <>
            <Header/>
            <Container>

                <Row className='align-items-center'>
                    <Col>
                        <h1>FDR List</h1>

                    </Col>
                </Row>
                <Row>

                    <Col className='text-left'>


                        <Button className='my-3'

                         onClick={() => {download(url)}}
                        >
                            <i className='fas fa-download'></i> Download FDR-List
                        </Button>
                        <br/>

                        <LinkContainer to={'/finduser'}>
                            <Button className='my-3'>
                                <i className='fas fa-plus-circle'></i> Add FDR
                            </Button>
                        </LinkContainer>
                        <br/>
                        <LinkContainer to={'/finduser'}>
                            <Button className='my-3'>
                                <i className='fa fa-times'></i> Check Closed List
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
                        <th>FDR owner</th>
                        <th>FDR owner Contact</th>
                        <th>Fdr Time(in Month)</th>
                        <th>FDR amount</th>
                        <th>FDR created By</th>
                        <th>FDR-interest</th>
                        <th>Return Amount</th>
                        <th>FDR Date</th>

                    </tr>
                    </thead>
                    <tbody>
                    {fdrlist.map((fdr) => (
                         <tr key={fdr.id} >
                        <td>{fdr.id}</td>
                        <td>{fdr.fdrowner.username}</td>
                        <td>{fdr.fdrowner.phone}</td>
                        <td>{fdr.fdr_time}</td>
                        <td>{fdr.balance}</td>
                        <td>{fdr.doneby}</td>
                        <td>{parseFloat(fdr.interest).toFixed(2)}</td>
                        <td>{parseFloat(fdr.returnAmount).toFixed(2)}</td>
                        <td>{fdr.created_at}</td>

                        <td>
                        <LinkContainer to={`/addcollection`}>
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
             //       onClick={() => deleteHandler(loan.id)}
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

export default FdrList