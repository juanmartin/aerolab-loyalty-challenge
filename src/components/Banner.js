import React from 'react'
import { Container } from 'react-awesome-styled-grid'
import styled from 'styled-components/macro'
import img from '../assets/header-x1.png'


const Box = styled.div`
  width: 100%;
`
const Background = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 412px;
  background-image: url(${img});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #15DBFF;
  background-position-x: right;
  @media (min-width: 1253px) {
    background-size: contain;
    background-position: right;
  }
  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`
const Title = styled.h1`
  font-family: ${props => props.theme.font};
  font-weight: bold;
  font-size: 4em;
  color: white;
  margin: 0;
  position: absolute;
  bottom: 1em;
  @media (max-width: 768px) {
    position: initial;
    text-align: center;
  }
`

export default function Banner() {
  return (
    <Box>
      <Background>
        <Container>
          <Title>Electronics</Title>
        </Container>
      </Background>
    </Box>
  )
}