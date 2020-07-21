import { useState, useEffect } from 'react'
import { PlannerEvent } from './types'
import {
  differenceInDays,
  isSameDay,
  isBefore,
  isAfter,
  startOfDay,
} from 'date-fns'

interface Block {
  size: number
  event?: PlannerEvent
}

/**
 * Helpers
 */

function addInitialSpacer(
  arr: Block[],
  start: Date,
  startTime: Date,
  index: number,
): Block[] {
  if (index === 0 && !isSameDay(start, startTime)) {
    const size = differenceInDays(startTime, start)
    if (size > 0) {
      arr = [{ size }]
    }
  }
  return arr
}

function addPrevSpacer(
  arr: Block[],
  event: PlannerEvent,
  prevEvent?: PlannerEvent,
): Block[] {
  if (prevEvent) {
    const size =
      differenceInDays(
        startOfDay(event.startTime),
        startOfDay(prevEvent.endTime),
      ) - 1
    if (size > 0) {
      arr = [{ size }]
    }
  }
  return arr
}

function addLastSpacer(arr: Block[], end: Date, prevEndTime?: Date): Block[] {
  if (!prevEndTime) return arr
  if (!isSameDay(end, prevEndTime) && isBefore(prevEndTime, end)) {
    const size = differenceInDays(end, prevEndTime) + 1
    if (size > 0) {
      arr = [...arr, { size }]
    }
  }
  return arr
}

/**
 * Hook
 * Sets row widths and empty sized "items" if no event is preset
 */

export default function usePlannerEventBlock(
  range: Date[],
  events: PlannerEvent[],
) {
  const [blocks, setBlocks] = useState<Block[]>([])
  useEffect(() => {
    const start = range[0]
    const end = range[range.length - 1]

    const result = events.reduce<Block[]>((acc, event, index) => {
      const startTime = startOfDay(event.startTime)
      const endTime = startOfDay(event.endTime)

      let arr: Block[] | null = []
      arr = addInitialSpacer(arr, start, startTime, index)

      // dont add the event if it falls out of range
      if (
        (!isSameDay(event.startTime, end) && isAfter(startTime, end)) ||
        (!isSameDay(event.endTime, start) && isBefore(endTime, start))
      ) {
        //check if it's the last item in the array and add a spacer if so
        if (events.length === index + 1) {
          const lastItem = acc[acc.length - 1]
          //if the last item exists
          if (lastItem) {
            arr = addLastSpacer(arr, end, lastItem.event?.endTime)
          } else {
            // otherwise remove the row completely
            arr = null
          }
          return arr ? [...acc, ...arr] : acc
        }

        // otherwise return the accumulator
        return acc
      } else {
        // add a previous spacer under normal circumstances
        arr = addPrevSpacer(arr, event, events[index - 1])
      }

      // if the event falls completely outside of the range but intersects
      if (
        (isSameDay(event.startTime, start) || isBefore(startTime, start)) &&
        (isSameDay(event.endTime, end) || isAfter(endTime, end))
      ) {
        return [...acc, ...arr, { size: range.length, event }]
      }

      // adjust the size of event if startTime before range start
      if (isBefore(startTime, start) || isSameDay(startTime, start)) {
        const size = differenceInDays(endTime, start) + 1
        arr = [...arr, { size, event }]
      }

      // if the event is completely in range, treat it like normal
      if (isBefore(start, startTime) && isAfter(end, endTime)) {
        const size = differenceInDays(endTime, startTime) + 1
        arr = [...arr, { size, event }]
      }

      // adjust the size of event if the endTime is after range end
      if (isAfter(endTime, end) || isSameDay(endTime, end)) {
        const size = differenceInDays(end, startTime) + 1
        arr = [...arr, { size, event }]
      }

      // if its the last item in the event array
      if (events.length === index + 1) {
        const lastItem = arr[arr.length - 1]
        arr = addLastSpacer(arr, end, lastItem.event?.endTime)
      }

      return [...acc, ...arr]
    }, [])
    setBlocks(result)
  }, [range, events])
  return blocks
}
