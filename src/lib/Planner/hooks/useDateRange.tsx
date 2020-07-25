import { useState, useEffect } from 'react'
import {
  startOfWeek,
  endOfWeek,
  differenceInDays,
  addDays,
  startOfMonth,
  getDaysInMonth,
  startOfYear,
} from 'date-fns'
import { PlannerInterval } from '../types'
import { addMonths } from 'date-fns'

export default function useDateRange(
  date: Date,
  plannerInterval: PlannerInterval,
) {
  const [range, setRange] = useState<Date[]>([])

  useEffect(() => {
    let start = new Date()
    let length = 0
    let arr: Date[] = []
    if (plannerInterval === 'week') {
      const end = endOfWeek(date)
      start = startOfWeek(date)
      length = differenceInDays(end, start) + 1
      arr = Array.from({ length }, (_, index) => addDays(start, index))
    }
    if (plannerInterval === 'month') {
      start = startOfMonth(date)
      length = getDaysInMonth(date)
      arr = Array.from({ length }, (_, index) => addDays(start, index))
    }

    if (plannerInterval === 'year') {
      start = startOfYear(date)
      length = 12
      arr = Array.from({ length }, (_, index) => {
        const month = addMonths(start, index)
        return startOfMonth(month)
      })
    }
    setRange(arr)
  }, [date, plannerInterval])

  return range
}
