import React, { useContext, useEffect } from "react"
import Producto from "./Producto"
import { Row, Col } from "react-awesome-styled-grid"
import UserContext from "../Context/UserContext"


export default function Products(props) {
  const { user } = useContext(UserContext)
  const { products } = props

  const isRedeemed = (id) => {
    const result = user?.redeemHistory.some((e) => e.productId === id)
    return result
  }
  const canBeRedeemed = (id, cost) => {
    const result = (user?.points > cost) ? true : false
    return (result && !isRedeemed(id))
  }

  useEffect(() => {

  }, [user])

  return (
    <Row style={{ marginBottom: 40, marginTop: 40 }}>
      {products.map((product) => {
        const redeemed = isRedeemed(product._id)
        const redemeable = canBeRedeemed(product._id, product.cost)
        return (
          <Col key={product._id} xs={4} sm={4} md={4} lg={3}>
            <Producto
              _id={product._id}
              name={product.name}
              cost={product.cost}
              category={product.category}
              img={product.img}
              redeemed={redeemed}
              canBeRedeemed={redemeable}
            />
          </Col>
        )
      })}
    </Row>
  )
}
