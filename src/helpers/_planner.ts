import { PlannerEventGroup, PlannerEvent } from 'components/Planner/types'

import { remove, add } from './array'

export function updateByPrevId(
  groups: PlannerEventGroup[],
  event: PlannerEvent,
  prevGroupId: string | number,
) {
  return groups.map((group) => {
    // remove the event
    if (group.id === prevGroupId) {
      group.events = remove(group.events, event)
    }

    // add the event back
    if (group.id === event.assigneeId) {
      group.events = add(group.events, event)
    }
    return group
  })
}

export function updateByNextId(
  groups: PlannerEventGroup[],
  event: PlannerEvent,
  nextGroupId: string | number,
) {
  return groups.map((group) => {
    // remove the event
    if (group.id === event.assigneeId) {
      event.assigneeId = nextGroupId
      group.events = remove(group.events, event)
    }

    // add the event back
    if (group.id === nextGroupId) {
      group.events = add(group.events, event)
    }
    return group
  })
}
