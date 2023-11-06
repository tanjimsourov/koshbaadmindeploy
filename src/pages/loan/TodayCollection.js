import React, {useState} from 'react'
import Header from '../../components/Header'
import {Button, Container, Table} from 'react-bootstrap'
import { Row, Col} from 'react-bootstrap'
import MessageBox from "../../components/MessageBox";
import axios from "axios";
import {baseurl} from "../../ApiEndpoint/Api";
import {useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
const TodayCollection = () => {

    const  [collectionDay, setCollectionDay] = useState('saturday');
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
    const [loans, setLoans] = useState([])
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const collectionSelect = (e) => {
        setCollectionDay(e.target.value)
      }
    async function submitHandler() {
        console.log(config)
        await axios.get(`${baseurl}/api/todaycol/${collectionDay}`, config)
            .then(resp => {
                if (resp.status === 200) {
                    setMessage(resp.data)
                    setLoans(resp.data)
                    console.log(resp.data)
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
                        <h3>Search For Today's collection </h3>
                        </span>
                 <div className="featuredMoneyContainer">
            <div className="addLoaneeItem">
                            <label>Select Today's Day</label>
                            <select
                                defaultValue={collectionDay}
                                onChange={collectionSelect}
                                name="gender" id="gender">
                                <option value="saturday">Saturday</option>
                                <option value="sunday">Sunday</option>
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                            </select>
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
                    }
                </div>}

            </Container>




        </div>
  )
}

export default TodayCollection