import React, {useState} from 'react'
import Header from "../../components/Header";
import './staff.css'
import { useSelector} from "react-redux";
import MessageBox from "../../components/MessageBox";
import axios from "axios";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {baseurl} from "../../ApiEndpoint/Api";

const Staff = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('male');
    const [password, setPassword] = useState('');
    const [nidNumber, setNidnumber] = useState('');
    const [is_active, setIsActive] = useState(false);
    const [is_admin, setIsAdmin] = useState(false);
    const [is_staff, setIsStaff] = useState(false);
    const [is_verified, setIsVerified] = useState(false);
        const handleSelect = (e) => {
        setGender(e.target.value)
      }

    const activeChange = () => {
        setIsActive(current => !current)
    };
    const adminChange = () => {
        setIsAdmin(current => !current)
    };
    const staffChange = () => {
        setIsStaff(current => !current)
    };
    const verifyChange = () => {
        setIsVerified(current => !current)
    };

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
    const data = {username, email, phone,gender,nidNumber , password, is_active, is_admin, is_staff, is_verified}

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    async function submitHandler() {

        await axios.post(`${baseurl}/api/addstuff`, data, config)
            .then(resp => {
                if (resp.status === 201) {
                    setMessage(resp.data.message)
                } else {
                    setError(resp.data.message)
                }

            })
            .catch(error => setError(error.message))

        setUsername('')
        setEmail('')
        setPhone('')
        setPassword('')
        setIsActive(false)
        setIsAdmin(false)
        setIsStaff(false)
        setIsVerified(false)
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
                    <h1 className="addLoaneeTitle">Add Employee</h1>

                    <form className="addLoaneeForm">

                        <div className="addLoaneeItem">
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                            {message && <MessageBox variant="success">{message}</MessageBox>}
                            <label>Username</label>
                            <input type="text" placeholder="username"
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)}
                            />

                        </div>

                        <div className="addLoaneeItem">
                            <label>Email</label>
                            <input type="text" placeholder="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>
                        <div className="addLoaneeItem">
                            <label>Gender</label>
                            <select
                                defaultValue={gender}
                                onChange={handleSelect}
                                name="gender" id="gender">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="addLoaneeItem">
                            <label>Nid Number</label>
                            <input type="text" placeholder="nid number"
                                   value={nidNumber}
                                   onChange={(e) => setNidnumber(e.target.value)}
                            />
                        </div>

                        <div className="addLoaneeItem">
                            <label>Password</label>
                            <input type="text" placeholder="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>

                        <div className="addLoaneeItem">
                            <label>Contact</label>
                            <input type="text" placeholder="01625525869"

                                   value={phone}
                                   onChange={(e) => setPhone(e.target.value)}
                            />

                        </div>

                        <div className="addLoaneeItem">
                            <div className={"topping"}>
                                <input
                                    type="checkbox"
                                    defaultChecked={false}
                                    value={is_active}
                                    onChange={activeChange}
                                />
                                Active

                            </div>

                        </div>
                        <div className="addLoaneeItem">
                            <div className={"topping"}>
                                <input
                                    type="checkbox"
                                    defaultChecked={false}
                                    value={is_admin}
                                    onChange={adminChange}
                                />
                                Admin

                            </div>

                        </div>
                        <div className="addLoaneeItem">
                            <div className={"topping"}>
                                <input
                                    type="checkbox"
                                    defaultChecked={false}
                                    value={is_staff}
                                    onChange={staffChange}
                                />
                                Staff

                            </div>

                        </div>
                        <div className="addLoaneeItem">
                            <div className={"topping"}>
                                <input
                                    type="checkbox"
                                    defaultChecked={false}
                                    value={is_verified}
                                    onChange={verifyChange}
                                />
                                Verified

                            </div>

                        </div>

                    </form>
                </div>

                <button type="submit" className="addLoaneeButton"
                        onClick={submit}
                >
                    Add Employee
                </button>

            </div>

        </div>
    )
}

export default Staff