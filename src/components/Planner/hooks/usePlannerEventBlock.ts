import { useState, useEffect } from 'react'
import { PlannerEvent, Block, PlannerInterval } from '../types'
import {
  areIntervalsOverlapping,
  getDayOfYear,
  getDaysInMonth,
  getDaysInYear,
} from 'date-fns'
import getIntervalRange from './helpers/getIntervalRange'

/**
 * Hook
 * Sets row widths and empty sized "items" if no event is preset
 */

export default function usePlannerEventBlock(
  range: Date[],
  events: PlannerEvent[],
  interval: PlannerInterval,
) {
  const [blocks, setBlocks] = useState<Block[]>([])
  const length =
    interval === 'year'
      ? getDaysInYear(range[0])
      : interval === 'month'
      ? getDaysInMonth(range[0]) * 24
      : 7 * 24
  console.log(length)
  useEffect(() => {
    // reduce over the Date Range Array ex: year === Date[12]
    const result = range.reduce<Block[]>((acc, date, index) => {
      //getDayOfYear()
      //get the start and end dates
      const dateRange = getIntervalRange(interval, date, range[index + 1])
      for (let i = 0; i < events.length; i++) {
        // get event and setup interval overlap checks
        const event = events[i]
        const eventRange = { start: event.startTime, end: event.endTime }
        const inclusive = { inclusive: true }
        // check if each date in the range array is overlapping with the event
        if (areIntervalsOverlapping(dateRange, eventRange, inclusive)) {
          const lastBlock = acc[acc.length - 1]
          if (lastBlock?.event?.id && lastBlock.event.id === event.id) {
            // if it is overlapping, increment the event size
            const size = lastBlock.size + 1
            return [...acc.slice(0, acc.length - 1), { size, event }]
          } else {
            // else insert the next event
            return [...acc, { size: 1, event }]
          }
        }
      }
      //if no events
      return [...acc, { size: 1 }]
    }, [])
    setBlocks(result)
  }, [range, events, interval])
  return blocks
}
