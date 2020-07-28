import { PlannerEvent, PlannerInterval } from '../../types'
import {
  areIntervalsOverlapping,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
} from 'date-fns'

export default function reduceDays(
  acc: PlannerEvent[][],
  event: PlannerEvent,
  index: number,
  interval: PlannerInterval,
) {
  //first iteration, safely push the 1st event
  if (index === 0) {
    acc[0].push(event)
    return acc
  }

  let eventRange
  let prevRange
  let rowIndex = -1
  do {
    rowIndex++
    let prev
    if (acc[rowIndex]) {
      // get the last event in the current row
      const prevEventIndex = acc[rowIndex].length - 1
      prev = acc[rowIndex][prevEventIndex]
    }

    // check to see if the events overlap
    eventRange = { start: event.startTime, end: event.endTime }
    prevRange = {
      start: prev?.startTime ?? 0,
      end: prev?.endTime ?? 0,
    }
  } while (areOverlapping(eventRange, prevRange, interval))

  // if we need to start a new row
  if (!acc[rowIndex]) {
    acc[rowIndex] = [event]
    return acc
  }
  acc[rowIndex].push(event)
  return acc
}

interface DateRange {
  start: Date | number
  end: Date | number
}

function areOverlapping(
  range: DateRange,
  prevRange: DateRange,
  interval: PlannerInterval,
): boolean {
  if (!prevRange.start && !prevRange.end) {
    return false
  }
  if (interval === 'year') {
    console.log('year')
    return areIntervalsOverlapping(
      {
        start: startOfMonth(range.start),
        end: endOfMonth(range.end),
      },
      {
        start: endOfMonth(prevRange.start),
        end: endOfMonth(prevRange.end),
      },
      { inclusive: true },
    )
  }
  return areIntervalsOverlapping(range, prevRange, { inclusive: true })
}
