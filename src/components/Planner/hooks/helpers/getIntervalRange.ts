import { PlannerInterval } from '../../types'
import { endOfDay, endOfYear, subMilliseconds } from 'date-fns'

export default function getIntervalRange(
  interval: PlannerInterval,
  start: Date,
  end?: Date,
): { start: Date; end: Date } {
  return {
    start,
    end: end // if theres a next end range date
      ? subMilliseconds(end, 1) //subtract 1 millisecond
      : interval === 'year' // otherwise if interval is set to year
      ? endOfYear(start) // get the end of the year
      : endOfDay(start), // or the end of the day
  }
}
