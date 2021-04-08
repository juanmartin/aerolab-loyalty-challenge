import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components/macro"

import coin from "../assets/icons/coin.svg"
import buyBlue from "../assets/icons/buy-blue.svg"
import buyWhite from "../assets/icons/buy-white.svg"

import UserContext from "../Context/UserContext"

const Box = styled.div`
  height: 276px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 15%;
  background-color: white;
  box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.10);
  transition: transform .125s;
  &:hover {
    box-shadow: 5px 5px 20px 0 rgba(0,0,0,0.40);
    transform: translate(0, -3px);
  }
  &:active {
    transform: translate(0);
    animation: ${props => props.canBeRedeemed ? "none" : "nudge 0.125s normal"};
  }
  @keyframes nudge {
    0% { transform: translate(0) }
    50% { transform: translateX(5px) }
    100% { transform: translateX(-5px) }
  }
`
const Overlay = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.redeemed ? props.theme.success : (props.canBeRedeemed ? props.theme.primaryTransparent : props.theme.lightGrayTransparent)};
  ${Box}:hover & {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    mix-blend-mode: normal;
  }
`
const ProdImg = styled.img`
  height: 182px;
  object-fit: none;
`
const Separator = styled.hr`
  width: 100%;
  margin: 0;
  padding: 0;
  border-top: 1px solid ${props => props.theme.lightestGray};
`
const BuyImg = styled.img`
  width: 42px;
  position: absolute;
  top: 10px;
  right: 10px;
`
const Button = styled.button`
  position: relative;
  background-color: ${props => props.disabled ? props.theme.lightestGray : 'white'};
  border-radius: 99999px;
  border-style: none;
  margin: 10px;
  padding: 10px;
  padding-left: 70px;
  padding-right: 70px;
  color: ${(props) => props.disabled ? props.theme.lightGray : props.theme.gray};
  font-size: 1em;
  &:focus {
    outline: none;
  }
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
  margin-bottom: 0;
`
const NameText = styled.p`
  color: ${(props) => props.theme.gray};
  align-self: flex-start;
  margin-top: 3px;
`
const NotEnoughMoneyBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 10px;
  right: 10px;
  gap: 5px;
  padding: 10px 10px;
  border-radius: 99999px;
  background-color: ${(props) => props.theme.grayTransparent};
`

export default function Producto(props) {
  const { _id, name, cost, img, category, redeemed, canBeRedeemed } = props
  const { user, setUser } = useContext(UserContext)
  const [currentlyRedeemed, setCurrentlyRedeemed] = useState(redeemed)
  const [currentlyCanBeRedeemed, setCurrentlyCanBeRedeemed] = useState(canBeRedeemed)

  useEffect(() => {
    if ((!currentlyRedeemed) && (user?.points < cost)) {
      setCurrentlyCanBeRedeemed(false)
    }
  }, [user, currentlyRedeemed])

  const redeem = (id, cost) => {
    fetch("https://coding-challenge-api.aerolab.co/redeem", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUwZTI1YjdlNzE4NzAwMjBlMzhmOGYiLCJpYXQiOjE2MTU5MTM1NjN9.YmFJ5ctjHwsXStGyY-b5vMg5ZPv_xlrq4qbWRbkMMEA'
      },
      body: JSON.stringify({ productId: id })
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          console.log('error redeeming', json.error)
        } else {
          console.log('Redeemed:', json)
          setUser({ ...user, points: user.points - cost })
        }
      })
      .catch((err) => {
        console.log('ERROR REDEEM', err)
      })

    setCurrentlyRedeemed(true)
    setCurrentlyCanBeRedeemed(false)
  }

  const BuyIcon = (props) => {
    if ((!currentlyRedeemed) && (user?.points < cost)) {
      return (
        <NotEnoughMoneyBox>
          <p style={{ color: 'white', margin: 0 }}>You need {cost - user.points}</p>
          <img src={coin} alt="Coins" style={{ width: 25 }} />
        </NotEnoughMoneyBox>
      )
    } else {
      if (props.color === "blue") {
        return <BuyImg src={buyBlue} alt="Redeem" />
      } else {
        // Style hack para que el BuyImg coincida, pues los assets son de diferentes sizes
        return <BuyImg src={buyWhite} alt="Redeem" style={{ width: 50, right: 4, top: 8 }} />
      }
    }
  }


  return (
    <Box canBeRedeemed={currentlyCanBeRedeemed}>
      <BuyIcon color={"blue"} />
      <ProdImg src={img.url} />
      <Separator />
      <CategoryText>{category}</CategoryText>
      <NameText>{name}</NameText>
      <Overlay redeemed={currentlyRedeemed} canBeRedeemed={currentlyCanBeRedeemed}>
        <BuyIcon color={"white"} />
        <Cost>
          <h1 style={{ color: 'white', fontWeight: 'normal' }}>{cost}</h1>
          <img src={coin} alt="Coins" />
        </Cost>
        <Button
          disabled={!currentlyCanBeRedeemed}
          onClick={() => redeem(_id, cost)}
        >
          {currentlyCanBeRedeemed ? 'Redeem now' : (currentlyRedeemed ? 'Redeemed!' : 'Not enough coins!')}
        </Button>
      </Overlay>
    </Box>
  )
}