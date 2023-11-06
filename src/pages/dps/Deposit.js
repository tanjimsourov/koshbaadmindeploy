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
const Deposit = () => {
    const  Loan = useParams()
    const  LoanID = Loan.id
    const  [ia, setInstallamount] = useState();

    const  dps = Number(LoanID);
    const transactionAmount = Number(ia)
    const transactiontype="deposit"

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
    const data = {dps,transactionAmount,transactiontype}

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    async function submitHandler() {
        await axios.post(`${baseurl}/api/deposit`, data, config)
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
                    <h1 className="addLoaneeTitle">Create Deposit</h1>

                    <form className="addLoaneeForm">

                        <div className="addLoaneeItem">
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                            {message && <MessageBox variant="success">{message}</MessageBox>}
                        </div>
                        <div className="addLoaneeItem">
                            <label> Amount</label>
                            <input type="number" placeholder="500"
                                   value={ia}
                                   onChange={(e) => setInstallamount(e.target.value)}
                            />

                        </div>
                    </form>
                </div>

                <button type="submit" className="addLoaneeButton"
                        onClick={submit}
                >
                    Add Deposit
                </button>

            </div>

        </div>
    )
}

export default Deposit