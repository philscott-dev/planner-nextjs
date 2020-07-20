import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { removeByIndex } from 'helpers/array'
import { download } from 'helpers/file'
import { v4 as uuid } from 'uuid'
import { parseJsonDates } from 'helpers/date'
import { EventColors } from 'constants/colors'
import { Entries } from 'components/FormElements/types'
import { updateByNextId, updateByPrevId } from 'helpers/_planner'
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
} from 'components'
import {
  isSameDay,
  differenceInDays,
  startOfDay,
  subDays,
  format,
  parse as parseDate,
} from 'date-fns'

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
      const updatedPlanner = updateByNextId(events, event, row)
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
    setEditableItems(removeByIndex(editableItems, index))
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
    console.log(entries)
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
            <Flex>
              <Input
                type="date"
                name="startTime"
                placeholder="Start Date"
                defaultValue={
                  item.startTime
                    ? format(item.startTime, DATE_PICKER_FORMAT)
                    : null
                }
              />
              <Input
                type="date"
                name="endTime"
                placeholder="End Date"
                defaultValue={
                  item.endTime ? format(item.endTime, DATE_PICKER_FORMAT) : null
                }
              />
            </Flex>
            <Select name="assigneeId" defaultValue={item.assigneeId}>
              <option>Assignee</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.label}
                </option>
              ))}
            </Select>
            <Select name="color" defaultValue={item.color}>
              <option>Color</option>
              {Object.entries(EventColors).map((value, index) => {
                return (
                  <option key={index} value={value[1]}>
                    {value[0]}
                  </option>
                )
              })}
            </Select>
          </ViewportModal>
        ))}
      </ViewportModalContainer>
    </>
  )
}

const Flex = styled.div`
  display: flex;
  margin: 8px 0;
  div:nth-of-type(1) {
    margin-right: 24px;
  }
`

const Select = styled.select`
  height: 54px;
  margin-bottom: 24px;
  padding: 0 24px;
  border-radius: 8px;
  outline: none;
  width: 100%;
  font-size: 14px;
  background-clip: padding-box;
  font-family: ${({ theme }) => theme.font.family};
  font-weight: 200;
  border: 2px solid ${({ theme }) => theme.color.blue[400]};
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[500]};
  &:focus {
    border: 2px solid ${({ theme }) => theme.color.blue[300]};
  }
  &::placeholder {
    color: ${({ theme }) => theme.color.gray[300]};
    font-family: ${({ theme }) => theme.font.family};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    border: 1px solid ${({ theme }) => theme.color.white[100]};
    -webkit-text-fill-color: ${({ theme }) => theme.color.white[100]};
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    border-right: 1px solid ${({ theme }) => theme.color.white[100]};
  }
  transition: all 0.3s ease-in-out;
`

export default IndexPage
