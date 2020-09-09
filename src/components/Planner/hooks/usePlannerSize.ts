import { useEffect, useState } from 'react'
import { PlannerInterval } from '../types'
import { getDaysInMonth, getDaysInYear } from 'date-fns'

export default function usePlannerSize(
  plannerInterval: PlannerInterval,
  date: Date,
) {
  const [plannerSize, setPlannerSize] = useState<number>(1)
  useEffect(() => {
    if (plannerInterval === 'year') {
      setPlannerSize(getDaysInYear(date))
    } else if (plannerInterval === 'month') {
      setPlannerSize(getDaysInMonth(date))
    } else {
      setPlannerSize(7)
    }
  }, [plannerInterval, date])
  return plannerSize
}
