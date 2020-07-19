/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent } from 'react'
import { jsx, css } from '@emotion/react'
import { Text } from 'components'
import { PlannerEvent } from './types'
import { format } from 'date-fns'
import { lightenColor } from 'helpers/color'

interface PlannerEventBlockProps {
  className?: string
  event?: PlannerEvent
  activeEvent?: PlannerEvent
  size: number
  range: number
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
  onEmptyClick,
  onEventClick,
  onEmptyDoubleClick,
  onEventDoubleClick,
}) => {
  const handleEmptyClick = (e: MouseEvent) => {
    e.stopPropagation()
    onEmptyClick(e)
  }

  const handleEventClick = (e: MouseEvent, event: PlannerEvent) => {
    e.stopPropagation()
    onEventClick(e, event)
  }

  return event ? (
    <BlockWrapper
      className={className}
      size={size}
      range={range}
      onMouseDown={(e) => handleEventClick(e, event)}
      onDoubleClick={(e) => onEventDoubleClick(e, event)}
    >
      <Block
        draggable
        isActive={event.id === activeEvent?.id}
        color={event.color}
      >
        <Text ellipsis size="small" css={textCss}>
          {event.title}
        </Text>
        <Text.Light ellipsis size="small" css={textCss}>
          {format(event.startTime, formatString)} -{' '}
          {format(event.endTime, formatString)}
        </Text.Light>
      </Block>
    </BlockWrapper>
  ) : (
    <Empty
      size={size}
      range={range}
      onMouseDown={handleEmptyClick}
      onDoubleClick={onEmptyDoubleClick}
    />
  )
}

interface BlockProps {
  size: number
  range: number
}
const Empty = styled.div<BlockProps>`
  box-sizing: border-box;
  min-width: ${({ size, range }) => `calc(${size / range} * 100%)`};
  height: 100%;
  user-select: none;
`

const BlockWrapper = styled.div<BlockProps>`
  box-sizing: border-box;
  min-width: ${({ size, range }) => `calc(${size / range} * 100%)`};
  height: 100%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 4px;
  padding-right: 4px;
  user-select: none;
`

const Block = styled.div<{ color: string; isActive: boolean }>`
  box-sizing: border-box;
  height: 100%;
  padding: 8px;
  background: ${({ color, isActive }) =>
    !isActive ? color : lightenColor(color, 40)};
  cursor: pointer;
`

const textCss = css`
  pointer-events: none;
  user-select: none;
`

export default PlannerEventBlock
