import { useState, useEffect } from 'react'
import { PlannerEvent, PlannerInterval } from '../types'
import reduceDays from './helpers/reduceDays'

/**
 * sets and checks the multirow layout, per user
 */
export default function usePlannerEventRow(
  interval: PlannerInterval,
  events?: PlannerEvent[],
) {
  const [rows, setRows] = useState<PlannerEvent[][]>([[]])

  useEffect(() => {
    const arr = !events
      ? []
      : events
          .sort((a, b) => a.startTime?.getTime() - b.startTime?.getTime())
          .reduce<PlannerEvent[][]>(
            (acc, event, index) => reduceDays(acc, event, index, interval),
            [[]],
          )
    setRows(arr)
  }, [events, interval])
  return rows
}
