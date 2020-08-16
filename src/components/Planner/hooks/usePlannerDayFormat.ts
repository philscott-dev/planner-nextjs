import { useState, useEffect } from 'react'
import { PlannerInterval } from '../types'

export default function usePlannerDayFormat(
  activeDate: Date,
  plannerInterval: PlannerInterval,
) {
  const [format, setFormat] = useState('EEE d')
  useEffect(() => {
    if (activeDate) {
      if (plannerInterval === 'week') {
        setFormat('EEE d')
      }
      if (plannerInterval === 'month') {
        setFormat('do')
      }
      if (plannerInterval === 'year') {
        setFormat('MMM')
      }
    }
  }, [plannerInterval, activeDate])

  return format
}
