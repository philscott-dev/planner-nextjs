/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC, useEffect, useState } from 'react'
import { PlannerInterval } from './types'
import useHighlightWeekend from './hooks/useHighlightWeekend'
import { getDaysInMonth } from 'date-fns'

interface PlannerColumnProps {
  className?: string
  range: Date[]
  index: number
  date: Date
  col?: number
  plannerSize: number
  plannerInterval: PlannerInterval
}

const PlannerColumn: FC<PlannerColumnProps> = ({
  className,
  range,
  index,
  date,
  col,
  plannerSize,
  plannerInterval,
}) => {
  const isWeekend = useHighlightWeekend(date, plannerInterval)
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
    <Column
      index={index}
      className={className}
      isActive={col === index}
      size={size}
      plannerSize={plannerSize}
      plannerInterval={plannerInterval}
      isWeekend={isWeekend}
      data-planner-column={index}
      data-planner-date={date}
    />
  )
}

interface ColumnProps {
  isActive: boolean
  index?: number
  isWeekend?: boolean
  plannerInterval: PlannerInterval
  size: number
  plannerSize: number
}

export const Column = styled.div<ColumnProps>`
  min-width: ${({ size, plannerSize }) => `calc(${size / plannerSize} * 100%)`};

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
