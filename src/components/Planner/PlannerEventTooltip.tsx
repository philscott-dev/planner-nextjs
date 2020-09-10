/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useRef } from 'react'
import { css, jsx } from '@emotion/react'
import { Text } from 'lib'
import { PlannerInterval } from './types'
import { useIntersectionObserver } from 'hooks'

interface PlannerEventTooltipProps {
  className?: string
  color?: string
  isActive: boolean
  isHovered: boolean
  plannerInterval: PlannerInterval
  title?: string
  dateRangeString?: string
}
const PlannerEventTooltip: FC<PlannerEventTooltipProps> = ({
  className,
  color,
  isActive,
  isHovered,
  title,
  dateRangeString,
  plannerInterval,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { isRight } = useIntersectionObserver({
    element: ref.current,
    shouldObserve: isHovered,
    observeOnce: true,
    unobserveTimeout: 250,
  })

  return (
    <Wrapper
      ref={ref}
      className={'__planner_tip ' + className}
      isRight={isRight}
      isHovered={isHovered}
      color={color}
      plannerInterval={plannerInterval}
    >
      <Text ellipsis size="small" css={textCss}>
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
  isHovered: boolean
}

const Wrapper = styled.div<WrapperProps>`
  z-index: 1;
  position: absolute;
  box-sizing: border-box;
  top: 40px;
  min-width: 375px;
  max-width: 375px;
  opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
  right: ${({ isRight }) => (isRight ? 0 : null)};
  padding: 8px;
  background: ${({ color }) => color};
  box-shadow: ${({ theme }) => theme.shadow.up.two};
  transition: all 0.25s ease-in-out;
  pointer-events: none;
`

const textCss = css`
  word-break: normal;
  white-space: pre-wrap;
  margin-bottom: 4px;
`
