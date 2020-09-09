/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { jsx, css } from '@emotion/react'
import { Text } from 'lib'
import { PlannerEvent, PlannerInterval, PlannerLayout } from './types'
import { format, getDaysInMonth, getDaysInYear } from 'date-fns'
import { lightenColor } from 'helpers/color'
import useColorHash from './hooks/useColorHash'
import useBlockMeasurements from './hooks/useBlockMeasurements'
import usePlannerSize from './hooks/usePlannerSize'

interface PlannerEventBlockProps {
  className?: string
  event?: PlannerEvent
  activeEvent?: PlannerEvent
  plannerInterval: PlannerInterval
  plannerLayout: PlannerLayout
  plannerSize: number
  size: number
  range: Date[]
  onEmptyClick: (e: MouseEvent) => void
  onEventClick: (e: MouseEvent, plannerEvent: PlannerEvent) => void
  onEmptyDoubleClick: (e: MouseEvent) => void
  onEventDoubleClick: (e: MouseEvent, event: PlannerEvent) => void
}

const formatString = 'MMM d'

const PlannerEventBlock: FC<PlannerEventBlockProps> = ({
  className,
  event,
  activeEvent,
  size,
  range,
  plannerInterval,
  plannerLayout,
  plannerSize,
  onEmptyClick,
  onEventClick,
  onEmptyDoubleClick,
  onEventDoubleClick,
}) => {
  const color = useColorHash(event?.title)
  const [left, right] = useBlockMeasurements(plannerInterval, range, event)

  const handleEmptyClick = (e: MouseEvent) => {
    e.stopPropagation()
    //onEmptyClick(e)
  }

  const handleEventClick = (e: MouseEvent, event: PlannerEvent) => {
    e.stopPropagation()
    onEventClick(e, event)
  }
  return event ? (
    <BlockWrapper
      className={className}
      size={size}
      plannerSize={plannerSize}
      plannerInterval={plannerInterval}
      onMouseDown={(e) => handleEventClick(e, event)}
      onDoubleClick={(e) => onEventDoubleClick(e, event)}
    >
      <Block
        draggable
        isActive={event.id === activeEvent?.id}
        color={event.color || color}
        left={left}
        right={right}
        plannerInterval={plannerInterval}
        onMouseDown={(e) => handleEventClick(e, event)}
        onDoubleClick={(e) => onEventDoubleClick(e, event)}
      >
        <Text ellipsis size="small" css={textCss}>
          {event.title}
        </Text>
        {plannerLayout === 'standard' ? (
          <Text.Light ellipsis size="small" css={textCss}>
            {event.startTime && event.endTime
              ? `${format(event.startTime, formatString)} - ${format(
                  event.endTime,
                  formatString,
                )}`
              : null}
          </Text.Light>
        ) : null}
      </Block>
    </BlockWrapper>
  ) : (
    <Empty
      size={size}
      plannerSize={plannerSize}
      plannerInterval={plannerInterval}
      onMouseDown={handleEmptyClick}
      onDoubleClick={onEmptyDoubleClick}
    />
  )
}

interface BlockWrapProps {
  size: number
  plannerSize: number
  plannerInterval: PlannerInterval
}
const Empty = styled.div<BlockWrapProps>`
  box-sizing: border-box;
  min-width: ${({ size, plannerSize }) => `calc(${size / plannerSize} * 100%)`};
  height: 100%;
  user-select: none;
  pointer-events: none;
`

const BlockWrapper = styled.div<BlockWrapProps>`
  position: relative;
  box-sizing: border-box;
  min-width: ${({ size, plannerSize }) => `calc(${size / plannerSize} * 100%)`};
  padding: ${({ plannerInterval }) =>
    plannerInterval === 'year' ? '0.5px' : '4px'};
  border: ${({ plannerInterval }) =>
    plannerInterval === 'year' ? '0px solid transparent' : null};
  user-select: none;
  pointer-events: none;
`

interface BlockProps {
  color?: string
  isActive: boolean
  left?: string
  right?: string
  plannerInterval: PlannerInterval
}

const Block = styled.div<BlockProps>`
  box-sizing: border-box;
  height: 100%;
  padding: ${({ plannerInterval }) =>
    plannerInterval === 'year' ? '4px' : '8px'};
  background: ${({ color, isActive }) =>
    !isActive ? color : lightenColor(color, 40)};
  cursor: pointer;
  pointer-events: all;
`

const textCss = css`
  pointer-events: none;
  user-select: none;
`

export default PlannerEventBlock
