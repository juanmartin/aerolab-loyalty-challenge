import logo from './assets/aerolab-logo.svg'
import './App.css';
import styled, { ThemeProvider } from 'styled-components/macro'

import UserStats from './components/UserStats'
import Banner from './components/Banner'
import Content from './components/Content';


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
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <TopBar>
          <img src={logo} alt="logo" style={{ width: 40 }} />
          <UserStats />
        </TopBar>
        <Banner />
        <Content />
      </Box>
    </ThemeProvider>
  )
}

export default App;
