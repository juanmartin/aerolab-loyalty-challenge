import React from 'react'
import styled from "styled-components/macro"
import coin from "../assets/icons/coin.svg"
import buyBlue from "../assets/icons/buy-blue.svg"
import buyWhite from "../assets/icons/buy-white.svg"


const Box = styled.div`
  height: 276px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.10);
  transition: transform .125s;
  &:hover {
    box-shadow: 5px 5px 20px 0 rgba(0,0,0,0.40);
    transform: translate(0, -3px);
  }
  &:active {
    transform: translate(0, 2px);
  }
`
const Overlay = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  ${Box}:hover & {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.primaryTransparent};
    mix-blend-mode: normal;
  }
`
const ProdImg = styled.img`
  border-bottom: 1px solid #CCC;
`
const BuyImg = styled.img`
  width: 42px;
  position: absolute;
  top: 10px;
  right: 10px;
`
const Button = styled.button`
  position: relative;
  background-color: white;
  border-radius: 99999px;
  border-style: none;
  margin: 10px;
  padding: 10px;
  padding-left: 70px;
  padding-right: 70px;
  color: ${(props) => props.theme.gray};
  font-size: 1em;
`
const Cost = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  line-height: 0.15em;
`
const CategoryText = styled.p`
  color: ${(props) => props.theme.lightGray};
  align-self: flex-start;
  margin-left: 2.5em;
  margin-bottom: 0;
`
const NameText = styled.p`
  color: ${(props) => props.theme.gray};
  align-self: flex-start;
  margin-left: 2.5em;
  margin-top: 3px;
`


export default function Producto(props) {
  const { name, cost, img, category } = props

  return (
    <Box>
      <BuyImg src={buyBlue} alt="Redeem" />
      <ProdImg src={img.url} />
      <CategoryText>{category}</CategoryText>
      <NameText>{name}</NameText>
      <Overlay>
        {/* Hack para que el BuyImg coincida, pues los assets son de diferentes sizes */}
        <BuyImg src={buyWhite} alt="Redeem" style={{ width: 50, right: 4, top: 8 }} />
        <Cost>
          <h1 style={{ color: 'white', fontWeight: 'normal' }}>{cost}</h1>
          <img src={coin} alt="Monedas" />
        </Cost>
        <Button>Redeem now</Button>
      </Overlay>
    </Box>
  )
}