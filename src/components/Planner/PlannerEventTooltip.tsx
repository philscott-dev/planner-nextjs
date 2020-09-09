/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'
import { Text } from 'lib'
import { PlannerInterval } from './types'

interface PlannerEventTooltipProps {
  className?: string
  color?: string
  isActive: boolean
  plannerInterval: PlannerInterval
  title?: string
  dateRangeString?: string
}
const PlannerEventTooltip: FC<PlannerEventTooltipProps> = ({
  className,
  color,
  isActive,
  title,
  dateRangeString,
  plannerInterval,
}) => {
  //if (!isActive) return null
  return (
    <Wrapper
      className={'__planner_tip ' + className}
      color={color}
      plannerInterval={plannerInterval}
    >
      <Text ellipsis size="small">
        {title}
      </Text>

      <Text.Light ellipsis size="small">
        {dateRangeString}
      </Text.Light>
    </Wrapper>
  )
}

export default PlannerEventTooltip

interface WrapperProps {
  color?: string
  plannerInterval: PlannerInterval
}

const Wrapper = styled.div<WrapperProps>`
  display: ${({ plannerInterval }) =>
    plannerInterval === 'year' ? 'initial' : 'none'};
  z-index: 1;
  position: absolute;
  top: 40px;
  max-width: 500px;
  /* right: 0; */
  padding: 8px;
  background: ${({ color }) => color};
  box-shadow: ${({ theme }) => theme.shadow.up.two};
  transition: ${({ theme }) => theme.transition.all};
  pointer-events: none;
`
