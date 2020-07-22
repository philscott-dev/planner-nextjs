import { PlannerEventGroup, PlannerEvent } from 'lib/Planner/types'

import { remove, add } from './array'

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
