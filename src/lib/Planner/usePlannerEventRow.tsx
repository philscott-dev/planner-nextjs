import { useState, useEffect } from 'react'
import { areIntervalsOverlapping, isSameDay } from 'date-fns'
import { PlannerEvent } from './types'

/**
 * sets and checks the multirow layout, per user
 */
export default function usePlannerEventRow(events?: PlannerEvent[]) {
  const [rows, setRows] = useState<PlannerEvent[][]>([[]])

  function reduceDays(
    acc: PlannerEvent[][],
    event: PlannerEvent,
    index: number,
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
    } while (
      areIntervalsOverlapping(eventRange, prevRange) ||
      isSameDay(event.startTime, prevRange.start) ||
      isSameDay(event.endTime, prevRange.end) ||
      isSameDay(event.startTime, prevRange.end)
    )

    // if we need to start a new row
    if (!acc[rowIndex]) {
      acc[rowIndex] = [event]
      return acc
    }
    acc[rowIndex].push(event)
    return acc
  }

  useEffect(() => {
    const arr = !events
      ? []
      : events
          .sort((a, b) => a.startTime?.getTime() - b.startTime?.getTime())
          .reduce<PlannerEvent[][]>(reduceDays, [[]])
    setRows(arr)
  }, [events])
  return rows
}
