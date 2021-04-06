import React, { useEffect, useState } from 'react'
import Products from './Products'
import styled from 'styled-components/macro'


const StatusContainer = styled.div`
  text-align: center;
  max-width: 70%;
  margin: 0 auto;
  padding-top: 2em;
`

export default function ProductsWrapper() {
  const [products, setProducts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProds = () => {
      fetch("https://coding-challenge-api.aerolab.co/products", {
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
          setProducts(json)
          setIsLoaded(true)
        })
        .catch((err) => {
          console.log('ERROR GET API 2', err)
          setIsLoaded(true)
          setError(err)
        })
    }
    fetchProds()
  }, [])

  if (error) {
    return (
      <StatusContainer>Error al buscar productos: {error.message}</StatusContainer>
    )
  } else if (!isLoaded) {
    return (
      <StatusContainer>Cargando...</StatusContainer>
    )
  } else {
    return (
      <div style={{ paddingTop: '2em' }}>
        <Products products={products} />
      </div>
    )
  }
}