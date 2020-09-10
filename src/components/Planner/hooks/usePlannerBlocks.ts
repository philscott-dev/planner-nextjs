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
  endOfWeek,
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
    const endOf =
      plannerInterval === 'year'
        ? endOfYear
        : plannerInterval === 'month'
        ? endOfMonth
        : endOfWeek
    const difference =
      plannerInterval === 'year' ? differenceInDays : differenceInDays
    const result = events
      // assign sizes to all the events
      .map<Block>((event, index) => {
        let startTime = event.startTime
        let endTime = event.endTime
        // handle first event
        if (index === 0 && isBefore(startTime, range[0])) {
          startTime = range[0]
        }

        // handle last event
        if (
          index === events.length - 1 &&
          //BUG: endOf is applied to a range that is wrong... dec 1 is still end of range... this works for now but needs fixing
          isAfter(endTime, endOf(range[range.length - 1]))
        ) {
          endTime = endOf(range[range.length - 1])
        }
        console.log(endTime, event)
        const size = difference(endTime, startTime) + 1

        return { size, event }
      }, [])
      // assign empty space
      .reduce<Block[]>((acc, block, index) => {
        // check 1st day against start of range
        if (index === 0 && block.event) {
          const size = difference(block.event.startTime, range[0])
          if (events.length === 1) {
            // if theres only one event in the row, add the end block as well
            const endSize = difference(
              endOf(range[range.length - 1]),
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
            endOf(range[range.length - 1]),
            block.event.endTime,
          )
          return size >= 1 ? [...temp, { size }] : temp
        }

        return temp
      }, [])
    console.log(result)
    setBlocks(result)
  }, [range, events, plannerInterval])
  return blocks
}
