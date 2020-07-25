import styled from '@emotion/styled'

const PlannerRowHeader = styled.div<{ range: number; isActive: boolean }>`
  min-width: 140px;
  width: 140px;
  box-sizing: border-box;
  display: flex;
  padding: 8px;
  border-right: 2px solid black;
  background: ${({ theme, isActive }) =>
    isActive ? theme.color.blue[500] + 50 : theme.color.blue[600]};
`

export default PlannerRowHeader
