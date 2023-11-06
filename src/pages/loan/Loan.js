import React, {useState} from 'react'
import Header from "../../components/Header";
import '../Employee/staff.css'
import { useSelector} from "react-redux";
import MessageBox from "../../components/MessageBox";
import axios from "axios";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {baseurl} from "../../ApiEndpoint/Api";
import {useParams} from "react-router-dom";
const Loan = () => {
    const  user = useParams()
    const  loaneeID = user.id
    const  loanee = Number(loaneeID);
    const  [la, setLendAmount] = useState();
    const  [rate, setInterest] = useState();
    const  [loanType, setLoanType] = useState('Daily');
    const  [tm, setTime] = useState();
    const  [ti, setTotalInstallment] = useState();
    const  [collectionDay, setCollectionDay] = useState('saturday');

    const lendAmount = Number(la)
    const interest = Number(rate)
    const time = Number(tm)
    const totalInstallment = Number(ti)


        const collectionSelect = (e) => {
        setCollectionDay(e.target.value)
      }
        const handleSelect = (e) => {
        setLoanType(e.target.value)
      }




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
    const data = {loanee, loanType, lendAmount, interest, time, totalInstallment,collectionDay}

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    async function submitHandler() {

        await axios.post(`${baseurl}/api/addloan`, data, config)
            .then(resp => {
                if (resp.status === 201) {
                    setMessage(resp.data.message)
                } else {
                    setError(resp.data.message)
                }

            })
            .catch(error => setError(error.message))

    }

    const submit = () => {

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => submitHandler()
                },
                {
                    label: 'No',
                    //onClick: () => alert('Click No'),

                }
            ]
        });
    }


    return (
        <div>
            <Header/>

            <div style={{padding: "5px 5px 20px 580px", backgroundColor: "#f5f5f5"}}>
                <div className="newLoanee">
                    <h1 className="addLoaneeTitle">Add Loan</h1>

                    <form className="addLoaneeForm">

                        <div className="addLoaneeItem">
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                            {message && <MessageBox variant="success">{message}</MessageBox>}
                        </div>

                        <div className="addLoaneeItem">
                            <label>Loan Type</label>
                            <select
                                defaultValue={loanType}
                                onChange={handleSelect}
                                name="gender" id="gender">
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>

                        <div className="addLoaneeItem">
                            <label>Lend Amount</label>
                            <input type="number" placeholder="2500"
                                   value={la}
                                   onChange={(e) => setLendAmount(e.target.value)}
                            />

                        </div>

                        <div className="addLoaneeItem">
                            <label>Interest</label>
                            <input type="number" placeholder="5.69"
                                   value={rate}
                                   onChange={(e) => setInterest(e.target.value)}
                            />
                        </div>

                        <div className="addLoaneeItem">
                            <label>Time</label>
                            <input type="text" placeholder="Time According Loan Type"
                                   value={tm}
                                   onChange={(e) => setTime(e.target.value)}
                            />
                        </div>

                        <div className="addLoaneeItem">
                            <label>Total Installment</label>
                            <input type="text" placeholder="10"

                                   value={ti}
                                   onChange={(e) => setTotalInstallment(e.target.value)}
                            />

                        </div>

                        <div className="addLoaneeItem">
                            <label>Collection Day</label>
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

                    </form>
                </div>

                <button type="submit" className="addLoaneeButton"
                        onClick={submit}
                >
                    Add Loan
                </button>

            </div>

        </div>
    )
}

export default Loan