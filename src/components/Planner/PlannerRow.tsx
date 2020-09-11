/** @jsx jsx */
import { FC, MouseEvent, DragEvent } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import PlannerEventRow from './PlannerEventRow'
import PlannerRowHeader from './PlannerRowHeader'
import PlannerRowWrapper from './PlannerRowWrapper'
import usePlannerEventRow from './hooks/usePlannerEventRow'
import { Text } from 'lib'
import PlannerRowControls from './PlannerRowControls'
import {
  PlannerEvent,
  PlannerEventGroup,
  PlannerInterval,
  PlannerLayout,
} from './types'

interface PlannerRowProps {
  className?: string
  events?: PlannerEvent[]
  activeEvent?: PlannerEvent
  activeRow: string | number | undefined | null
  range: Date[]
  label?: string
  row: PlannerEventGroup
  index: number
  rowCount: number
  plannerInterval: PlannerInterval
  plannerLayout: PlannerLayout
  plannerSize: number
  onEmptyClick: (e: MouseEvent) => void
  onEventClick: (e: MouseEvent, plannerEvent: PlannerEvent) => void
  onEmptyDoubleClick: (e: MouseEvent) => void
  onEventDoubleClick: (e: MouseEvent, event: PlannerEvent) => void
  onRowHeaderClick: (e: MouseEvent) => void
  onRowHeaderDoubleClick: (e: MouseEvent) => void
  onDragOver: (e: DragEvent) => void
  onDrop: (e: DragEvent) => void
  onRowUp: (rowId: string | number, index: number) => void
  onRowDown: (rowId: string | number, index: number) => void
  onRowRename: (value: string, rowId: string | number, index: number) => void
  onRowDelete: (rowId: string | number, index: number) => void
}

const PlannerRow: FC<PlannerRowProps> = ({
  className,
  activeEvent,
  activeRow,
  range,
  row,
  index,
  rowCount,
  plannerInterval,
  plannerLayout,
  plannerSize,
  onEmptyClick,
  onEventClick,
  onEmptyDoubleClick,
  onEventDoubleClick,
  onRowHeaderClick,
  onRowHeaderDoubleClick,
  onDragOver,
  onDrop,
  onRowUp,
  onRowDown,
  onRowRename,
  onRowDelete,
}) => {
  const rows = usePlannerEventRow(plannerInterval, row?.events)
  const handleZIndex = (): number => {
    //gross fix for dropdown issues
    return Math.abs(rowCount - index)
  }
  return (
    <Row
      className={className}
      data-row-id={row ? row.id : ''}
      plannerLayout={plannerLayout}
      style={{ zIndex: handleZIndex() }}
    >
      <PlannerRowWrapper
        isActive={row ? row.id == activeRow : false}
        range={range.length + 1}
        onMouseDown={onEmptyClick}
        onDoubleClick={onEmptyDoubleClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <PlannerRowHeader
          isActive={row ? row.id == activeRow : false}
          label={row ? row.label : ''}
          id={row ? row.id : ''}
          index={index}
          rowCount={rowCount}
          onRowUp={onRowUp}
          onRowDown={onRowDown}
          onRowRename={onRowRename}
          onRowDelete={onRowDelete}
          onMouseDown={onRowHeaderClick}
          onDoubleClick={onRowHeaderDoubleClick}
        />
        <EventWrapper plannerLayout={plannerLayout}>
          {rows.map((rowEvents, index) => (
            <PlannerEventRow
              key={index}
              events={rowEvents}
              activeEvent={activeEvent}
              range={range}
              plannerInterval={plannerInterval}
              plannerLayout={plannerLayout}
              plannerSize={plannerSize}
              onEmptyClick={onEmptyClick}
              onEventClick={onEventClick}
              onEmptyDoubleClick={onEmptyDoubleClick}
              onEventDoubleClick={onEventDoubleClick}
            />
          ))}
        </EventWrapper>
      </PlannerRowWrapper>
    </Row>
  )
}

export default PlannerRow

const Row = styled.div<{ plannerLayout: PlannerLayout }>`
  position: relative;
  display: flex;
  box-sizing: content-box;
  z-index: 0;
  justify-content: flex-start;
  border-bottom: 2px solid black;
  min-height: ${({ plannerLayout }) =>
    plannerLayout === 'standard' ? '86px' : '66px'};
`

const EventWrapper = styled.div<{ plannerLayout: PlannerLayout }>`
  height: ${({ plannerLayout }) =>
    plannerLayout === 'stacked' ? '40px' : null};
`
