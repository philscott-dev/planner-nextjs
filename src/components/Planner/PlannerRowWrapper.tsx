import styled from '@emotion/styled'

interface PlannerRowWrapperProps {
  range: number
  isActive: boolean
}

export default styled.div<PlannerRowWrapperProps>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme, isActive }) =>
    isActive ? theme.color.blue[400] + 50 : 'transparent'};
`
