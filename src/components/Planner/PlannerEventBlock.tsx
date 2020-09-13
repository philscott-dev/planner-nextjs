/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent, useState, useEffect } from 'react'
import { jsx, css } from '@emotion/react'
import { Text } from 'lib'
import { PlannerEvent, PlannerInterval, PlannerLayout } from './types'
import { format } from 'date-fns'
import { lightenColor } from 'helpers/color'
import useColorHash from './hooks/useColorHash'
import useBlockMeasurements from './hooks/useBlockMeasurements'
import usePlannerSize from './hooks/usePlannerSize'
import PlannerEventTooltip from './PlannerEventTooltip'

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
  const [dateRangeString, setDateRangeString] = useState<string>()
  const [isHovered, setHovered] = useState<boolean>(false)
  useEffect(() => {
    if (event) {
      const string =
        event.startTime && event.endTime
          ? `${format(event.startTime, formatString)} - ${format(
              event.endTime,
              formatString,
            )}`
          : undefined

      setDateRangeString(string)
    }
  }, [event])

  const handleEmptyClick = (e: MouseEvent) => {
    e.stopPropagation()
    //onEmptyClick(e)
  }

  const handleEventClick = (e: MouseEvent, event: PlannerEvent) => {
    e.stopPropagation()
    onEventClick(e, event)
  }

  const handleMouseOver = (e: MouseEvent<HTMLDivElement>) => {
    // get the text node
    const p1 = e.currentTarget.childNodes[0] as HTMLParagraphElement
    const p2 = e.currentTarget.childNodes[1] as HTMLParagraphElement

    // make it full width, removing ellipses
    p1.style.display = 'inline'
    p1.style.width = 'auto'
    if (p2) {
      p2.style.display = 'inline'
      p2.style.width = 'auto'
    }

    // take width measurements
    const w1 = e.currentTarget.offsetWidth
    const w2 = Math.max(p1.offsetWidth, p2?.offsetWidth ?? 0)

    // reset the text to ellipses
    p1.style.display = 'block'
    p1.style.width = 'initial'
    if (p2) {
      p2.style.display = 'block'
      p2.style.width = 'initial'
    }

    // if text plus 8px padding is longer than container
    if (w2 + 8 > w1) {
      setHovered(true)
    }
  }

  const handleMouseOut = () => {
    setHovered(false)
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
        onDoubleClick={(e) => onEventDoubleClick(e, event)}
        onMouseDown={(e) => handleEventClick(e, event)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Text ellipsis size="small" css={textCss}>
          {event.title}
        </Text>
        {plannerLayout === 'standard' ? (
          <Text.Light ellipsis size="small" css={textCss}>
            {dateRangeString}
          </Text.Light>
        ) : null}
      </Block>
      <PlannerEventTooltip
        isActive={event.id === activeEvent?.id}
        isHovered={isHovered}
        color={event.color || color}
        title={event.title}
        dateRangeString={dateRangeString}
        plannerInterval={plannerInterval}
        plannerLayout={plannerLayout}
      />
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
  box-sizing: border-box;
  min-width: ${({ size, plannerSize }) => `calc(${size / plannerSize} * 100%)`};
  padding: ${({ plannerInterval }) =>
    plannerInterval === 'year' ? '4px 0' : '4px'};
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
    plannerInterval === 'year' ? '8px 0' : '8px 0'};
  background: ${({ color, isActive }) =>
    !isActive ? color : lightenColor(color, 40)};
  cursor: pointer;
  pointer-events: all;
  overflow: hidden;
`

const textCss = css`
  pointer-events: none;
  user-select: none;
  margin-left: 8px;
`

export default PlannerEventBlock
