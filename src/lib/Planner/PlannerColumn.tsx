/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'
import { isWeekend } from 'date-fns'

interface PlannerColumnProps {
  className?: string
  range: number
  index: number
  date: Date
  col?: number
}

const PlannerColumn: FC<PlannerColumnProps> = ({
  className,
  range,
  index,
  date,
  col,
}) => {
  return (
    <Column
      index={index}
      className={className}
      isActive={col === index}
      range={range}
      isWeekend={isWeekend(date)}
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
}

export const Column = styled.div<ColumnProps>`
  min-width: ${({ index }) => (index === undefined ? '140px' : null)};
  width: ${({ range, index }) =>
    index === undefined ? '140px' : `calc((100% - 140px) / ${range - 1})`};
  box-sizing: border-box;
  border: ${({ isActive, theme }) =>
    isActive ? `1px solid ${theme.color.blue[300]}` : null};
  background: ${({ isActive, isWeekend, theme }) =>
    isActive
      ? theme.color.blue[700]
      : isWeekend
      ? theme.color.blue[600]
      : null};
`

export default PlannerColumn
