import { PlannerEventGroup, PlannerEvent } from 'components/Planner/types'

import { remove, add } from './array'

export function updateByNextId(
  groups: PlannerEventGroup[],
  event: PlannerEvent,
  nextGroupId: string | number,
) {
  return groups.map((group) => {
    // remove the event
    if (group.id === event.assigneeId) {
      console.log(group.id, event)
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
