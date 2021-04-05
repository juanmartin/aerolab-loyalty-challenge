import React, { useEffect, useState } from 'react'
import Producto from './Producto'
import styled from 'styled-components/macro'
import { Container, Row, Col } from 'react-awesome-styled-grid'


export default function Products() {
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
      <div>Error al buscar productos: {error.message}</div>
    )
  } else if (!isLoaded) {
    return (
      <div>Cargando...</div>
    )
  } else {
    return (
      <>
        <Container>
          <Row>
            {products.map((product) => {
              return (
                <Col xs={4} md={2} >
                  <Producto name={product.name} cost={product.cost} category={product.category} img={product.img} />
                </Col>
              )
            })}
          </Row>
        </Container>
      </>
    )
  }
}