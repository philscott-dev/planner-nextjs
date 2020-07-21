/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'

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
      data-planner-column={index}
      data-planner-date={date}
    />
  )
}

interface ColumnProps {
  range: number
  isActive: boolean
  index?: number
}

export const Column = styled.div<ColumnProps>`
  min-width: ${({ index }) => (index === undefined ? '140px' : null)};
  width: ${({ range, index }) =>
    index === undefined ? '140px' : `calc((100% - 140px) / ${range - 1})`};
  box-sizing: border-box;
  border: ${({ isActive, theme }) =>
    isActive ? `1px solid ${theme.color.blue[300]}` : null};
  background: ${({ isActive, theme }) =>
    isActive ? theme.color.blue[700] : null};
`

export default PlannerColumn
