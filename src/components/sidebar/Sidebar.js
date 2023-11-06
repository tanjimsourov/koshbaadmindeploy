import "./sidebar.css";
import React from 'react'
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,

} from "@mui/icons-material";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import {Link} from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon"/>
                                Home
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon"/>
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className="sidebarIcon"/>
                            Sales
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon"/>
                                Customers
                            </li>
                        </Link>
                        <Link to="/employees" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon"/>
                                Employees
                            </li>
                        </Link>
                        <Link to="/loans" className="link">
                            <li className="sidebarListItem">
                                <CreditScoreIcon className="sidebarIcon"/>
                                Loan
                            </li>
                        </Link>
                        <Link to="/fdrs" className="link">
                            <li className="sidebarListItem">
                                <CreditScoreIcon className="sidebarIcon"/>
                                FDR
                            </li>
                        </Link>
                        <Link to="/dps" className="link">
                            <li className="sidebarListItem">
                                <CreditScoreIcon className="sidebarIcon"/>
                                DPS
                            </li>
                        </Link>

                        <Link to="/todaycollection" className="link">
                            <li className="sidebarListItem">
                                <CreditScoreIcon className="sidebarIcon"/>
                                Today's Collection
                            </li>
                        </Link>
                        <Link to="/collecttoday" className="link">
                            <li className="sidebarListItem">
                                <CreditScoreIcon className="sidebarIcon"/>
                                Collected Today
                            </li>
                        </Link>
                    </ul>
                </div>


            </div>
        </div>
    );
}