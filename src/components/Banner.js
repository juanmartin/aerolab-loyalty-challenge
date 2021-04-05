import React from 'react'
import styled from 'styled-components/macro'
import img from '../assets/header-x1.png'


const Box = styled.div`
  width: 100%;
`
const Background = styled.div`
  width: 100%;
  background-image: url(${img});
  background-size: contain;
  height: 412px;

`
const Title = styled.h1`
  font-family: ${props => props.theme.font};
  font-weight: bold;
  font-size: 4em;
  color: white;
  padding: 3em;
  margin: 0;
  position: relative;
  top: 1em;
`

export default function Banner() {
  return (
    <Box>
      <Background>
        <Title>Electronics</Title>
      </Background>
    </Box>
  )
}