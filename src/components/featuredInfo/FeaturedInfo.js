import "./featuredInfo.css";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux'
import {getCurrentDate} from "./getCurrentDate";
import {baseurl} from "../../ApiEndpoint/Api";
export default function FeaturedInfo() {
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
    //
    const [earn, setEarn] = useState(0)
    const [loan, setLoan] = useState(0)
    const [collection, setCol] = useState(0)
    const [error, setError] = useState('')
    const [today, setDate] = useState('')



    async function see() {

        await axios.get(`${baseurl}/api/totalearn`, config)
            .then(resp =>
                {
                setEarn(resp.data.totalEarn)
                console.log(resp.data)
                    console.log(earn)
            }
            )
            .catch(error => setError(error.message))

    }


    async function seeTotalLoan() {

        await axios.get(`${baseurl}/api/totalloan`, config)
            .then(resp =>
                {
                setLoan(resp.data.totalLoan)
                console.log(resp.data)
                    console.log(earn)
            }
            )
            .catch(error => setError(error.message))

    }

    async function seeTodayCollection() {
        setDate(getCurrentDate())
        await axios.get(`${baseurl}/api/collecttoday/${today}`, config)
            .then(resp =>
                {
                setCol(resp.data)

            }
            )
            .catch(error => setError(error.message))

    }
        console.log(getCurrentDate())

  return (
    <div className="featured">

      <div className="featuredItem">
        <span className="featuredTitle">Total Collection Today</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{parseFloat(collection.installmentAmount__sum).toFixed(2)} TK</span>
        </div>
          <button type="submit" className="addLoaneeButton"
                        onClick={seeTodayCollection}>
                   See
          </button>
      </div>
        <div className="featuredItem">
        <span className="featuredTitle">Total Earn</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{parseFloat(earn.earn__sum).toFixed(2)}  TK</span>
        </div>
                  <button type="submit" className="addLoaneeButton"
                        onClick={see}
                >
                   See
                </button>

        </div>

        <div className="featuredItem">
        <span className="featuredTitle">Total Given Loan</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{loan.id__count}</span>
        </div>

            <button type="submit" className="addLoaneeButton"
                        onClick={seeTotalLoan}
                >
                   See
                </button>
      </div>
        

    </div>
  );
}