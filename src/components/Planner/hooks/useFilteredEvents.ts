import { useState, useEffect } from 'react'
import { areIntervalsOverlapping, endOfDay, startOfDay } from 'date-fns'
import { PlannerEventGroup } from '../types'

/**
 * Filter out dates that don't overlap with the PlannerInterval
 */
export default function usePlannerEventRow(
  groups?: PlannerEventGroup[],
  range?: Date[],
) {
  const [filteredGroups, setGroups] = useState<PlannerEventGroup[]>([])

  useEffect(() => {
    if (groups && range && range.length) {
      const dateRange = {
        start: startOfDay(range[0]),
        end: endOfDay(range[range.length - 1]),
      }
      const filtered = groups.map((groups) => {
        const events = groups.events.filter((event) => {
          const eventRange = { start: event.startTime, end: event.endTime }
          return areIntervalsOverlapping(eventRange, dateRange, {
            inclusive: true,
          })
        })
        return { ...groups, events }
      })
      setGroups(filtered)
    }
  }, [groups, range])
  return filteredGroups
}