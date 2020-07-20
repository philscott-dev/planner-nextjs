import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { plannerEvents } from 'mock/mockPlannerEvents'
import { isSameDay, differenceInDays } from 'date-fns'
import { startOfDay, subDays } from 'date-fns'
import { remove, add, removeByIndex } from 'helpers/array'
import { download } from 'helpers/file'
import { v4 as uuid } from 'uuid'
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
import { parseJsonDates } from 'helpers/date'

const LOCAL_STORAGE_KEY = 'planner_save_state'

const IndexPage: NextPage = () => {
  const [events, setEvents] = useState<PlannerEventGroup[]>([])
  const [plannerInterval, setPlannerInterval] = useState<PlannerInterval>(
    'month',
  )
  const [editableItems, setEditableItems] = useState<PlannerEvent[]>([])

  useEffect(() => {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (json) {
      const parse = JSON.parse(json, parseJsonDates)
      setEvents(parse)
    }
  }, [])

  useEffect(() => {
    function saveLocalStorage() {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events))
    }
    window.addEventListener('beforeunload', saveLocalStorage)
    return () => window.removeEventListener('beforeunload', saveLocalStorage)
  }, [events])

  /**
   * Planner Grid Interactions
   */

  const handleColumnHeaderDoubleClick = (date: Date) => {
    console.log('handleColumnHeaderDoubleClick')
    //console.log(date)
  }

  const handleEmptyClick = (row: string | number, date: Date) => {
    console.log('handleEmptyClick')
    console.log(row, date)
  }

  const handleEmptyDoubleClick = (row: string | number, date: Date) => {
    console.log('handleEmptyDoubleClick')
    const newEvent: PlannerEvent = {
      id: row,
      assigneeId: row,
      startTime: date,
      endTime: date,
      color: 'blue',
    }
    setEditableItems([...editableItems.slice(0, 1), newEvent])
  }

  const handleEventClick = (plannerEvent: PlannerEvent) => {
    console.log('handleEventClick')
    //console.log(plannerEvent)
  }

  const handleEventDoubleClick = (plannerEvent: PlannerEvent) => {
    console.log('handleEventDoubleClick')
    console.log(plannerEvent)
    setEditableItems([...editableItems.slice(0, 1), plannerEvent])
  }

  const handleRowHeaderDoubleClick = (id: string | number) => {
    console.log('handleRowHeaderDoubleClick')
    //console.log(id)
  }

  const handleDropEvent = (
    event: PlannerEvent,
    row: string,
    col: string,
    date: Date,
  ) => {
    if (!isSameDay(event.startTime, date) || event.assigneeId !== row) {
      const diff = differenceInDays(
        startOfDay(event.startTime),
        startOfDay(date),
      )
      event.startTime = date
      event.endTime = subDays(event.endTime, diff)

      const updatedPlanner = events.map((user) => {
        // remove the event
        if (user.id === event.assigneeId) {
          event.assigneeId = row
          user.events = remove(user.events, event)
        }

        // add the event back
        if (user.id === row) {
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

  const handleImportJSON = (json: string) => {
    const imported: PlannerEventGroup[] = JSON.parse(json, parseJsonDates)
    setEvents(imported)
  }
  const handleExportClick = () => {
    download(JSON.stringify(events), 'planner_events.json', 'application/json')
  }

  const handleAddEventClick = () => {
    console.log('handleAddEventClick')
    const newEvent: PlannerEvent = {
      id: uuid(),
      startTime: new Date(),
      endTime: new Date(),
      color: 'blue',
    }
    setEditableItems([...editableItems.slice(0, 1), newEvent])
  }

  const handleAddRowClick = () => {
    const newGroup: PlannerEventGroup = {
      id: uuid(),
      label: `User ${events.length}`,
      events: [],
    }
    setEvents([newGroup, ...events])
  }

  const handleSettingsClick = () => {}

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
        onExportClick={handleExportClick}
        onAddEventClick={handleAddEventClick}
        onAddRowClick={handleAddRowClick}
        onImportJSON={handleImportJSON}
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
