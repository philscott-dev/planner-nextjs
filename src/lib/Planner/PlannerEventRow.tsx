/** @jsx jsx */
import { FC, MouseEvent } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import PlannerEventBlock from './PlannerEventBlock'
import { PlannerEvent, PlannerInterval } from './types'
import usePlannerEventBlock from './hooks/usePlannerEventBlock'
import useNewPlannerEventBlock from './hooks/_useNewPlannerEventBlock'

interface PlannerEventRowProps {
  className?: string
  events: PlannerEvent[]
  activeEvent?: PlannerEvent
  range: Date[]
  plannerInterval: PlannerInterval
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
  onEmptyClick,
  onEventClick,
  onEmptyDoubleClick,
  onEventDoubleClick,
}) => {
  //const blocks = usePlannerEventBlock(range, events)
  const blocks = useNewPlannerEventBlock(range, events, plannerInterval)

  if (!blocks.length) return null
  return (
    <div className={className}>
      {blocks.map((block, index) => (
        <PlannerEventBlock
          key={index}
          size={block.size}
          range={range.length}
          event={block.event}
          activeEvent={activeEvent}
          onEmptyClick={onEmptyClick}
          onEventClick={onEventClick}
          onEmptyDoubleClick={onEmptyDoubleClick}
          onEventDoubleClick={onEventDoubleClick}
        />
      ))}
    </div>
  )
}

export default styled(PlannerEventRow)`
  box-sizing: border-box;
  display: flex;
  position: relative;
  width: 100%;
  height: 72px;
`
