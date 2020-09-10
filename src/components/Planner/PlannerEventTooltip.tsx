/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useEffect, useRef, useState } from 'react'
import { jsx } from '@emotion/react'
import { Text } from 'lib'
import { PlannerInterval } from './types'
import { useIntersectionObserver } from 'hooks'
import useViewportBounds from 'hooks/useViewportBounds'

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
  //const [isRight, setRight] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const { isRight } = useViewportBounds(ref.current)

  return (
    <Wrapper
      ref={ref}
      className={'__planner_tip ' + className}
      isRight={isRight}
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
  isRight: boolean
}

const Wrapper = styled.div<WrapperProps>`
  z-index: 1;
  position: absolute;
  top: 40px;
  max-width: 375px;
  right: ${({ isRight }) => (isRight ? 0 : null)};
  padding: 8px;
  background: ${({ color }) => color};
  box-shadow: ${({ theme }) => theme.shadow.up.two};
  transition: all 0.25s ease-in-out;
  pointer-events: none;
`
