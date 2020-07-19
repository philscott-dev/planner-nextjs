import React, { useState } from 'react'
import { NextPage } from 'next'
import { Planner } from 'components'
import {
  PlannerEvent,
  PlannerEventGroup,
  PlannerInterval,
} from 'components/Planner/types'
import { plannerEvents } from 'mock/mockPlannerEvents'
import { isSameDay, differenceInDays } from 'date-fns'
import { startOfDay, subDays } from 'date-fns'
import { remove, add } from 'helpers/array'

const IndexPage: NextPage = () => {
  const [events, setEvents] = useState<PlannerEventGroup[]>(plannerEvents)
  const [plannerInterval, setPlannerInterval] = useState<PlannerInterval>(
    'week',
  )

  const handleColumnHeaderDoubleClick = (date: Date) => {
    //console.log(date)
  }

  const handleEmptyClick = (row: string | number, date: Date) => {
    console.log(row, date)
  }

  const handleEmptyDoubleClick = (row: string | number, date: Date) => {
    //console.log(row, date)
  }

  const handleEventClick = (plannerEvent: PlannerEvent) => {
    //console.log(plannerEvent)
  }

  const handleEventDoubleClick = (plannerEvent: PlannerEvent) => {
    //console.log(plannerEvent)
  }

  const handleRowHeaderDoubleClick = (id: string | number) => {
    //console.log(id)
  }

  const handleDropEvent = (
    event: PlannerEvent,
    row: string,
    col: string,
    date: Date,
  ) => {
    const rowId = parseInt(row, 10)
    if (!isSameDay(event.startTime, date) || event.assigneeId !== rowId) {
      const diff = differenceInDays(
        startOfDay(event.startTime),
        startOfDay(date),
      )
      event.startTime = date
      event.endTime = subDays(event.endTime, diff)

      const updatedPlanner = events.map((user) => {
        // remove the event
        if (user.id === event.assigneeId) {
          event.assigneeId = rowId
          user.events = remove(user.events, event)
        }

        // add the event back
        if (user.id === rowId) {
          user.events = add(user.events, event)
        }
        return user
      })
      setEvents(updatedPlanner)
    }
  }

  const handlePlannerIntervalChange = (interval: PlannerInterval) => {
    setPlannerInterval(interval)
  }

  return (
    <Planner
      events={events}
      plannerInterval={plannerInterval}
      onColumnHeaderDoubleClick={handleColumnHeaderDoubleClick}
      onEmptyClick={handleEmptyClick}
      onEmptyDoubleClick={handleEmptyDoubleClick}
      onEventClick={handleEventClick}
      onEventDoubleClick={handleEventDoubleClick}
      onRowHeaderDoubleClick={handleRowHeaderDoubleClick}
      onDropEvent={handleDropEvent}
      onPlannerIntervalChange={handlePlannerIntervalChange}
    />
  )
}

export default IndexPage
