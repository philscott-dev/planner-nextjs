import { useState, useEffect } from 'react'
import { areIntervalsOverlapping } from 'date-fns'
import { PlannerEvent, PlannerInterval } from '../types'
import reduceDays from './helpers/reduceDays'

/**
 * sets and checks the multirow layout, per user
 */
export default function usePlannerEventRow(events?: PlannerEvent[]) {
  const [rows, setRows] = useState<PlannerEvent[][]>([[]])

  useEffect(() => {
    const arr = !events
      ? []
      : events
          .sort((a, b) => a.startTime?.getTime() - b.startTime?.getTime())
          .reduce<PlannerEvent[][]>(reduceDays, [[]])
    setRows(arr)
  }, [events])
  return rows
}
