import React, { Component, Suspense } from 'react'
import SignIn from './pages/Signin/SignIn'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Start from "./pages/Start";
import Dashboard from "./pages/dashboard/Dashboard";
import Staff from "./pages/Employee/Staff";
import EmployeeList from "./pages/Employee/EmployeeList";
import UserList from "./pages/Customer/UserList";
import Customer from "./pages/Customer/Customer";
import LoanList from "./pages/loan/LoanList";
import Loan from "./pages/loan/Loan";
import SearchUser from "./pages/loan/SearchUser";
import Collection from "./pages/loan/Collection";
import FindUser from "./pages/fdr/FindUser";
import FdrList from "./pages/fdr/FdrList";
import FDR from "./pages/fdr/FDR";
import DpsList from "./pages/dps/DpsList";
import GetUser from "./pages/dps/GetUser";
import DPS from "./pages/dps/DPS";
import TodayCollection from "./pages/loan/TodayCollection";
import CollectToday from "./pages/loan/CollectToday";
import Deposit from "./pages/dps/Deposit";
function App() {

  return (
      <switch>

          <BrowserRouter>
              <Routes>

                  <Route path="/" element={<Start/>}/>
                  <Route path="/dashboard" element={<Dashboard/>}/>
                  <Route path="/signin" element={<SignIn/>}/>
                  <Route path="/addstaff" element={<Staff/>}/>
                  <Route path="/addcustomer" element={<Customer/>}/>
                  <Route path="/employees" element={<EmployeeList/>}/>
                  <Route path="/users" element={<UserList/>}/>
                  <Route path="/addloan/:id"  element={<Loan/>}/>
                  <Route path="/addfdr/:id"  element={<FDR/>}/>
                  <Route path="/adddps/:id"  element={<DPS/>}/>
                  <Route path="/adddeposit/:id"  element={<Deposit/>}/>
                  <Route path="/addcollection/:id"  element={<Collection/>}/>
                  <Route path="/loans" element={<LoanList/>}/>
                  <Route path="/fdrs" element={<FdrList/>}/>
                  <Route path="/dps" element={<DpsList/>}/>
                  <Route path="/todaycollection" element={<TodayCollection/>}/>
                  <Route path="/collecttoday" element={<CollectToday/>}/>
                  <Route path="/searchuser" element={<SearchUser/>}/>
                  <Route path="/finduser" element={<FindUser/>}/>
                  <Route path="/getuser" element={<GetUser/>}/>

              </Routes>
          </BrowserRouter>

      </switch>
  );
}

export default App;
