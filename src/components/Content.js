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
  margin-bottom: 2em;
`
const ProductQty = styled.div`
  padding-right: 30px;
  color: ${props => props.theme.gray};
  border-right: 1px solid ${props => props.theme.borderGray};
`
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
  color: ${(props) => props.active ? 'white' : props.theme.gray};
  background-color: ${(props) => props.active ? props.theme.primary : props.theme.lightestGray};
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${props => props.theme.primaryTransparent};
    color: white;
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

const sorting = ['Most Recent', 'Lowest Price', 'Highest Price']

export default function Content() {
  const [products, setProducts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [sortedProducts, setSortedProducts] = useState([])
  const [paginatedProducts, setPaginatedProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageLimit] = useState(16)
  const [activeSorting, setActiveSorting] = useState(sorting[0])

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
    setSortedProducts(products)
  }, [products])

  useEffect(() => {
    const indexLast = currentPage * pageLimit
    const indexFirst = indexLast - pageLimit
    const productosPaginados = sortedProducts.slice(indexFirst, indexLast)
    console.log('productosPaginados', productosPaginados)
    setPaginatedProducts(productosPaginados)
  }, [sortedProducts, currentPage])


  const sortMostRecent = () => {
    setSortedProducts(products)
    setActiveSorting(sorting[0])
  }
  const sortPrice = (order) => {
    // order true for lowest price, else highest
    const sortedProds = [...products]
    if (order) {
      sortedProds.sort((a, b) => (a.cost > b.cost) ? 1 : -1)
      setActiveSorting(sorting[1])
    } else {
      sortedProds.sort((a, b) => (a.cost <= b.cost) ? 1 : -1)
      setActiveSorting(sorting[2])
    }
    setSortedProducts(sortedProds)
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }
  const PageButton = () => {
    if (products.length <= (currentPage * pageLimit)) {
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
            <ProductQty>{pageLimit} of {products.length} products</ProductQty>
            Sort by:
            <SortButton active={activeSorting === sorting[0]} onClick={sortMostRecent}>Most Recent</SortButton>
            <SortButton active={activeSorting === sorting[1]} onClick={() => sortPrice(true)}>Lowest Price</SortButton>
            <SortButton active={activeSorting === sorting[2]} onClick={() => sortPrice(false)}>Highest Price</SortButton>
          </SortWrapper>
          <PageButton />
        </PaginationSortingBox>
        <Products products={paginatedProducts} />
        <PaginationSortingBox>
          <SortWrapper>
            <ProductQty style={{border: 'none'}}>{pageLimit} of {products.length} products</ProductQty>
          </SortWrapper>
          <PageButton />
        </PaginationSortingBox>
      </Container>
    )
  }
}