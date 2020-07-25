/** @jsx jsx */
import { useState, useEffect } from 'react'
import { jsx } from '@emotion/react'
import { NextPage } from 'next'
import { removeByIndex, addByIndex, remove, replace } from 'helpers/array'
import { download } from 'helpers/file'
import { v4 as uuid } from 'uuid'
import { parseJsonDates } from 'helpers/date'
import { updateByNextId } from 'helpers/_planner'
import { LOCAL_STORAGE_KEY } from 'constants/constants'
import { Entries } from 'lib/FormElements/types'
import { Planner } from 'lib'
import { EventEditor } from 'components'
import {
  PlannerEvent,
  PlannerEventGroup,
  PlannerInterval,
} from 'lib/Planner/types'
import {
  parse as parseDate,
  isSameDay,
  differenceInDays,
  startOfDay,
  subDays,
  parseISO,
  isAfter,
} from 'date-fns'

const IndexPage: NextPage = () => {
  const [events, setEvents] = useState<PlannerEventGroup[]>([])
  const [editableDeleteIndex, setEditableDeleteIndex] = useState<number>()
  const [editableItems, setEditableItems] = useState<PlannerEvent[] | any[]>([])
  const [plannerInterval, setPlannerInterval] = useState<PlannerInterval>(
    'month',
  )

  useEffect(() => {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (json) {
      const parse = JSON.parse(json, parseJsonDates)
      if (parse.length) {
        setEvents(parse)
      }
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
    }
    setEditableItems([...editableItems.slice(0, 1), newEvent])
  }

  const handleEventClick = (plannerEvent: PlannerEvent) => {
    console.log('handleEventClick')
    //console.log(plannerEvent)
  }

  const handleEventDoubleClick = (plannerEvent: PlannerEvent) => {
    console.log('handleEventDoubleClick')
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
    console.log('drop event')
    if (event.startTime && event.endTime) {
      if (!isSameDay(event.startTime, date) || event.assigneeId !== row) {
        const diff = differenceInDays(
          startOfDay(event.startTime),
          startOfDay(date),
        )
        const movedEvent = {
          ...event,
          startTime: date,
          endTime: subDays(event.endTime, diff),
        }
        const updatedPlanner = updateByNextId(events, movedEvent, row)
        setEvents(updatedPlanner)
      }
    }
  }

  /**
   * Planner Toolbar Interactions
   */

  const handlePlannerIntervalChange = (interval: PlannerInterval) => {
    setPlannerInterval(interval)
  }

  /**
   * Event Editor Bar Interactions
   */

  const handleEventEditorCancel = (index: number) => {
    setEditableItems(removeByIndex(editableItems, index))
  }

  const handleEventEditorDelete = (index: number) => {
    //trigger an actual fullscreen modal
    const event = editableItems[index]
    const groups = events.map((group) => {
      if (group.id === event.assigneeId) {
        const events = remove(group.events, event)
        return { ...group, events }
      }
      return group
    })
    //setEditableDeleteIndex(index)
    setEditableItems(removeByIndex(editableItems, index))
    setEvents(groups)
  }

  const handleEventConfirmDelete = () => {
    // remove the bottom editable event modal
    if (editableDeleteIndex) {
      setEditableItems(removeByIndex(editableItems, editableDeleteIndex))

      //hide the fullscreen modal
      setEditableDeleteIndex(undefined)

      // remove the event from the real events array
    }
  }

  const handleEventEditorConfirm = (entries: Entries, index: number) => {
    if (
      !entries.title ||
      !entries.startTime ||
      !entries.endTime ||
      !entries.color ||
      !entries.assigneeId ||
      isAfter(
        parseISO(entries.startTime as string),
        parseISO(entries.endTime as string),
      )
    ) {
      return
    }
    //get the entry by it's index,
    const event = editableItems[index]
    const newEvent: PlannerEvent = {
      ...event,
      title: entries.title as string,
      id: event.id || uuid(),
      startTime: parseISO(entries.startTime as string),
      endTime: parseISO(entries.endTime as string),
      color: entries.color as string,
    }
    const updatedPlanner = updateByNextId(
      events,
      newEvent,
      entries.assigneeId as string,
    )
    setEvents(updatedPlanner)
    setEditableItems(removeByIndex(editableItems, index))
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
    setEditableItems([
      ...editableItems.slice(0, 1),
      {
        id: uuid(),
      },
    ])
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
   * Row Options Interactions
   */

  const handleRowUp = (rowId: string | number, index: number) => {
    console.log('up', rowId, index)
    const row = events[index]
    const rows = removeByIndex(events, index)
    setEvents(addByIndex(rows, row, index - 1))
  }
  const handleRowDown = (_rowId: string | number, index: number) => {
    const row = events[index]
    const rows = removeByIndex(events, index)
    setEvents(addByIndex(rows, row, index + 1))
  }
  const handleRowRename = (
    label: string,
    rowId: string | number,
    index: number,
  ) => {
    setEvents(replace(events, { ...events[index], label }))
  }
  const handleRowDelete = (rowId: string | number, index: number) => {
    setEvents(remove(events, events[index]))
  }

  /**
   * Render Page
   */
  return (
    <>
      <Planner
        eventGroups={events}
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
        onRowDelete={handleRowDelete}
        onRowDown={handleRowDown}
        onRowUp={handleRowUp}
        onRowRename={handleRowRename}
      />
      <EventEditor
        events={events}
        editableItems={editableItems}
        onCancel={handleEventEditorCancel}
        onDelete={handleEventEditorDelete}
        onConfirm={handleEventEditorConfirm}
      />
      {/* <Portal mountId="portal">
        <Overlay isVisible={isModalVisible} onMouseDown={handleModalClose} />
        <Modal
          isVisible={isModalVisible}
          title={modalTitle}
          onClose={handleModalClose}
        >
          {' '}
          stuff{' '}
        </Modal>
      </Portal> */}
    </>
  )
}

export default IndexPage
