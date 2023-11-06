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
const FDR = () => {
    const  user = useParams()
    const  loaneeID = user.id
    const  fdrowner = Number(loaneeID);
    const  [la, setLendAmount] = useState();
    const  [rate, setInterest] = useState();
    const  [tm, setTime] = useState();
    const balance = Number(la)
    const interest = Number(rate)
    const fdr_time = Number(tm)


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
    const data = {fdrowner, balance, interest, fdr_time}

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    async function submitHandler() {
        console.log(data)
        await axios.post(`${baseurl}/api/addfdr`, data, config)
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
                    <h1 className="addLoaneeTitle">Add FDR</h1>

                    <form className="addLoaneeForm">

                        <div className="addLoaneeItem">
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                            {message && <MessageBox variant="success">{message}</MessageBox>}
                        </div>

                        <div className="addLoaneeItem">
                            <label>FDR Amount</label>
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
                            <input type="text" placeholder="Time in Month"
                                   value={tm}
                                   onChange={(e) => setTime(e.target.value)}
                            />
                        </div>


                    </form>
                </div>

                <button type="submit" className="addLoaneeButton"
                        onClick={submit}
                >
                    Add FDR
                </button>

            </div>

        </div>
    )
}

export default FDR