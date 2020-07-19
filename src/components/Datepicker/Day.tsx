/** @jsx jsx */
import { jsx } from '@emotion/react'
import { FC } from 'react'
import styled from '@emotion/styled'
import { getDate } from 'date-fns'

interface DayProps {
  tabIndex: number
  date?: Date
  isActive?: boolean
  isToday: boolean
  isSameMonth: boolean
  onClick: (date: Date) => void
}

const Day: FC<DayProps> = ({
  date,
  tabIndex,
  isActive,
  isToday,
  isSameMonth,
  onClick,
}) => {
  const handleDateClick = () => {
    if (date) {
      onClick(date)
    }
  }

  return (
    <Td>
      {date ? (
        <Button
          type="button"
          isActive={isActive}
          isToday={isToday}
          isSameMonth={isSameMonth}
          onClick={handleDateClick}
        >
          {getDate(date)}
        </Button>
      ) : null}
    </Td>
  )
}

const Td = styled.td``

interface ButtonProps {
  isActive?: boolean
  isToday: boolean
  isSameMonth: boolean
}

const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 2px 0;
  width: 32px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.family};
  background: ${({ isActive, theme }) =>
    isActive ? theme.color.blue[400] : 'transparent'};
  color: ${({ isActive, isToday, isSameMonth, theme }) =>
    !isSameMonth
      ? theme.color.gray[300]
      : isToday && !isActive
      ? theme.color.blue[300]
      : isActive
      ? theme.color.white[100]
      : theme.color.white[100]};
`

export default Day
