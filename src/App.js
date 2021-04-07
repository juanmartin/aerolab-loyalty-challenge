import logo from './assets/aerolab-logo.svg'
import './App.css';
import styled, { ThemeProvider } from 'styled-components/macro'

import UserStats from './components/UserStats'
import Banner from './components/Banner'
import Content from './components/Content';
import { useEffect, useState } from 'react';


const theme = {
  font: 'Source Sans Pro',
  primary: '#0ad4fa',
  primaryTransparent: 'rgba(10, 212, 250, 0.8)',
  gray: '#616161',
  lightGray: '#a3a3a3',
  backgroundGray: '#f9f9f9',
  borderGray: '#d9d9d9'
}


const Box = styled.div`
  background-color: ${props => props.theme.backgroundGray};
  min-height: 100vh;
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: white;
`


function App() {
  const [user, setUser] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() =>{
    const fetchUser = () => {
      fetch("https://coding-challenge-api.aerolab.co/user/me", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUwZTI1YjdlNzE4NzAwMjBlMzhmOGYiLCJpYXQiOjE2MTU5MTM1NjN9.YmFJ5ctjHwsXStGyY-b5vMg5ZPv_xlrq4qbWRbkMMEA'
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log('RESPUESTA', json)
          setUser(json)
          setIsLoaded(true)
        })
        .catch((err) => {
          console.log('ERROR GET API 2', err)
          setIsLoaded(true)
          setError(err)
        })
    }
    fetchUser()
    console.log('USER:', user)
  },[])
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <TopBar>
          <img src={logo} alt="logo" style={{ width: 40 }} />
          {user && <UserStats name={user.name} points={user.points} />}
          {error && <p>{error.message}</p>}
        </TopBar>
        <Banner />
        <Content />
      </Box>
    </ThemeProvider>
  )
}

export default App;
