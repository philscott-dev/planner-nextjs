/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import isSameDay from 'date-fns/isSameDay'
import isSameMonth from 'date-fns/isSameMonth'
import useMonth from './useMonth'
import WeekHeader from './WeekHeader'
import Week from './Week'
import Day from './Day'

interface CalendarProps {
  date?: Date
  onSelectedDate?: (date: Date) => void
  shouldHighlightWeek?: boolean
  shouldHighlightToday?: boolean
}
const Calendar: FC<CalendarProps> = ({
  date,
  onSelectedDate,
  shouldHighlightWeek = true,
  shouldHighlightToday = true,
}) => {
  const today = new Date()
  const month = useMonth(date)

  const handleSelecteDate = (date: Date) => {
    if (onSelectedDate) {
      onSelectedDate(date)
    }
  }

  return (
    <Table>
      <WeekHeader />
      <tbody>
        {month.map((week, w) => (
          <Week
            index={w}
            shouldHighlight={shouldHighlightWeek}
            date={date}
            key={w}
          >
            {week.map((day, d) => (
              <Day
                key={`${d}`}
                date={day}
                tabIndex={w * 7 + d}
                isToday={day ? isSameDay(day, today) : false}
                isActive={day && date ? isSameDay(day, date) : false}
                isSameMonth={day ? isSameMonth(date || today, day) : false}
                onClick={handleSelecteDate}
              />
            ))}
          </Week>
        ))}
      </tbody>
    </Table>
  )
}

const Table = styled.table`
  border-spacing: 0;
`

export default Calendar
