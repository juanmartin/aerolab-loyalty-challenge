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
  padding: 10px 30px;
  background-color: white;
`
const Footer = styled.div`
  padding-top: 2em;
  text-align: center;
  color: ${props => props.theme.lightGray} ;
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
          'Authorization': `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`
        }
      })
        .then(res => res.json())
        .then(json => {
          setUser(json)
          setIsLoaded(true)
        })
        .catch((err) => {
          console.log('Error fetching user data.', err)
          setIsLoaded(true)
          setError(err)
        })
    }
    fetchUser()
  }, [])


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
        <Footer>
          Made with ♥ and <span style={{ fontFamily: 'monospace' }}>{`</>`}</span> by <a href="https://juanm.art/" target="_blank" rel="noreferrer" style={{ color: '#909090'}}>juanm.art/in</a>
        </Footer>
      </Box>
    </ThemeProvider>
  )
}

export default App;
