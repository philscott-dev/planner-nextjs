import { PlannerInterval } from '../../types'
import { endOfDay, endOfYear, subMilliseconds } from 'date-fns'

export default function getIntervalRange(
  interval: PlannerInterval,
  range: Date[],
  index: number,
): { start: Date; end: Date } {
  const end = range[index + 1]
    ? subMilliseconds(range[index + 1], 1)
    : interval === 'year'
    ? endOfYear(range[index])
    : endOfDay(range[index])

  return { start: range[index], end }
}
