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
const DPS = () => {
    const  user = useParams()
    const  loaneeID = user.id
    const  accountHolder = Number(loaneeID);
    const  [dpsType, setLoanType] = useState('Daily');
    const  [ab, setAB] = useState();
    const accountBalance = Number(ab)

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
    const data = {accountHolder, dpsType, accountBalance }

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    async function submitHandler() {

        await axios.post(`${baseurl}/api/adddps`, data, config)
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
                    <h1 className="addLoaneeTitle">Add DPS</h1>

                    <form className="addLoaneeForm">

                        <div className="addLoaneeItem">
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                            {message && <MessageBox variant="success">{message}</MessageBox>}
                        </div>

                        <div className="addLoaneeItem">
                            <label>DPS Type</label>
                            <select
                                defaultValue={dpsType}
                                onChange={handleSelect}
                                name="gender" id="gender">
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>

                        <div className="addLoaneeItem">
                            <label>Account Balance</label>
                            <input type="text" placeholder="10000"
                                   value={ab}
                                   onChange={(e) => setAB(e.target.value)}
                            />
                        </div>


                    </form>
                </div>

                <button type="submit" className="addLoaneeButton"
                        onClick={submit}
                >
                    Add DPS
                </button>

            </div>

        </div>
    )
}

export default DPS