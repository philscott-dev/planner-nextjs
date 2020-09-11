/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useRef } from 'react'
import { css, jsx } from '@emotion/react'
import { Text } from 'lib'
import { PlannerInterval } from './types'
import { useIntersectionObserver } from 'hooks'
import { fade, fadeOut } from 'styles/keyframes'

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
  const { isRight, isBottom } = useIntersectionObserver({
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
      isBottom={isBottom}
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
  isBottom: boolean
  isHovered: boolean
}

const Wrapper = styled.div<WrapperProps>`
  z-index: 1;
  position: absolute;
  box-sizing: border-box;
  padding: 8px;
  overflow: hidden;
  bottom: 4px;
  top: 4px;
  pointer-events: none;
  right: ${({ isRight }) => (isRight ? 0 : null)};
  background: ${({ color }) => color};
  box-shadow: ${({ theme }) => theme.shadow.up.two};

  display: ${({ isHovered }) => (isHovered ? 'block' : 'none')};
  animation-name: ${({ isHovered }) => (isHovered ? fade : fadeOut)};
  animation-duration: 0.25s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`

const textCss = css`
  word-break: normal;
  white-space: nowrap;
  max-width: 375px;
  pointer-events: none;
  user-select: none;
`
