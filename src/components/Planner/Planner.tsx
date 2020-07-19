/** @jsx jsx */
import { FC, useState, MouseEvent, DragEvent } from 'react'
import { jsx } from '@emotion/react'
import { startOfDay } from 'date-fns'
import styled from '@emotion/styled'
import PlannerHeader from './PlannerHeader'
import PlannerRow from './PlannerRow'
import useDateRange from './useDateRange'
import { PlannerEventGroup, PlannerEvent, PlannerInterval } from './types'
import PlannerColumn, { Column } from './PlannerColumn'
import { getDataAttrForMouseEvent } from 'helpers/event'

interface PlannerProps {
  className?: string
  events?: PlannerEventGroup[]
  plannerInterval: PlannerInterval
  onPlannerIntervalChange: (PlannerInterval: PlannerInterval) => void
  onEmptyClick: (row: string | number, date: Date) => void
  onEmptyDoubleClick: (row: string | number, date: Date) => void
  onEventClick: (plannerEvent: PlannerEvent) => void
  onEventDoubleClick: (plannerEvent: PlannerEvent) => void
  onRowHeaderDoubleClick: (id: string | number) => void
  onColumnHeaderDoubleClick: (date: Date) => void
  onDropEvent: (
    event: PlannerEvent,
    row: string,
    col: string,
    date: Date,
  ) => void
}

