import React, {useState} from 'react'
import Header from "../../components/Header";
import './customer.css'
import { useSelector} from "react-redux";
import MessageBox from "../../components/MessageBox";
import axios from "axios";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {baseurl} from "../../ApiEndpoint/Api";

const Customer = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('male');
    const [nidNumber, setNidnumber] = useState('');
    const [somiti_type, setSomititype] = useState('');
    const [profilePic, setProfilepic] = useState('')
    const [nidPic, setNidpic] = useState('')
    const [is_active, setIsActive] = useState(false);
    const [is_verified, setIsVerified] = useState(false);
    const [is_general, setIsGeneral] = useState(false);
    const activeChange = () => {
        setIsActive(current => !current)
    };
    const generalChange = () => {
        setIsGeneral(current => !current)
    };

    const handleSelect = (e) => {
        setGender(e.target.value)
      }
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
    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullName", fullname);
    formData.append("profilePic", profilePic);
    formData.append("nidPic", nidPic);
    formData.append("nidNumber", nidNumber);
    formData.append("gender", gender);
    formData.append("somiti_type", somiti_type);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("is_general", is_general);
    formData.append("is_active", is_active);
    formData.append("is_verified", is_verified);

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    async function submitHandler() {

        await axios.post(`${baseurl}/api/addcustomer`, formData, config)
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
                    <h1 className="addLoaneeTitle">Add Customer</h1>

                    <form className="addLoaneeForm">

                        <div className="addLoaneeItem">
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                            {message && <MessageBox variant="success">{message}</MessageBox>}
                            <label>Username</label>
                            <input type="text" placeholder="Enter username"
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)}
                            />

                        </div>

                        <div className="addLoaneeItem">
                            <label>Full Name</label>
                            <input type="text" placeholder="Enter full name"
                                   value={fullname}
                                   onChange={(e) => setFullname(e.target.value)}
                            />

                        </div>
                        <div className="addLoaneeItem">
                            <label>Profile Picture</label>

                            <input type="file"
                                onChange={(e) => setProfilepic(e.target.files[0])}
                            >
                            </input>


                        </div>
                        <div className="addLoaneeItem">
                            <label>NID Picture</label>

                            <input type="file"
                                onChange={(e) => setNidpic(e.target.files[0])}
                            >
                            </input>
                        </div>
                        <div className="addLoaneeItem">
                            <label>Nid Number</label>
                            <input type="text" placeholder="nid number"
                                   value={nidNumber}
                                   onChange={(e) => setNidnumber(e.target.value)}
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
                            <label>Somiti Type</label>
                            <input type="text" placeholder="Enter Somiti Type"
                                   value={somiti_type}
                                   onChange={(e) => setSomititype(e.target.value)}
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
                                    value={is_general}
                                    onChange={generalChange}
                                />
                                General

                            </div>

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
                    Add Customer
                </button>

            </div>

        </div>
    )
}

export default Customer