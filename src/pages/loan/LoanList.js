import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col, Container} from 'react-bootstrap'
import { useSelector} from 'react-redux'
import Header from "../../components/Header";
import {baseurl} from "../../ApiEndpoint/Api";

const LoanList = () => {

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
    const [loans, setLoans] = useState([])
    useEffect(() => {

        axios.get(`${baseurl}/api/loaneelist`, config)
            .then(resp => {
                setLoans(resp.data)
                console.log(resp.data)

            })
    }, [])
    //
    //
    const deleteHandler = (id) => {

      axios.delete(`http://127.0.0.1:8000/api/deleteproduct/${id}`, config)
        .then(resp => {
          console.log(resp)
        })

    }
    const url = `${baseurl}/api/loaneelist/download`
    const download =(url)=>{
        const aTag = document.createElement('a')
        aTag.href=url
        aTag.setAttribute('download','loanlist.csv')
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
                        <h1>Loan List</h1>

                    </Col>
                </Row>
                <Row>

                    <Col className='text-left'>


                        <Button className='my-3'

                         onClick={() => {download(url)}}
                        >
                            <i className='fas fa-download'></i> Download Loan-List
                        </Button>
                        <br/>

                        <LinkContainer to={'/searchuser'}>
                            <Button className='my-3'>
                                <i className='fas fa-plus-circle'></i> Add Loan
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
                        <th>Loan Type</th>
                        <th>Somiti Type</th>
                        <th>Lend Amount</th>
                        <th>Interest</th>
                        <th>Total Payable</th>
                        <th>Time(years)</th>
                        <th>T Installment</th>
                        <th>P Installment</th>
                        <th>Due</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loans.map((loan) => (
                         <tr key={loan.id} >
                        <td>{loan.id}</td>
                        <td>{loan.loanee.username}</td>
                        <td>{loan.loanee.phone}</td>
                        <td>{loan.loanType}</td>
                        <td>{loan.loanee.somiti_type}</td>
                        <td>{loan.lendAmount}</td>
                        <td>{loan.interest}</td>
                        <td>{parseFloat(loan.totalPayable).toFixed(2)}</td>
                        <td> {parseFloat(loan.time).toFixed(2)}</td>
                        <td>{loan.totalInstallment}</td>
                        <td>{loan.paidInstallment}</td>
                        <td>{parseFloat(loan.dueAmount).toFixed(2)}</td>
                        <td>
                        <LinkContainer to={`/addcollection/${loan.id}`}>
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
                    onClick={() => deleteHandler(loan.id)}
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

export default LoanList