const Planner: FC<PlannerProps> = ({
  className,
  events,
  plannerInterval,
  onEmptyClick,
  onEmptyDoubleClick,
  onEventClick,
  onEventDoubleClick,
  onRowHeaderDoubleClick,
  onColumnHeaderDoubleClick,
  onDropEvent,
  onPlannerIntervalChange,
}) => {
  const today = new Date()
  const [activeDate, setActiveDate] = useState(startOfDay(today))
  const [activeEvent, setActiveEvent] = useState<PlannerEvent | undefined>()
  const [column, setColumn] = useState<number>()
  const [activeRow, setActiveRow] = useState<
    string | number | undefined | null
  >()
  const range = useDateRange(activeDate, plannerInterval)

  const handleColumnHeaderClick = (e: MouseEvent) => {
    const col = getDataAttrForMouseEvent(e, 'data-planner-column')
    const d = getDataAttrForMouseEvent(e, 'data-planner-date')
    console.log(col)
    if (col && d) {
      const date = new Date(d)
      setActiveDate(date)
      setColumn(parseInt(col, 10))
    }
    setActiveEvent(undefined)
  }

  const handleRowHeaderDoubleClick = (e: MouseEvent) => {
    const col = getDataAttrForMouseEvent(e, 'data-row-id')
    const d = getDataAttrForMouseEvent(e, 'data-planner-date')
    if (col && d) {
      //const date = new Date(d)
      onRowHeaderDoubleClick(col)
    }
  }

  const handleColumnHeaderDoubleClick = (e: MouseEvent) => {
    const d = getDataAttrForMouseEvent(e, 'data-planner-date')
    if (d) {
      const date = new Date(d)
      onColumnHeaderDoubleClick(date)
    }
  }

  const handleEventClick = (e: MouseEvent, plannerEvent: PlannerEvent) => {
    const col = getDataAttrForMouseEvent(e, 'data-planner-column')
    const row = getDataAttrForMouseEvent(e, 'data-row-id')
    const d = getDataAttrForMouseEvent(e, 'data-planner-date')
    if (col && row && d) {
      const date = new Date(d)
      setColumn(parseInt(col, 10))
      setActiveDate(date)
      setActiveRow(row)
      setActiveEvent(plannerEvent)
      onEventClick(plannerEvent)
    }
  }

  const handleEventDoubleClick = (
    e: MouseEvent,
    plannerEvent: PlannerEvent,
  ) => {
    onEventDoubleClick(plannerEvent)
  }

  const handleEmptyClick = (e: MouseEvent) => {
    const row = getDataAttrForMouseEvent(e, 'data-row-id')
    const col = getDataAttrForMouseEvent(e, 'data-planner-column')
    const d = getDataAttrForMouseEvent(e, 'data-planner-date')
    if (col && row && d) {
      const date = new Date(d)
      setColumn(parseInt(col, 10))
      setActiveRow(row)
      setActiveDate(date)
      setActiveEvent(undefined)
      onEmptyClick(row, date)
    }
  }

  const handleEmptyDoubleClick = (e: MouseEvent) => {
    const row = getDataAttrForMouseEvent(e, 'data-row-id')
    const d = getDataAttrForMouseEvent(e, 'data-planner-date')
    if (row && d) {
      const date = new Date(d)
      onEmptyDoubleClick(row, date)
    }
  }

  const handleRowHeaderClick = (e: MouseEvent) => {
    const row = getDataAttrForMouseEvent(e, 'data-row-id')
    setActiveRow(row)
  }

  const handleEventDragOver = (e: DragEvent) => {
    e.preventDefault()
    const row = getDataAttrForMouseEvent(e, 'data-row-id')
    const col = getDataAttrForMouseEvent(e, 'data-planner-column')
    if (col) setColumn(parseInt(col, 10))
    setActiveRow(row)
  }

  const handleEventDrop = (e: DragEvent) => {
    const row = getDataAttrForMouseEvent(e, 'data-row-id')
    const col = getDataAttrForMouseEvent(e, 'data-planner-column')
    const d = getDataAttrForMouseEvent(e, 'data-planner-date')
    if (activeEvent && row != undefined && col != undefined && d != undefined) {
      const date = new Date(d)
      onDropEvent(activeEvent, row, col, date)
    }
  }

  const handlePlannerIntervalChange = (interval: PlannerInterval) => {
    onPlannerIntervalChange(interval)
  }

  return (
    <div className={className}>
      {/* START: background grid */}
      <Grid>
        <Column range={range.length + 1} isActive={false} />
        {range.map((date, index) => (
          <PlannerColumn
            key={index}
            range={range.length + 1}
            date={date}
            col={column}
            index={index}
          />
        ))}
      </Grid>
      {/* END: background grid */}
      <Wrapper>
        <PlannerHeader
          range={range}
          activeDate={activeDate}
          activeColumn={column}
          plannerInterval={plannerInterval}
          onHeaderClick={handleColumnHeaderClick}
          onHeaderDoubleClick={handleColumnHeaderDoubleClick}
          onPlannerIntervalChange={handlePlannerIntervalChange}
        />
        {events ? (
          events.map((row) => (
            <PlannerRow
              key={row.id}
              label={row.label}
              events={row.events}
              row={row}
              activeRow={activeRow}
              activeEvent={activeEvent}
              range={range}
              onEmptyClick={handleEmptyClick}
              onEventClick={handleEventClick}
              onEmptyDoubleClick={handleEmptyDoubleClick}
              onEventDoubleClick={handleEventDoubleClick}
              onRowHeaderClick={handleRowHeaderClick}
              onRowHeaderDoubleClick={handleRowHeaderDoubleClick}
              onDragOver={handleEventDragOver}
              onDrop={handleEventDrop}
            />
          ))
        ) : (
          <PlannerRow
            activeRow={activeRow}
            activeEvent={activeEvent}
            range={range}
            onEmptyClick={handleEmptyClick}
            onEventClick={handleEventClick}
            onEmptyDoubleClick={handleEmptyDoubleClick}
            onEventDoubleClick={handleEventDoubleClick}
            onRowHeaderClick={handleRowHeaderClick}
            onRowHeaderDoubleClick={handleRowHeaderDoubleClick}
            onDragOver={handleEventDragOver}
            onDrop={handleEventDrop}
          />
        )}
      </Wrapper>
    </div>
  )
}

export default styled(Planner)`
  box-sizing: border-box;
  position: relative;
  border-radius: 2px;
  box-shadow: ${({ theme }) => theme.shadow.up.one};
  background: ${({ theme }) => theme.color.blue[500]};
`

const Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  z-index: 1;
`

const Grid = styled.div`
  box-sizing: border-box;
  z-index: 0;
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`
