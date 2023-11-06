import React, {useState} from 'react'
import Header from '../../components/Header'
import { Container } from 'react-bootstrap'
import { Row, Col} from 'react-bootstrap'
import MessageBox from "../../components/MessageBox";
import axios from "axios";
import {baseurl} from "../../ApiEndpoint/Api";
import {useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
const GetUser = () => {


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
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const data = username
    async function submitHandler() {
        console.log(config)
        await axios.get(`${baseurl}/api/getuser/${username}`, config)
            .then(resp => {
                if (resp.status === 200) {
                    setMessage(resp.data)
                    console.log(resp.data)
                    console.log(resp.data.profilePic)
                } else {
                    setError(resp.data.message)
                }

            })
            .catch(error => setError(error.message))
    }

  return (
        <div>
            <Container>

              <Header/>

              <div className="featured">

                <div className="featuredItem">
                    <span className="featuredTitle">
                        <h3>Search For Individual Customer</h3>
                        </span>
                 <div className="featuredMoneyContainer">
            <div className="addLoaneeItem">
                 <input
                    type='text'
                    name='username'
                    placeholder='Enter Username(Case-sensitive)'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

                    </div>

                    <button type="submit" className="addLoaneeButton"

                             onClick={submitHandler}
                        >
                    Search
                    </button>
                    </div>
                    </div>
                {error && <MessageBox variant="danger">Profile Not Found</MessageBox>}
                {message && <div>
                    {
                    <div className="user">
                        <div className="userTitleContainer">

                    <h1 className="userUpdateTitle">User Details</h1>
                    </div>

                    <Row>
                    <div className="userContainer">
                    <div className="userShow">

                        <Col>
                        <div className="userShowTop">
                            <img
                                src={`${baseurl}+${message.profilePic}`}
                                alt=""
                                className="userShowImg"
                                height={"300px"}
                                width={"300px"}
                            />
                        </div>
                        </Col>
                        <Col>
                                <h3>Full Name : {message.fullName}</h3>
                        </Col>
                        <Col>
                                <h4>Contact: {message.phone}</h4>
                        </Col>
                    <LinkContainer to={`/adddps/${message.id}`}>
                        <button type="submit" className="addLoaneeButton"
                        >
                      Conitnue
                    </button>
                    </LinkContainer>
                    </div>
                    </div>
                    </Row>

                    </div>
                    }
                </div>}

            </Container>




        </div>
  )
}

export default GetUser