/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent, useState, useEffect } from 'react'
import { jsx } from '@emotion/react'
import { Text } from 'lib'
import { PlannerInterval } from './types'
import { format } from 'date-fns'
import useHighlightWeekend from './hooks/useHighlightWeekend'
import { getDaysInMonth } from 'date-fns'

interface PlannerHeaderDayProps {
  isActive?: boolean
  date: Date
  range: Date[]
  dayFormat: string
  plannerInterval: PlannerInterval
  plannerSize: number
  onMouseDown: (e: MouseEvent) => void
  onDoubleClick: (e: MouseEvent) => void
  className?: string
}

const PlannerHeaderDay: FC<PlannerHeaderDayProps> = ({
  isActive,
  date,
  range,
  dayFormat,
  plannerInterval,
  plannerSize,
  className,
  onMouseDown,
  onDoubleClick,
}) => {
  const isWeekend = useHighlightWeekend(date, plannerInterval)
  const dateString = format(date, dayFormat).split(' ')
  const [size, setSize] = useState<number>(30)
  useEffect(() => {
    if (plannerInterval === 'year') {
      setSize(getDaysInMonth(date))
    }

    if (plannerInterval === 'month') {
      setSize(1)
    }

    if (plannerInterval === 'week') {
      setSize(1)
    }
  }, [date, plannerInterval])
  return (
    <Wrapper
      className={className}
      isActive={isActive}
      range={range}
      size={size}
      plannerSize={plannerSize}
      plannerInterval={plannerInterval}
      isWeekend={isWeekend}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <div>
        <Text size="small" align="center">
          {dateString[0]}
        </Text>
        <Text size="small" align="center">
          {dateString[1]}
        </Text>
      </div>
    </Wrapper>
  )
}

interface WrapperProps {
  range: Date[]
  isActive?: boolean
  plannerInterval: PlannerInterval
  isWeekend?: boolean
  size: number
  plannerSize: number
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ size, plannerSize }) => `calc(${size / plannerSize} * 100%)`};
  box-sizing: border-box;
  background: ${({ isActive, isWeekend, theme }) =>
    isActive
      ? theme.color.blue[700]
      : isWeekend
      ? theme.color.blue[600]
      : theme.color.blue[500]};
  border: ${({ isActive, theme }) =>
    isActive ? `1px solid ${theme.color.blue[300]}` : null};
  border-bottom: none;

  &:nth-of-type(even) {
    background: ${({ plannerInterval, theme }) =>
      plannerInterval === 'year' || plannerInterval === 'day'
        ? theme.color.blue[600]
        : null};
  }

  /* On Large Screens, alternate text */
  @media screen and (min-width: ${({ theme }) => theme.breakpoint.small}) {
    &:nth-of-type(even) {
      > div > p {
        color: ${({ plannerInterval }) =>
          plannerInterval === 'month' ? 'transparent' : null};
      }
    }
  }

  /* On Small Screens, alternate text */
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    > div > p {
      color: ${({ plannerInterval }) =>
        plannerInterval === 'month' ? 'transparent' : null};
    }
    &:nth-of-type(3n) {
      > div > p {
        color: ${({ plannerInterval }) =>
          plannerInterval === 'month' ? 'white' : null};
      }
    }
  }
`

export default PlannerHeaderDay
