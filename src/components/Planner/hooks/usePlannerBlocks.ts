import { useState, useEffect } from 'react'
import { PlannerEvent, Block, PlannerInterval } from '../types'
import {
  areIntervalsOverlapping,
  differenceInDays,
  differenceInHours,
  getDayOfYear,
  getDaysInMonth,
  getDaysInYear,
} from 'date-fns'
import getIntervalRange from './helpers/getIntervalRange'

/**
 * Hook
 * Sets row widths and empty sized "items" if no event is preset
 */

export default function usePlannerBlocks(
  range: Date[],
  events: PlannerEvent[],
  plannerInterval: PlannerInterval,
) {
  const [blocks, setBlocks] = useState<Block[]>([])
  useEffect(() => {
    const difference =
      plannerInterval === 'year' ? differenceInDays : differenceInHours
    const result = events
      .map<Block>((event) => {
        const size = difference(event.endTime, event.startTime)
        return { size, event }
      })
      .reduce<Block[]>((acc, block, index) => {
        // check 1st day against start of range
        if (index === 0 && block.event) {
          const size = difference(block.event.startTime, range[0])
          console.log(size)
          return [...acc, { size }, block]
        }

        // check event against end of range
        if (index === events.length - 1 && block.event) {
          const size = difference(range[range.length - 1], block.event.endTime)
          console.log(size)
          return [...acc, { size }, block]
        }

        const size = difference(
          block.event!.startTime,
          events[index - 1].endTime,
        )
        console.log(size)
        return [...acc, { size }, block]
      }, [])
    console.log(result)
    setBlocks(result)
  }, [range, events, plannerInterval])
  return blocks
}
