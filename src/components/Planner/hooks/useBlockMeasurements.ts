import { useEffect, useState } from 'react'
import { PlannerEvent, PlannerInterval } from '../types'
import {
  max,
  min,
  differenceInDays,
  differenceInHours,
  startOfDay,
  endOfDay,
  endOfMonth,
  startOfMonth,
  isBefore,
  isAfter,
} from 'date-fns'

export default function useBlockMeasurements(
  plannerInterval: PlannerInterval,
  range: Date[],
  event?: PlannerEvent,
) {
  const [measurements, setMeasurement] = useState<
    [left?: string, right?: string]
  >([undefined, undefined])
  useEffect(() => {
    if (event) {
      const isYear = plannerInterval === 'year'
      const difference = isYear ? differenceInDays : differenceInHours
      const startOf = isYear ? startOfMonth : startOfDay
      const endOf = isYear ? endOfMonth : endOfDay
      const r1 = range[0]
      const r2 = range[range.length - 1]
      const m1 = startOf(event.startTime)
      const m2 = endOf(event.endTime)
      const d1 = isBefore(m1, r1) ? r1 : m1
      const d2 = isAfter(m2, r2) ? r2 : m2
      const start = max([event.startTime, d1])
      const end = min([event.endTime, d2])
      const left = difference(start, d1)
      const right = difference(end, d2)
      const middle = difference(end, start)
      const total = left + right + middle
      function percent(x: number, total: number) {
        return `${(x / total) * 100}%`
      }
      setMeasurement([percent(left, total), percent(right, total)])
    }
  }, [event, range, plannerInterval])
  return measurements
}
