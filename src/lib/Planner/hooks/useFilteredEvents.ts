import { useState, useEffect } from 'react'
import { areIntervalsOverlapping, endOfDay } from 'date-fns'
import { PlannerEventGroup } from '../types'

/**
 * sets and checks the multirow layout, per user
 */
export default function usePlannerEventRow(
  groups?: PlannerEventGroup[],
  range?: Date[],
) {
  const [filteredGroups, setGroups] = useState<PlannerEventGroup[]>([])

  useEffect(() => {
    if (groups && range) {
      const dateRange = {
        start: range[0],
        end: endOfDay(range[range.length - 1]),
      }
      const filtered = groups.map((groups) => {
        const events = groups.events.filter((event) => {
          const eventRange = { start: event.startTime, end: event.endTime }
          return areIntervalsOverlapping(eventRange, dateRange)
        })
        return { ...groups, events }
      })
      setGroups(filtered)
    }
  }, [groups, range])
  return filteredGroups
}