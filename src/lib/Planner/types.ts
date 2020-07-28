export type PlannerInterval = 'day' | 'week' | 'month' | 'year'

export interface PlannerEvent {
  id: number | string
  assigneeId?: number | string
  title?: string
  startTime: Date
  endTime: Date
  isAllDay?: boolean
  isRepeat?: boolean
  label?: string
  color?: string
  repeateFrequency?: PlannerInterval
  repeateInterval?: number
}

export interface PlannerEventGroup {
  id: number | string
  icon?: string
  label: string
  events: PlannerEvent[]
}

export interface Block {
  size: number
  event?: PlannerEvent
}
