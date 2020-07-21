/** @jsx jsx */
import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { jsx, css } from '@emotion/react'
import { NextPage } from 'next'
import { removeByIndex } from 'helpers/array'
import { download } from 'helpers/file'
import { v4 as uuid } from 'uuid'
import { parseJsonDates } from 'helpers/date'
import { EventColors } from 'constants/colors'
import { Entries } from 'components/FormElements/types'
import { updateByNextId } from 'helpers/_planner'
import { DATE_PICKER_FORMAT, LOCAL_STORAGE_KEY } from 'constants/constants'
import { theme } from 'theme'
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
  Select,
  Datepicker,
  H3,
} from 'components'
import {
  isSameDay,
  differenceInDays,
  startOfDay,
  subDays,
  format,
  parse as parseDate,
} from 'date-fns'
import { capitalize } from 'helpers/string'

const IndexPage: NextPage = () => {
  const [events, setEvents] = useState<PlannerEventGroup[]>([])
  const [editableDeleteIndex, setEditableDeleteIndex] = useState<number>()
  const [editableItems, setEditableItems] = useState<PlannerEvent[]>([])
  const [plannerInterval, setPlannerInterval] = useState<PlannerInterval>(
    'month',
  )

  useEffect(() => {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY)
    console.log(json)
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
    if (event.startTime && event.endTime) {
      if (!isSameDay(event.startTime, date) || event.assigneeId !== row) {
        const diff = differenceInDays(
          startOfDay(event.startTime),
          startOfDay(date),
        )
        event.startTime = date
        event.endTime = subDays(event.endTime, diff)
        const updatedPlanner = updateByNextId(events, event, row)
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
   * Modal Bar Interactions
   */

  const handleModalCancel = (index: number) => {
    setEditableItems(removeByIndex(editableItems, index))
  }

  const handleModalDelete = (index: number) => {
    //trigger an actual fullscreen modal
    setEditableDeleteIndex(index)
  }

  const handleConfirmDelete = () => {
    // remove the bottom editable event modal
    if (editableDeleteIndex) {
      setEditableItems(removeByIndex(editableItems, editableDeleteIndex))

      //hide the fullscreen modal
      setEditableDeleteIndex(undefined)

      // remove the event from the real events array
    }
  }

  const handleModalConfirm = (entries: Entries, index: number) => {
    //get the entry by it's index,
    const event = editableItems[index]
    if (
      !entries.title ||
      !entries.startTime ||
      !entries.endTime ||
      !entries.color ||
      !entries.assigneeId
    ) {
      return
    }
    const referenceDate = new Date()
    const newEvent: PlannerEvent = {
      ...event,
      title: entries.title as string,
      id: event.id || uuid(),
      startTime: parseDate(
        entries.startTime as string,
        DATE_PICKER_FORMAT,
        referenceDate,
      ),
      endTime: parseDate(
        entries.endTime as string,
        DATE_PICKER_FORMAT,
        referenceDate,
      ),
      color: (entries.color as string) || theme.color.blue[300],
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
    console.log('handleAddEventClick')
    const newEvent: PlannerEvent = {
      id: uuid(),
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
            onDelete={handleModalDelete}
          >
            <H3
              css={css`
                margin-left: 24px;
                margin-bottom: 32px;
              `}
            >
              Manage Event
            </H3>
            <ModalWrapper>
              <Flex>
                <Input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  defaultValue={item.title}
                />
              </Flex>
              <Flex>
                <Datepicker name="startTime" placeholder="Start Date" />
                <Datepicker name="endTime" placeholder="End Date" />
              </Flex>
              <Flex>
                <Select
                  placeholder="User"
                  name="assigneeId"
                  defaultValue={item.assigneeId}
                >
                  <option value="" selected disabled hidden>
                    Assign a User
                  </option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.label}
                    </option>
                  ))}
                </Select>
              </Flex>
              <Flex>
                <Select
                  placeholder="Color"
                  name="color"
                  defaultValue={item.color}
                >
                  <option value="" selected disabled hidden>
                    Pick a Color
                  </option>
                  {Object.entries(EventColors).map((value, index) => {
                    return (
                      <option key={index} value={value[1]}>
                        {capitalize(value[0])}
                      </option>
                    )
                  })}
                </Select>
              </Flex>
            </ModalWrapper>
          </ViewportModal>
        ))}
      </ViewportModalContainer>
    </>
  )
}

const Flex = styled.div`
  display: flex;
  margin-bottom: 32px;
  div:nth-of-type(2) {
    margin-left: 32px;
  }
`

const ModalWrapper = styled.div`
  padding: 0 24px;
`

export default IndexPage
