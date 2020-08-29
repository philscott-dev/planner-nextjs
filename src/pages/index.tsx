/** @jsx jsx */
import { useState, useEffect } from 'react'
import { jsx } from '@emotion/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { isString } from 'helpers/typecheck'
import { removeByIndex, addByIndex, remove, replace } from 'helpers/array'
import { download } from 'helpers/file'
import { v4 as uuid } from 'uuid'
import { parseJsonDates } from 'helpers/date'
import { updateByNextId, keepMockUpdated } from 'helpers/_planner'
import { LOCAL_STORAGE_KEY } from 'constants/constants'
import { Entries } from 'lib/FormElements/types'
import { EventEditor, Planner } from 'components'
import { AddEvent } from 'components'
import useSWR from 'swr'
import mock from 'constants/mock.json'
import {
  PlannerEvent,
  PlannerEventGroup,
  PlannerInterval,
  PlannerLayout,
} from 'components/Planner/types'
import {
  parse as parseDate,
  isSameDay,
  isValid,
  differenceInDays,
  startOfDay,
  subDays,
  parseISO,
  isAfter,
} from 'date-fns'
import { fetchEvents, EventsResponse } from 'services/api'
import useStickyResult from 'hooks/useStickyResult'

const IndexPage: NextPage = () => {
  /*
   * State Variables
   */
  const [title, setTitle] = useState('PlannerJS')
  const [events, setEvents] = useState<PlannerEventGroup[]>([])
  const [editableDeleteIndex, setEditableDeleteIndex] = useState<number>()
  const [editableItems, setEditableItems] = useState<PlannerEvent[] | any[]>([])

  /**
   * Stateful Query Params
   */
  const [activeDate, setActiveDate] = useState(startOfDay(new Date()))
  const [plannerLayout, setPlannerLayout] = useState<PlannerLayout>('standard')
  const [plannerInterval, setPlannerInterval] = useState<PlannerInterval>(
    'month',
  )

  /**
   * Routing & Queries
   */
  const router = useRouter()
  const { date, interval, layout } = router.query

  // parse the permalink and assign to state
  useEffect(() => {
    const plannerDate = new Date(String(date))
    if (isValid(plannerDate)) {
      setActiveDate(plannerDate)
    }

    if (isString(interval)) {
      setPlannerInterval(interval as PlannerInterval)
    }

    if (isString(layout)) {
      setPlannerLayout(layout as PlannerLayout)
    }
  }, [date, layout, interval])

  /**
   * useSWR API call
   */

  const { data, error, isValidating, mutate } = useSWR<EventsResponse>(
    ['/facts/random', activeDate, plannerInterval, plannerLayout],
    fetchEvents,
  )
  const cats = useStickyResult(data)
  console.log(cats, isValidating, error, data)

  /**
   * On Mount, load mock or localStorage
   */
  useEffect(() => {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (json) {
      const parse = JSON.parse(json, parseJsonDates)
      if (parse) {
        setTitle(parse.title)
        setEvents(parse.events)
      }
    } else {
      // if no saved localStorage, update mock data
      const parse = JSON.parse(JSON.stringify(mock), parseJsonDates)
      if (parse) {
        setTitle(parse.title)
        setEvents(keepMockUpdated(parse.events))
      }
    }
  }, [])

  /*
   * Update localStorage per change
   */
  useEffect(() => {
    const json = { title, events }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json))
  }, [title, events])

  /**
   * Planner Grid Interactions
   */

  const handleColumnHeaderDoubleClick = (date: Date) => {
    console.log('handleColumnHeaderDoubleClick')
    console.log(date)
  }

  const handleEmptyClick = (row: string | number, date: Date) => {
    console.log('handleEmptyClick')
    console.log(row, date)
  }

  const handleEmptyDoubleClick = (row: string | number, date: Date) => {
    console.log('handleEmptyDoubleClick')
    const newEvent: PlannerEvent = {
      id: uuid(),
      assigneeId: row,
      startTime: date,
      endTime: date,
    }
    setEditableItems([newEvent])
    //setEditableItems([...editableItems.slice(0, 1), newEvent])
  }

  const handleEventClick = (plannerEvent: PlannerEvent) => {
    console.log('handleEventClick')
    //console.log(plannerEvent)
  }

  const handleEventDoubleClick = (plannerEvent: PlannerEvent) => {
    console.log('handleEventDoubleClick')
    setEditableItems([plannerEvent])
    //setEditableItems([...editableItems.slice(0, 1), plannerEvent])
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

  const handleActiveDateChange = (date: Date) => {
    router.push({
      query: {
        ...router.query,
        date: date.toISOString(),
      },
    })
    //setActiveDate(activeDate)
  }

  const handlePlannerIntervalChange = (interval: PlannerInterval) => {
    router.push({
      query: {
        ...router.query,
        interval,
      },
    })
    //setPlannerInterval(interval)
  }

  const handlePlannerLayoutChange = (layout: PlannerLayout) => {
    router.push({
      query: {
        ...router.query,
        layout,
      },
    })
    //setPlannerLayout(layout)
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
      id: event.id,
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

    // TODO: Implement swr mutate
    mutate()
  }

  /**
   * Toolbar Interactions
   */

  const handleNewPlannerClick = () => {
    localStorage.clear()
    setTitle('PlannerJS')
    setEvents([])
  }

  const handlePlannerRename = (title: string) => {
    setTitle(title)
  }

  const handleImportJSON = (json: string) => {
    const imported: { title: string; events: PlannerEventGroup[] } = JSON.parse(
      json,
      parseJsonDates,
    )
    if (imported.title && imported.events) {
      setTitle(imported.title)
      setEvents(imported.events)
    }
  }
  const handleExportClick = () => {
    const json = {
      title,
      events,
    }
    download(JSON.stringify(json), 'planner_events.json', 'application/json')
  }

  const handleAddEventClick = () => {
    setEditableItems([
      //...editableItems.slice(0, 1),
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
        title={title}
        eventGroups={events}
        plannerInterval={plannerInterval}
        plannerLayout={plannerLayout}
        activeDate={activeDate}
        onActiveDateChange={handleActiveDateChange}
        onColumnHeaderDoubleClick={handleColumnHeaderDoubleClick}
        onEmptyClick={handleEmptyClick}
        onEmptyDoubleClick={handleEmptyDoubleClick}
        onEventClick={handleEventClick}
        onEventDoubleClick={handleEventDoubleClick}
        onRowHeaderDoubleClick={handleRowHeaderDoubleClick}
        onDropEvent={handleDropEvent}
        onPlannerIntervalChange={handlePlannerIntervalChange}
        onPlannerLayoutChange={handlePlannerLayoutChange}
        onSettingsClick={handleSettingsClick}
        onNewPlannerClick={handleNewPlannerClick}
        onExportClick={handleExportClick}
        onAddEventClick={handleAddEventClick}
        onAddRowClick={handleAddRowClick}
        onImportJSON={handleImportJSON}
        onRowDelete={handleRowDelete}
        onRowDown={handleRowDown}
        onRowUp={handleRowUp}
        onRowRename={handleRowRename}
        onPlannerRename={handlePlannerRename}
      />
      <EventEditor
        events={events}
        editableItems={editableItems}
        onCancel={handleEventEditorCancel}
        onDelete={handleEventEditorDelete}
        onConfirm={handleEventEditorConfirm}
      />
      <AddEvent onAddEvent={handleAddEventClick} onAddRow={handleAddRowClick} />
    </>
  )
}

export default IndexPage
