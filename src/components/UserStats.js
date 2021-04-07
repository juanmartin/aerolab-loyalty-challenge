import styled from "styled-components/macro"
import coin from "../assets/icons/coin.svg"

const Box = styled.div`
  display: flex;
`

const StatsBox = styled(Box)`
  background-color: #ededed;
  border-radius: 99999px;
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 5px;
`

const Text = styled.p`
  font-family: ${(props) => props.theme.font};
  font-size: 20px;
  color: ${(props) => props.theme.gray};
  letter-spacing: -0.15px;
  margin: 0;
  align-self: center;
  line-height: 48px;
`

export default function UserStats(props) {
  const {name, points} = props
  return (
    <Box style={{ gap: "20px" }}>
      <Text>{name}</Text>
      <StatsBox>
        <Text>{points}</Text>
        <img src={coin} alt="Monedas"  />
      </StatsBox>
    </Box>
  )
}
