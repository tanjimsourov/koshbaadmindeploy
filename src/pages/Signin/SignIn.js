import React, {useEffect, useState} from 'react'
import Header from '../../components/Header'
import {Link} from 'react-router-dom';
import './signin.css'
import {useDispatch, useSelector} from "react-redux";
import {signin} from "../../actions/userAction";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

const SignIn = () => {

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userSignin = useSelector((state) => state.userSignin)
    const {loading, error, userInfo} = userSignin

    const submitHandler = (e) => {

        console.log(phone)
        console.log(password)
        e.preventDefault()
        dispatch(signin(phone, password))

    }

    return (
        <div>
            <Header/>
            <div className='justify-container'>

                <div className='sign-in1'>
          <span className='sign-in2'>
            <div className='form'>
              <span>
                Sign In
              </span>
              <div className='form-inputs'>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

                  <label className='form-label'> Phone </label>
                <input
                    className='form-input'
                    type='phone'
                    name='phone'
                    placeholder='Enter your register Phone Number'

                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className='form-inputs'>

                <label className='form-label'> Password </label>

                <input
                    className='form-input'
                    type='password'
                    name='password'
                    placeholder='Password'

                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
             <Link to='/dashboard'>
                <button className='form-input-btn' type='submit'
                        onClick={submitHandler}
                >Sign in </button>
             </Link>
              <span className='form-input-login'>
                Forgotten Password ? Click < Link to='/resetpw'> here </Link>
              </span>

            </div>
          </span>
                </div>
            </div>
        </div>
    )
}

export default SignIn