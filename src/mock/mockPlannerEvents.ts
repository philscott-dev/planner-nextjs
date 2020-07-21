import { addDays, subDays } from 'date-fns'
import { PlannerEventGroup } from 'lib/Planner/types'
import { theme } from 'theme'
import { v4 as uuid } from 'uuid'

const today = addDays(new Date(), -4)

const u0 = uuid()
const u1 = uuid()
const u2 = uuid()
const u3 = uuid()
const u4 = uuid()

export const user0: PlannerEventGroup = {
  id: u0,
  icon: 'icon',
  label: 'User 0',
  events: [
    {
      id: uuid(),
      assigneeId: u0,
      title: 'Title 0',
      startTime: subDays(today, 1),
      endTime: addDays(today, 2),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
  ],
}

export const user1: PlannerEventGroup = {
  id: u1,
  icon: 'icon',
  label: 'User 1',
  events: [
    {
      id: uuid(),
      assigneeId: u1,
      title: 'Title 1',
      startTime: addDays(today, 0),
      endTime: addDays(today, 2),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.magenta[300],
    },
    {
      id: uuid(),
      assigneeId: u1,
      title: 'Title 2',
      startTime: addDays(today, 3),
      endTime: addDays(today, 4),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: uuid(),
      assigneeId: u1,
      title: 'Title 3',
      startTime: addDays(today, 3),
      endTime: addDays(today, 5),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: uuid(),
      assigneeId: u1,
      title: 'Title 4',
      startTime: addDays(today, 4),
      endTime: addDays(today, 5),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.magenta[300],
    },
    {
      id: uuid(),
      assigneeId: u1,
      title: 'Title 5',
      startTime: addDays(today, 7),
      endTime: addDays(today, 8),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.green[300],
    },
    {
      id: uuid(),
      assigneeId: u1,
      title: 'Title 6',
      startTime: addDays(today, 0),
      endTime: addDays(today, 5),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
  ],
}

export const user2: PlannerEventGroup = {
  id: u2,
  icon: 'icon',
  label: 'User 2',
  events: [
    {
      id: uuid(),
      assigneeId: u2,
      title: 'Title 1',
      startTime: addDays(today, 1),
      endTime: addDays(today, 5),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.magenta[300],
    },
    {
      id: uuid(),
      assigneeId: u2,
      title: 'Title 2',
      startTime: addDays(today, 2),
      endTime: addDays(today, 4),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.green[300],
    },
    {
      id: uuid(),
      assigneeId: u2,
      title: 'Title 3',
      startTime: addDays(today, 3),
      endTime: addDays(today, 5),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: uuid(),
      assigneeId: u2,
      title: 'Title 4',
      startTime: addDays(today, 6),
      endTime: addDays(today, 7),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.green[300],
    },
    {
      id: uuid(),
      assigneeId: u2,
      title: 'Title 5',
      startTime: addDays(today, 2),
      endTime: addDays(today, 2),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: uuid(),
      assigneeId: u2,
      title: 'Title 6',
      startTime: addDays(today, 0),
      endTime: addDays(today, 1),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.magenta[300],
    },
  ],
}

export const user3: PlannerEventGroup = {
  id: u3,
  icon: 'icon',
  label: 'User 3',
  events: [
    {
      id: uuid(),
      assigneeId: u3,
      title: 'Title 1',
      startTime: addDays(today, 1),
      endTime: addDays(today, 1),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: uuid(),
      assigneeId: u3,
      title: 'Title 2',
      startTime: addDays(today, 2),
      endTime: addDays(today, 6),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.green[300],
    },
    {
      id: uuid(),
      assigneeId: u3,
      title: 'Title 3',
      startTime: addDays(today, 2),
      endTime: addDays(today, 3),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: uuid(),
      assigneeId: u3,
      title: 'Title 4',
      startTime: addDays(today, 5),
      endTime: addDays(today, 5),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: uuid(),
      assigneeId: u3,
      title: 'Title 5',
      startTime: addDays(today, 3),
      endTime: addDays(today, 5),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: uuid(),
      assigneeId: u3,
      title: 'Title 6',
      startTime: addDays(today, 3),
      endTime: addDays(today, 6),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.magenta[300],
    },
    {
      id: uuid(),
      assigneeId: u3,
      title: 'Title 7',
      startTime: subDays(today, 3),
      endTime: addDays(today, 7),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.green[300],
    },
  ],
}

export const user4: PlannerEventGroup = {
  id: u4,
  icon: 'icon',
  label: 'User 4',
  events: [
    {
      id: uuid(),
      assigneeId: u4,
      title: 'Title 0',
      startTime: subDays(today, 3),
      endTime: addDays(today, 15),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
  ],
}

export const plannerEvents: PlannerEventGroup[] = [
  user0,
  user1,
  user2,
  user3,
  user4,
]

export const plannerUsers: PlannerEventGroup[] = [
  { id: 0, icon: 'icon', label: 'User 0', events: [] },
]
