/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent } from 'react'
import { jsx } from '@emotion/react'
import { Text } from 'lib'
import { PlannerInterval } from './types'
import { format } from 'date-fns'
import useHighlightWeekend from './hooks/useHighlightWeekend'

interface PlannerHeaderDayProps {
  isActive?: boolean
  date: Date
  range: Date[]
  dayFormat: string
  plannerInterval: PlannerInterval
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
  className,
  onMouseDown,
  onDoubleClick,
}) => {
  const isWeekend = useHighlightWeekend(date, plannerInterval)
  const dateString = format(date, dayFormat).split(' ')
  return (
    <Wrapper
      className={className}
      isActive={isActive}
      range={range}
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
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ range }) => `calc((100%) / ${range.length})`};
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
    > div > p {
      color: ${({ plannerInterval }) =>
        plannerInterval === 'month' ? 'transparent' : null};
    }
  }
  &:nth-of-type(even) {
    background: ${({ plannerInterval, theme }) =>
      plannerInterval === 'year' || plannerInterval === 'day'
        ? theme.color.blue[600]
        : null};
  }
`

export default PlannerHeaderDay
