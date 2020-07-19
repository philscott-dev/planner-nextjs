import React, { useState } from 'react'
import { NextPage } from 'next'
import { plannerEvents } from 'mock/mockPlannerEvents'
import { isSameDay, differenceInDays } from 'date-fns'
import { startOfDay, subDays } from 'date-fns'
import { remove, add, removeByIndex } from 'helpers/array'
import {
  PlannerEvent,
  PlannerEventGroup,
  PlannerInterval,
} from 'components/Planner/types'
import {
  Planner,
  ViewportModalContainer,
  ViewportModal,
  Input,
} from 'components'

const IndexPage: NextPage = () => {
  const [events, setEvents] = useState<PlannerEventGroup[]>(plannerEvents)
  const [plannerInterval, setPlannerInterval] = useState<PlannerInterval>(
    'month',
  )
  const [editableItems, setEditableItems] = useState<PlannerEvent[]>([])

  /**
   * Planner Grid Interactions
   */

  const handleColumnHeaderDoubleClick = (date: Date) => {
    //console.log(date)
  }

  const handleEmptyClick = (row: string | number, date: Date) => {
    console.log(row, date)
  }

  const handleEmptyDoubleClick = (row: string | number, date: Date) => {
    //console.log(row, date)
    const newEvent: PlannerEvent = {
      id: '',
      assigneeId: row,
      startTime: date,
      endTime: date,
      color: 'blue',
    }
    setEditableItems([...editableItems.slice(0, 1), newEvent])
  }

  const handleEventClick = (plannerEvent: PlannerEvent) => {
    //console.log(plannerEvent)
  }

  const handleEventDoubleClick = (plannerEvent: PlannerEvent) => {
    setEditableItems([...editableItems.slice(0, 1), plannerEvent])
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

  /**
   * Planner Toolbar Interactions
   */

  const handlePlannerIntervalChange = (interval: PlannerInterval) => {
    setPlannerInterval(interval)
  }

  /**
   * Modal Bar Interactions
   */

  const handleModalCancel = (index: number) => {
    console.log(index, 'cancel')
    setEditableItems(removeByIndex(editableItems, index))
  }

  const handleModalConfirm = (index?: number) => {
    console.log(index, 'confirm')
  }

  /**
   * Toolbar Interactions
   */

  const handleSettingsClick = () => {}
  const handleImportClick = () => {}
  const handleExportClick = () => {}
  const handleAddClick = () => {
    const newEvent: PlannerEvent = {
      id: '',
      startTime: new Date(),
      endTime: new Date(),
      color: 'blue',
    }
    setEditableItems([...editableItems.slice(0, 1), newEvent])
  }

  /**
   * Render Page
   */

  console.log(editableItems)

  return (
    <>
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
        onSettingsClick={handleSettingsClick}
        onImportClick={handleImportClick}
        onExportClick={handleExportClick}
        onAddClick={handleAddClick}
      />
      <ViewportModalContainer>
        {editableItems.map((item, index) => (
          <ViewportModal
            key={item.id}
            index={index}
            title={item.title}
            onCancel={handleModalCancel}
            onConfirm={handleModalConfirm}
          >
            <Input
              type="text"
              name="title"
              placeholder="Event Title"
              defaultValue={item.title}
            />
          </ViewportModal>
        ))}
      </ViewportModalContainer>
    </>
  )
}

export default IndexPage
