import styled from '@emotion/styled'
import { renderToString } from 'react-dom/server'
import React, { FC, MouseEvent, useEffect, useState, useRef } from 'react'
import { Swiper } from 'swiper/bundle'
import PlannerHeaderDay from './PlannerHeaderDay'
import { PlannerInterval } from './types'
import { subDays, addDays } from 'date-fns'
import { VirtualData } from 'swiper/types/components/virtual'

interface PlannerHeaderDayRowProps {
  className?: string
  plannerInterval: PlannerInterval
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
  activeDate,
  activeColumn,
  onDayClick,
  onDayDoubleClick,
  onRangeChange,
}) => {
  const swiperRef = useRef<Swiper>()
  const [hasSlideNextTransitionEnd, setSlideNextTransitionEnd] = useState(false)
  const [hasSlidePrevTransitionEnd, setSlidePrevTransitionEnd] = useState(false)
  const [didReachBeginning, setReachBeginning] = useState(false)
  const [didReachEnd, setReachEnd] = useState(false)
  const [virtualData, setVirtualData] = useState<VirtualData>()
  const [slides, setSlides] = useState([
    range.map((date) => subDays(date, 7)),
    range,
    range.map((date) => addDays(date, 7)),
  ])

  useEffect(() => {
    console.log('init')
    initSwiper()
  }, [])

  useEffect(() => {
    const beginning = didReachBeginning && hasSlidePrevTransitionEnd
    if (beginning) {
      swiperRef.current?.destroy(true, true)
      initSwiper()
      setReachBeginning(false)
    }
  }, [didReachBeginning, hasSlidePrevTransitionEnd])

  /* Swiper Methods */
  const initSwiper = () => {
    const swiper = new Swiper('.swiper-container', {
      mousewheel: {
        sensitivity: 0.5,
      },
      initialSlide: 1,
      runCallbacksOnInit: false,
      virtual: {
        slides,
        renderExternal(data) {
          setVirtualData(data)
        },
      },
      on: {
        slidePrevTransitionStart,
        slidePrevTransitionEnd,
        reachBeginning,
        slideNextTransitionStart,
        slideNextTransitionEnd,
        reachEnd,
      },
    })
    swiperRef.current = swiper
  }

  const reachEnd = (swiper: Swiper) => {
    console.log('reachEnd')
    setSlideNextTransitionEnd(false)
    setReachEnd(true)
    const endRange = swiper.virtual.slides[swiper.virtual.slides.length - 1]
    swiper.virtual.slides = [
      ...swiper.virtual.slides,
      endRange.map((date: Date) => addDays(date, range.length)),
    ]
  }

  const slideNextTransitionStart = () => {
    console.log('slideNextTransitionStart')
    //setSlideNextTransitionEnd(false)
  }
  const slideNextTransitionEnd = () => {
    console.log('slideNextTransitionEnd')
    //setSlideNextTransitionEnd(true)
  }

  const slidePrevTransitionStart = () => {
    console.log('slidePrevTransitionStart')
    setSlidePrevTransitionEnd(false)
  }

  const reachBeginning = (swiper: Swiper) => {
    console.log('reachBeginning')
    setSlidePrevTransitionEnd(false)
    setReachBeginning(true)
    // const startRange = swiper.virtual.slides[0]
    // swiper.virtual.slides = [
    //   startRange.map((date: Date) => subDays(date, range.length)),
    //   ...swiper.virtual.slides,
    // ]
  }

  const slidePrevTransitionEnd = (swiper: Swiper) => {
    console.log('slidePrevTransitionEnd')
    setSlidePrevTransitionEnd(true)
  }

  /* Day Methods */

  const handleDayClick = (e: MouseEvent) => {
    onDayClick(e)
  }

  const handleDayDoubleClick = (e: MouseEvent) => {
    onDayDoubleClick(e)
  }

  return (
    <div className={className}>
      <div className="swiper-container">
        <SwiperWrapper className="swiper-wrapper">
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
        </SwiperWrapper>
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
  z-index: 1;
  &:nth-of-type(1) {
    > p {
      color: ${({ theme }) => theme.color.blue[500]};
    }
  }
`

const SwiperWrapper = styled.div``
