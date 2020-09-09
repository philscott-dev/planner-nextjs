import styled from '@emotion/styled'
import React, { FC, MouseEvent } from 'react'
import PlannerHeaderDay from './PlannerHeaderDay'
import { PlannerInterval } from './types'
import useSwiper from './hooks/useSwiper'

interface PlannerHeaderDayRowProps {
  className?: string
  plannerInterval: PlannerInterval
  plannerSize: number
  dayFormat: string
  activeDate: Date
  activeColumn?: number
  range: Date[]
  onDayClick: (e: MouseEvent) => void
  onDayDoubleClick: (e: MouseEvent) => void
  onRangeChange: (date: Date) => void
}
const PlannerHeaderDayRow: FC<PlannerHeaderDayRowProps> = ({
  className,
  range,
  dayFormat,
  plannerInterval,
  plannerSize,
  activeDate,
  activeColumn,
  onDayClick,
  onDayDoubleClick,
  onRangeChange,
}) => {
  const [virtualData] = useSwiper(
    activeDate,
    range,
    plannerInterval,
    onRangeChange,
  )

  const handleDayClick = (e: MouseEvent) => {
    onDayClick(e)
  }

  const handleDayDoubleClick = (e: MouseEvent) => {
    onDayDoubleClick(e)
  }

  return (
    <div className={className}>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {virtualData
            ? virtualData.slides.map((content: Date[], i) => (
                <div
                  className="swiper-slide"
                  key={i}
                  style={{ left: `${virtualData.offset}px` }}
                >
                  {content.map((date, index) => (
                    <PlannerHeaderDay
                      key={index}
                      date={date}
                      plannerInterval={plannerInterval}
                      plannerSize={plannerSize}
                      dayFormat={dayFormat}
                      isActive={activeColumn === index}
                      range={range}
                      onMouseDown={handleDayClick}
                      onDoubleClick={handleDayDoubleClick}
                    />
                  ))}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  )
}

export default styled(PlannerHeaderDayRow)`
  box-sizing: border-box;
  position: sticky;
  top: 60px;
  min-height: 80px;
  border-bottom: 2px solid black;
  width: 100%;
  z-index: 999;
  &:nth-of-type(1) {
    > p {
      color: ${({ theme }) => theme.color.blue[500]};
    }
  }
`
