import React from 'react'
import Header from "../components/Header";
import {Container} from "react-bootstrap";
import theme from '../theme.jpg'
const Start = () => {
  return (
    <div>
       <Header/>
        <Container>
            <img src={theme} height='100%' width='100%' />
        </Container>

    </div>
  )
}

export default Start