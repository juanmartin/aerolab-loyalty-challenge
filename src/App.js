import logo from './assets/aerolab-logo.svg'
import './App.css';
import styled, { ThemeProvider } from 'styled-components/macro'

import UserStats from './components/UserStats'
import Banner from './components/Banner'
import Products from './components/Products';


const theme = {
  font: 'Source Sans Pro',
  primary: '#0ad4fa'
}

const Box = styled.div`
  /* padding: 30px; */
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
  margin-right: 30px;
`

const ProductsWrapper = styled.div`
  margin: 3%;
`


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <TopBar>
          <img src={logo} alt="logo" style={{width: 40}}/>
          <UserStats />
        </TopBar>
        <Banner />
        <ProductsWrapper>
          <Products />
          {/* <ProductOptions>
          <ProductQty>{xx} of {xx} products</ProductQty> |
          Sort by:
        <SortButton>Most Recent</SortButton>
          <SortButton>Lowest Price</SortButton>
          <SortButton>Highest Price</SortButton>
          <NextPageBtn />
        </ProductOptions>
        <Products />
        <ProductOptions>
          <ProductQty>{xx} of {xx} products</ProductQty> |
          <NextPageBtn />
        </ProductOptions> */}
        </ProductsWrapper>
      </Box>
    </ThemeProvider>
  )
}

export default App;
