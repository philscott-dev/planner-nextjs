import { PlannerEventGroup, PlannerEvent } from 'lib/Planner/types'

import { remove, add } from './array'
import {
  addMonths,
  set as setDate,
  differenceInMonths,
  differenceInYears,
  addYears,
} from 'date-fns'

export function updateByNextId(
  groups: PlannerEventGroup[],
  event: PlannerEvent,
  nextGroupId: string | number,
) {
  const next = groups.map((group) => {
    //if the event is staying in the same group
    if (event.assigneeId === nextGroupId && group.id === nextGroupId) {
      const removed = remove(group.events, event)
      const events = add(removed, event)
      return { ...group, events }
    }

    //otherwise remove from the current looped group
    if (group.id === event.assigneeId) {
      // remove the event
      const events = remove(group.events, event)
      return { ...group, events }
    }

    // add the event back
    if (group.id === nextGroupId) {
      const events = add(group.events, { ...event, assigneeId: nextGroupId })
      return { ...group, events }
    }

    return group
  })
  return next
}

export function keepMockUpdated(events: PlannerEventGroup[]) {
  const today = new Date()
  const originalDate = new Date(2020, 6, 1)
  const diffMonth = differenceInMonths(today, originalDate)
  const diffYear = differenceInYears(today, originalDate)
  return events.map((group) => {
    const events = group.events.map((event) => {
      let startTime = addMonths(event.startTime, diffMonth)
      let endTime = addMonths(event.endTime, diffMonth)
      startTime = addYears(startTime, diffYear)
      endTime = addYears(endTime, diffYear)
      return {
        ...event,
        startTime,
        endTime,
      }
    })
    return { ...group, events }
  })
}
