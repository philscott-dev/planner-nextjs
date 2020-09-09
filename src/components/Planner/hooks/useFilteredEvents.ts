import { useState, useEffect } from 'react'
import {
  areIntervalsOverlapping,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
} from 'date-fns'
import { PlannerEventGroup, PlannerInterval } from '../types'

/**
 * Filter out dates that don't overlap with the PlannerInterval
 */
export default function usePlannerEventRow(
  plannerInterval: PlannerInterval,
  groups?: PlannerEventGroup[],
  range?: Date[],
) {
  const [filteredGroups, setGroups] = useState<PlannerEventGroup[]>([])

  useEffect(() => {
    const isYear = plannerInterval === 'year'
    const startOf = isYear ? startOfMonth : startOfDay
    const endOf = isYear ? endOfMonth : endOfDay
    if (groups && range && range.length) {
      const dateRange = {
        start: startOf(range[0]),
        end: endOf(range[range.length - 1]),
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
  }, [groups, range, plannerInterval])
  return filteredGroups
}
