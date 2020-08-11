import { useState, useEffect } from 'react'
import { PlannerEvent, Block, PlannerInterval } from '../types'
import { areIntervalsOverlapping } from 'date-fns'
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
  useEffect(() => {
    const result = range.reduce<Block[]>((acc, date, index) => {
      const dateRange = getIntervalRange(interval, range, index)
      for (let i = 0; i < events.length; i++) {
        const event = events[i]
        const eventRange = { start: event.startTime, end: event.endTime }
        const inclusive = { inclusive: true }
        if (areIntervalsOverlapping(dateRange, eventRange, inclusive)) {
          const lastBlock = acc[acc.length - 1]
          // increment
          if (lastBlock?.event?.id && lastBlock.event.id === event.id) {
            const size = lastBlock.size + 1
            return [...acc.slice(0, acc.length - 1), { size, event }]
          } else {
            return [...acc, { size: 1, event }]
          }
        }
      }
      if (index === 0) {
      }
      return [...acc, { size: 1 }]
    }, [])
    setBlocks(result)
  }, [range, events, interval])
  return blocks
}
