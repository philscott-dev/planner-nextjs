import { useState, useEffect } from 'react'
import { PlannerEvent, Block, PlannerInterval } from '../types'
import {
  areIntervalsOverlapping,
  differenceInDays,
  differenceInHours,
  getDayOfYear,
  getDaysInMonth,
  getDaysInYear,
  isBefore,
  isAfter,
  endOfYear,
  endOfMonth,
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
    const end = plannerInterval === 'year' ? endOfYear : endOfMonth
    const difference =
      plannerInterval === 'year' ? differenceInDays : differenceInDays
    const result = events
      .map<Block>((event, index) => {
        let startTime = event.startTime
        let endTime = event.endTime
        if (index === 0 && isBefore(event.startTime, range[0])) {
          startTime = range[0]
        }

        if (
          index === events.length - 1 &&
          isAfter(event.endTime, range[range.length - 1])
        ) {
          endTime = range[range.length - 1]
        }
        const size = difference(endTime, startTime) + 1
        return { size, event }
      })
      .reduce<Block[]>((acc, block, index) => {
        // check 1st day against start of range
        if (index === 0 && block.event) {
          const size = difference(block.event.startTime, range[0])
          if (events.length === 1) {
            // if theres only one event in the row, add the end block as well
            const endSize = difference(
              end(range[range.length - 1]),
              block.event.endTime,
            )
            return [...acc, { size }, block, { size: endSize }]
          } else {
            return [...acc, { size }, block]
          }
        }

        // check previous block
        const size =
          difference(block.event!.startTime, events[index - 1].endTime) - 1
        const temp = size >= 1 ? [...acc, { size }, block] : [...acc, block]

        // check event against end of range
        if (index === events.length - 1 && block.event) {
          const size = difference(
            end(range[range.length - 1]),
            block.event.endTime,
          )
          return size >= 1 ? [...temp, { size }] : temp
        }

        return temp
      }, [])
    setBlocks(result)
  }, [range, events, plannerInterval])
  return blocks
}
