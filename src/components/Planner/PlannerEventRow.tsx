/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent } from 'react'
import { jsx } from '@emotion/react'
import { PlannerEvent, PlannerInterval, PlannerLayout } from './types'
import PlannerEventBlock from './PlannerEventBlock'
import usePlannerEventBlock from './hooks/usePlannerEventBlock'
import usePlannerBlocks from './hooks/usePlannerBlocks'

interface PlannerEventRowProps {
  className?: string
  events: PlannerEvent[]
  activeEvent?: PlannerEvent
  range: Date[]
  plannerInterval: PlannerInterval
  plannerLayout: PlannerLayout
  onEmptyClick: (e: MouseEvent) => void
  onEventClick: (e: MouseEvent, plannerEvent: PlannerEvent) => void
  onEmptyDoubleClick: (e: MouseEvent) => void
  onEventDoubleClick: (e: MouseEvent, event: PlannerEvent) => void
}

const PlannerEventRow: FC<PlannerEventRowProps> = ({
  className,
  events,
  activeEvent,
  range,
  plannerInterval,
  plannerLayout,
  onEmptyClick,
  onEventClick,
  onEmptyDoubleClick,
  onEventDoubleClick,
}) => {
  const blocks = usePlannerBlocks(range, events, plannerInterval)

  if (!blocks.length) return null
  return (
    <EventRow className={className} plannerLayout={plannerLayout}>
      {blocks.map((block, index) => (
        <PlannerEventBlock
          key={index}
          size={block.size}
          range={range}
          event={block.event}
          plannerInterval={plannerInterval}
          plannerLayout={plannerLayout}
          activeEvent={activeEvent}
          onEmptyClick={onEmptyClick}
          onEventClick={onEventClick}
          onEmptyDoubleClick={onEmptyDoubleClick}
          onEventDoubleClick={onEventDoubleClick}
        />
      ))}
    </EventRow>
  )
}

export default PlannerEventRow

const EventRow = styled.div<{ plannerLayout: PlannerLayout }>`
  position: ${({ plannerLayout }) =>
    plannerLayout === 'stacked' ? 'absolute' : 'relative'};
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: ${({ plannerLayout }) =>
    plannerLayout === 'standard' ? '60px' : '40px'};
`
