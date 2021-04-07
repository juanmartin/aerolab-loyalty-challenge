import React from 'react'
import Producto from './Producto'
import { Row, Col } from 'react-awesome-styled-grid'


export default function Products(props) {
  const { products } = props
  return (
    <Row style={{marginTop: 40, marginBottom: 40}}>
      {
        products.map((product) => {
          return (
            <Col xs={4} sm={4} md={4} lg={3}>
              <Producto _id={product._id} name={product.name} cost={product.cost} category={product.category} img={product.img} />
            </Col>
          )
        })
      }
    </Row>
  )
}
