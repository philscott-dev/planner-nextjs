import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { ParsedUrlQuery } from 'querystring'
import { startOfDay } from 'date-fns'
import { PlannerInterval, PlannerLayout, PlannerEventGroup } from '../types'

interface ParsedQuery {
  activeDate: Date
  interval: PlannerInterval
  layout: PlannerLayout
}

export default function usePlannerQuery(query: ParsedUrlQuery) {
  const { activeDate, interval, layout } = query
  const { data, error } = useSWR<string[]>(
    '/facts/random?animal_type=cat&amount=3',
  )

  const [events, setEvents] = useState<PlannerEventGroup[]>([])
  const [parsedQuery, setParsedQuery] = useState<ParsedQuery>({
    activeDate: startOfDay(new Date()),
    interval: 'month',
    layout: 'standard',
  })
  useEffect(() => {}, [])
  return { ...parsedQuery, events, setEvents }
}
