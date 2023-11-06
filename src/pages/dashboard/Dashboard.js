import React from 'react'
import Header from "../../components/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import {  useSelector } from 'react-redux'
import Home from "../home/Home";
import './dashboard.css'
function Dashboard(history) {
  const userLogin = useSelector((state) => state.userSignin)
  const { userInfo } = userLogin
  if (!userInfo ) {
    document.location.href = '/'
  }
 console.log(userInfo.token)
  return (

    <div>
      <Header />
      <div className='side'>
        <Sidebar />
        <div className='home'>

          <Home />
        </div>

      </div>



    </div>
  )
}

export default Dashboard
