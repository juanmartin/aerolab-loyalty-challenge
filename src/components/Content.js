import React, { useEffect, useState } from 'react'
import Products from './Products'
import styled from 'styled-components/macro'
import { Container } from 'react-awesome-styled-grid'
import nextBtn from '../assets/icons/arrow-right.svg'
import backBtn from '../assets/icons/arrow-left.svg'

const StatusContainer = styled.div`
  text-align: center;
  max-width: 70%;
  margin: 0 auto;
  padding-top: 2em;
`
const PaginationSortingBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.borderGray};
  padding-bottom: 2em;
`
const ProductQty = styled.div``
const SortWrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  font-size: 24px;
  color: ${(props) => props.theme.lightGray};

`
const SortButton = styled.button`
  border: none;
  border-radius: 99999px;
  padding: 10px 20px;
  font-size: 24px;
  color: ${(props) => props.theme.lightGray};
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${props => props.theme.primaryTransparent};
  }
  &:active {
    color: white;
    background-color: ${props => props.theme.primary};
  }
`
const PageBtn = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 99999px;
  background-size: cover;
  &:focus {
    outline: none;
  }
  &:hover {
    filter: brightness(0.9);
  }
`
const NextPageBtn = styled(PageBtn)`
  background-image: url(${nextBtn});
`
const PrevPageBtn = styled(PageBtn)`
  background-image: url(${backBtn});
`


export default function Content() {
  const [products, setProducts] = useState([])
  const [paginatedProducts, setPaginatedProducts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageLimit] = useState(16)

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


  useEffect(() => {
    const indexLast = currentPage * pageLimit
    const indexFirst = indexLast - pageLimit
    const productosPaginados = products.slice(indexFirst, indexLast)
    console.log('productosPaginados', productosPaginados)
    setPaginatedProducts(productosPaginados)
  }, [products, currentPage])

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const PageButton = () => {
    if(products.length <= (currentPage * pageLimit)){
      return (
        <PrevPageBtn onClick={prevPage} />
      )
    } else {
      return (
        <NextPageBtn onClick={nextPage} />
      )
    }
  }


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
      <Container>
        <PaginationSortingBox style={{ paddingTop: '4em' }}>
          <SortWrapper>
            {/* <ProductQty>{xx} of {xx} products</ProductQty> */}
            Sort by:
            <SortButton>Most Recent</SortButton>
            <SortButton>Lowest Price</SortButton>
            <SortButton>Highest Price</SortButton>
          </SortWrapper>
          <PageButton />
        </PaginationSortingBox>
        <Products products={paginatedProducts} />
        <PaginationSortingBox>
          {/* <ProductQty>{xx} of {xx} products</ProductQty> | */}
          <PageButton />
        </PaginationSortingBox>
      </Container>
    )
  }
}