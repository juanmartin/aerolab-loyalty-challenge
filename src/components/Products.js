import React from 'react'
import Producto from './Producto'
import { Container, Row, Col } from 'react-awesome-styled-grid'


export default function Products(props) {
  const { products } = props
  return (
    <Container>
      <Row>
        {products.map((product) => {
          return (
            <Col xs={4} sm={4} md={4} lg={3}>
              <Producto name={product.name} cost={product.cost} category={product.category} img={product.img} />
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}
