import { useState, useEffect } from 'react'
import { isWeekend } from 'date-fns'
import { PlannerInterval } from '../types'

export default function useHighlightWeekend(
  date: Date,
  plannerInterval: PlannerInterval,
) {
  const [highlightWeekend, setHighlightWeekend] = useState(false)
  useEffect(() => {
    const shouldHighlight =
      plannerInterval !== 'year' && plannerInterval !== 'day' && isWeekend(date)
    setHighlightWeekend(shouldHighlight)
  }, [plannerInterval, date])
  return highlightWeekend
}
