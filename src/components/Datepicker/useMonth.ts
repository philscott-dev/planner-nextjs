import { useEffect, useState } from 'react'
import chunk from 'lodash/chunk'
import {
  getDaysInMonth,
  startOfMonth,
  endOfMonth,
  getDay,
  setDate,
  subDays,
  addDays,
} from 'date-fns'

export default function useMonth(selectedDate?: Date) {
  const [month, setMonth] = useState<(Date | undefined)[][]>([[]])
  useEffect(() => {
    const date = selectedDate || new Date()
    const daysInMonth = getDaysInMonth(date)
    const firstDayOfMonth = startOfMonth(date)
    const lastDayOfMonth = endOfMonth(date)
    const startWeekday = getDay(firstDayOfMonth)
    const endWeekday = getDay(lastDayOfMonth)
    const grid = chunk(
      [
        ...Array.from({ length: startWeekday }, (_, index) =>
          subDays(firstDayOfMonth, index + 1),
        ).reverse(),
        ...Array.from({ length: daysInMonth }, (_, i) => setDate(date, i + 1)),
        ...Array.from({ length: 6 - endWeekday }, (_, index) =>
          addDays(lastDayOfMonth, index + 1),
        ),
      ],
      7,
    )
    setMonth(grid)
  }, [selectedDate])

  return month
}
