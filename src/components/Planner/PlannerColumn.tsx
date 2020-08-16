/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'
import { PlannerInterval } from './types'
import useHighlightWeekend from './hooks/useHighlightWeekend'

interface PlannerColumnProps {
  className?: string
  range: number
  index: number
  date: Date
  col?: number
  plannerInterval: PlannerInterval
}

const PlannerColumn: FC<PlannerColumnProps> = ({
  className,
  range,
  index,
  date,
  col,
  plannerInterval,
}) => {
  const isWeekend = useHighlightWeekend(date, plannerInterval)
  return (
    <Column
      index={index}
      className={className}
      isActive={col === index}
      range={range}
      plannerInterval={plannerInterval}
      isWeekend={isWeekend}
      data-planner-column={index}
      data-planner-date={date}
    />
  )
}

interface ColumnProps {
  range: number
  isActive: boolean
  index?: number
  isWeekend?: boolean
  plannerInterval: PlannerInterval
}

export const Column = styled.div<ColumnProps>`
  width: ${({ range }) => `calc((100%) / ${range - 1})`};
  box-sizing: border-box;
  border: ${({ isActive, theme }) =>
    isActive ? `1px solid ${theme.color.blue[300]}` : null};
  background: ${({ isActive, isWeekend, theme }) =>
    isActive
      ? theme.color.blue[700]
      : isWeekend
      ? theme.color.blue[600]
      : null};
  &:nth-of-type(even) {
    background: ${({ plannerInterval, theme }) =>
      plannerInterval === 'year' || plannerInterval === 'day'
        ? theme.color.blue[600]
        : null};
  }
`

export default PlannerColumn
