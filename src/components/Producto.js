import React from 'react'
import styled from "styled-components/macro"


const Box = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  /* width: 5em; */
`
const Overlay = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  ${Box}:hover & {
    display: block;
    /* background-color: linear-gradient(-180deg, #0ad4fa 0%, #25bbf1 100%); */
    background-color: ${props => props.theme.primary};
    opacity: 0.5;
    mix-blend-mode: multiply;
  }
`

const ProdImg = styled.img`
  border-bottom: 1px solid #CCC;
`

export default function Producto(props) {
  const { name, cost, img, category } = props

  return (
    <Box>
      <Overlay>
        {cost}
      </Overlay>
      <ProdImg src={img.url} />
      {category}
      {name}
    </Box>
  )
}