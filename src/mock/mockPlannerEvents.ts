import { addDays, subDays } from 'date-fns'
import { PlannerEventGroup } from 'components/Planner/types'
import { theme } from 'theme'

const today = addDays(new Date(), -4)

export const user0: PlannerEventGroup = {
  id: 0,
  icon: 'icon',
  label: 'User 0',
  events: [
    {
      id: '00',
      assigneeId: 0,
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
  id: 1,
  icon: 'icon',
  label: 'User 1',
  events: [
    {
      id: '11',
      assigneeId: 1,
      title: 'Title 1',
      startTime: addDays(today, 0),
      endTime: addDays(today, 2),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.magenta[300],
    },
    {
      id: '12',
      assigneeId: 1,
      title: 'Title 2',
      startTime: addDays(today, 3),
      endTime: addDays(today, 4),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: '13',
      assigneeId: 1,
      title: 'Title 3',
      startTime: addDays(today, 3),
      endTime: addDays(today, 5),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: '14',
      assigneeId: 1,
      title: 'Title 4',
      startTime: addDays(today, 4),
      endTime: addDays(today, 5),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.magenta[300],
    },
    {
      id: '15',
      assigneeId: 1,
      title: 'Title 5',
      startTime: addDays(today, 7),
      endTime: addDays(today, 8),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.green[300],
    },
    {
      id: '16',
      assigneeId: 1,
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
  id: 2,
  icon: 'icon',
  label: 'User 2',
  events: [
    {
      id: '21',
      assigneeId: 2,
      title: 'Title 1',
      startTime: addDays(today, 1),
      endTime: addDays(today, 5),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.magenta[300],
    },
    {
      id: '22',
      assigneeId: 2,
      title: 'Title 2',
      startTime: addDays(today, 2),
      endTime: addDays(today, 4),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.green[300],
    },
    {
      id: '23',
      assigneeId: 2,
      title: 'Title 3',
      startTime: addDays(today, 3),
      endTime: addDays(today, 5),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: '24',
      assigneeId: 2,
      title: 'Title 4',
      startTime: addDays(today, 6),
      endTime: addDays(today, 7),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.green[300],
    },
    {
      id: '25',
      assigneeId: 2,
      title: 'Title 5',
      startTime: addDays(today, 2),
      endTime: addDays(today, 2),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: '26',
      assigneeId: 2,
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
  id: 3,
  icon: 'icon',
  label: 'User 3',
  events: [
    {
      id: '31',
      assigneeId: 3,
      title: 'Title 1',
      startTime: addDays(today, 1),
      endTime: addDays(today, 1),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: '32',
      assigneeId: 3,
      title: 'Title 2',
      startTime: addDays(today, 2),
      endTime: addDays(today, 6),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.green[300],
    },
    {
      id: '33',
      assigneeId: 3,
      title: 'Title 3',
      startTime: addDays(today, 2),
      endTime: addDays(today, 3),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: '34',
      assigneeId: 3,
      title: 'Title 4',
      startTime: addDays(today, 5),
      endTime: addDays(today, 5),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: '35',
      assigneeId: 3,
      title: 'Title 5',
      startTime: addDays(today, 3),
      endTime: addDays(today, 5),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.blue[300],
    },
    {
      id: '36',
      assigneeId: 3,
      title: 'Title 6',
      startTime: addDays(today, 3),
      endTime: addDays(today, 6),
      isAllDay: false,
      isRepeat: false,
      label: 'string',
      color: theme.color.magenta[300],
    },
    {
      id: '37',
      assigneeId: 3,
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
  id: 4,
  icon: 'icon',
  label: 'User 4',
  events: [
    {
      id: '40',
      assigneeId: 4,
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