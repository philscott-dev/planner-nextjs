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
  repeateFrequency?: 'day' | 'week' | 'month' | 'year'
  repeateInterval?: number
}

export interface PlannerEventGroup {
  id: number | string
  icon?: string
  label: string
  events: PlannerEvent[]
}

export type PlannerInterval = 'week' | 'month' | 'year'
