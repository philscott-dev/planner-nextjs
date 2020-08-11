/** @jsx jsx */
import { FC, MouseEvent, DragEvent } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import PlannerEventRow from './PlannerEventRow'
import PlannerRowHeader from './PlannerRowHeader'
import PlannerRowWrapper from './PlannerRowWrapper'
import usePlannerEventRow from './hooks/usePlannerEventRow'
import { PlannerEvent, PlannerEventGroup, PlannerInterval } from './types'
import { Text } from 'lib'
import PlannerRowControls from './PlannerRowControls'

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
  return (
    <div className={className} data-row-id={row ? row.id : ''}>
      <PlannerRowHeader
        isActive={row ? row.id == activeRow : false}
        range={range.length + 1}
        onMouseDown={onRowHeaderClick}
        onDoubleClick={onRowHeaderDoubleClick}
      >
        <PlannerRowControls
          label={row ? row.label : ''}
          id={row ? row.id : ''}
          index={index}
          rowCount={rowCount}
          onRowUp={onRowUp}
          onRowDown={onRowDown}
          onRowRename={onRowRename}
          onRowDelete={onRowDelete}
        />
        <Text size="small">{row ? row.label : null}</Text>
      </PlannerRowHeader>
      <PlannerRowWrapper
        isActive={row ? row.id == activeRow : false}
        range={range.length + 1}
        onMouseDown={onEmptyClick}
        onDoubleClick={onEmptyDoubleClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {rows.map((rowEvents, index) => (
          <PlannerEventRow
            key={index}
            events={rowEvents}
            activeEvent={activeEvent}
            range={range}
            plannerInterval={plannerInterval}
            onEmptyClick={onEmptyClick}
            onEventClick={onEventClick}
            onEmptyDoubleClick={onEmptyDoubleClick}
            onEventDoubleClick={onEventDoubleClick}
          />
        ))}
      </PlannerRowWrapper>
    </div>
  )
}

export default styled(PlannerRow)`
  box-sizing: content-box;
  z-index: 0;
  display: flex;
  justify-content: flex-start;
  border-bottom: 2px solid black;
  min-height: 72px;

  &:last-child {
    /* border-bottom: none; */
  }
`
