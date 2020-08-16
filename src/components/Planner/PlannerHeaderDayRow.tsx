/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent } from 'react'
import { jsx } from '@emotion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import PlannerHeaderDay from './PlannerHeaderDay'
import { PlannerInterval } from './types'

interface PlannerHeaderDayRowProps {
  className?: string
  plannerInterval: PlannerInterval
  dayFormat: string
  activeColumn?: number
  range: Date[]
  onDayClick: (e: MouseEvent) => void
  onDayDoubleClick: (e: MouseEvent) => void
}
const PlannerHeaderDayRow: FC<PlannerHeaderDayRowProps> = ({
  className,
  range,
  dayFormat,
  plannerInterval,
  activeColumn,
  onDayClick,
  onDayDoubleClick,
}) => {
  return (
    <div className={className}>
      <Swiper>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
      {range.map((date, index) => (
        <PlannerHeaderDay
          key={index}
          date={date}
          plannerInterval={plannerInterval}
          dayFormat={dayFormat}
          isActive={activeColumn === index}
          range={range.length + 1}
          onMouseDown={onDayClick}
          onDoubleClick={onDayDoubleClick}
        />
      ))}
    </div>
  )
}

export default styled(PlannerHeaderDayRow)`
  box-sizing: border-box;
  position: sticky;
  top: 60px;
  display: flex;
  min-height: 80px;
  border-bottom: 2px solid black;
  z-index: 1;
  &:nth-of-type(1) {
    > p {
      color: ${({ theme }) => theme.color.blue[500]};
    }
  }
`
