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
    <Row
      className={className}
      data-row-id={row ? row.id : ''}
      plannerLayout={plannerLayout}
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

        {rows.map((rowEvents, index) => (
          <PlannerEventRow
            key={index}
            events={rowEvents}
            activeEvent={activeEvent}
            range={range}
            plannerInterval={plannerInterval}
            plannerLayout={plannerLayout}
            onEmptyClick={onEmptyClick}
            onEventClick={onEventClick}
            onEmptyDoubleClick={onEmptyDoubleClick}
            onEventDoubleClick={onEventDoubleClick}
          />
        ))}
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
    plannerLayout === 'standard' ? '60px' : '40px'};
`
