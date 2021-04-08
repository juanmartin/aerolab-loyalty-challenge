import logo from './assets/aerolab-logo.svg'
import './App.css';
import styled, { ThemeProvider } from 'styled-components/macro'

import UserStats from './components/UserStats'
import Banner from './components/Banner'
import Content from './components/Content';
import { useEffect, useState } from 'react';
import UserContext from './Context/UserContext'


const theme = {
  font: 'Source Sans Pro',
  primary: '#0ad4fa',
  primaryTransparent: 'rgba(10, 212, 250, 0.8)',
  gray: '#616161',
  grayTransparent: 'rgba(97, 97, 97, 0.8)',
  lightGray: '#a3a3a3',
  lightGrayTransparent: 'rgba(97, 97, 97, 0.4)',
  lightestGray: '#ededed',
  backgroundGray: '#f9f9f9',
  borderGray: '#d9d9d9',
  success: 'rgba(0, 250, 60, 0.6)',
  error: 'rgba(255, 0, 0, 0.6)'
}


const Box = styled.div`
  background-color: ${props => props.theme.backgroundGray};
  min-height: 100vh;
  padding-bottom: 3em;
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

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    console.log('user:', user)
  }, [user])

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <UserContext.Provider value={{ user, setUser }}>
          <TopBar>
            <img src={logo} alt="logo" style={{ width: 40 }} />
            {!isLoaded && <p>Loading User Stats...</p>}
            {user && <UserStats name={user.name} points={user.points} />}
            {error && <p>{error.message}</p>}
          </TopBar>
          <Banner />
          <Content />
        </UserContext.Provider>
      </Box>
    </ThemeProvider>
  )
}

export default App;
