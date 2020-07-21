/** @jsx jsx */
import { jsx } from '@emotion/react'
import { FC } from 'react'
import styled from '@emotion/styled'
import { subMonths, addMonths, subYears, addYears, format } from 'date-fns'
import { IconButton, Text } from '..'
import {
  FiChevronsLeft,
  FiChevronRight,
  FiChevronsRight,
  FiChevronLeft,
} from 'react-icons/fi'

interface ControlsProps {
  date?: Date
  onChange: (date: Date) => void
  className?: string
}

const Controls: FC<ControlsProps> = ({
  onChange,
  date = new Date(),
  className,
}) => {
  const handleNextMonth = () => {
    onChange(addMonths(date, 1))
  }
  const handlePreviousMonth = () => {
    onChange(subMonths(date, 1))
  }
  const handleNextYear = () => {
    onChange(addYears(date, 1))
  }
  const handlePreviousYear = () => {
    onChange(subYears(date, 1))
  }

  return (
    <div className={className}>
      <IconButton onClick={handlePreviousYear}>
        <FiChevronsLeft />
      </IconButton>
      <IconButton onClick={handlePreviousMonth}>
        <FiChevronLeft />
      </IconButton>
      <Text size="small">{format(date, 'MMM, yyyy')}</Text>
      <IconButton onClick={handleNextMonth}>
        <FiChevronRight />
      </IconButton>
      <IconButton onClick={handleNextYear}>
        <FiChevronsRight />
      </IconButton>
    </div>
  )
}

export default styled(Controls)`
  display: flex;
  justify-content: space-around;
  margin: 0 0 8px 0;
  padding: 8px 2px;
  border-radius: 2px;
  background: ${({ theme }) => theme.color.blue[400]};
`
