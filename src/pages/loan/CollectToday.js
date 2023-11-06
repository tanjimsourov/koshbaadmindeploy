import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col, Container} from 'react-bootstrap'
import { useSelector} from 'react-redux'
import Header from "../../components/Header";
import {baseurl} from "../../ApiEndpoint/Api";
import {getCurrentDate} from "../../components/featuredInfo/getCurrentDate"
const CollectToday = () => {

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
    const [cols, setCols] = useState([])
    useEffect(() => {

        axios.get(`${baseurl}/api/collection/${getCurrentDate('-')}`, config)
            .then(resp => {
                setCols(resp.data)
                console.log(resp.data)

            })
    }, [])
    //
    //


    return (
        <>
            <Header/>
            <Container>

                <Row className='align-items-center'>
                    <Col>
                        <h1>Today, {getCurrentDate('-')}</h1>

                    </Col>
                </Row>
                <Row>

                    <Col className='text-left'>

                        <h3>----------------</h3>
                             <h2>Collection Taken</h2>
                        <br/>


                    </Col>
                </Row>
                <Table

                    style={{padding: "10px 10px 5px 5px", margin: "10px 10px 10px 10px"}}>
                    <thead>
                    <tr>
                        <th>Collection Serial</th>
                        <th>Collection Amount</th>
                        <th>Loan Serial</th>
                        <th>Collection Date</th>
                        <th>Earn</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cols.map((col) => (
                         <tr key={col.id} >
                        <td>{col.id}</td>
                        <td>{parseFloat(col.installmentAmount).toFixed(2)}</td>
                        <td>{col.loan}</td>
                        <td>{col.takenTime}</td>
                        <td>{parseFloat(col.earn).toFixed(2)}</td>
                        <td>
                        </td>
                    </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>


        </>
    )
}

export default CollectToday