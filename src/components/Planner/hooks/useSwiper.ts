import { useEffect, useState, useRef } from 'react'
import { subDays, addDays, subYears, addYears } from 'date-fns'
import { Swiper } from 'swiper/bundle'
import { VirtualData } from 'swiper/types/components/virtual'
import { PlannerInterval } from '../types'

export default function useSwiper(
  activeDate: Date,
  range: Date[],
  plannerInterval: PlannerInterval,
  onRangeChange: (date: Date) => void,
) {
  const swiperRef = useRef<Swiper>()
  const [shouldInitSwiper, setShouldInitSwiper] = useState(true)
  const [currentRange, setCurrentRange] = useState(range)
  const [currentInterval, setCurrentInterval] = useState(plannerInterval)
  const [hasSlideTransitionEnd, setSlideTransitionEnd] = useState(true)
  const [virtualData, setVirtualData] = useState<VirtualData>()

  useEffect(() => {
    function initSwiper() {
      swiperRef.current?.destroy(true, true)
      const swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        slidesPerColumnFill: 'row',
        touchStartPreventDefault: false,
        speed: 250,
        mousewheel: {
          sensitivity: 0.5,
        },
        initialSlide: 1,
        runCallbacksOnInit: false,
        virtual: {
          slides: [
            range.map((date) => subDays(date, range.length)),
            range,
            range.map((date) => addDays(date, range.length)),
          ],
          renderExternal(data) {
            setVirtualData(data)
          },
        },
        on: {
          slideChangeTransitionStart: (swiper: Swiper) => {
            const { from, to } = swiper.virtual
            if (from === 1 && to === 2) {
              const add = plannerInterval === 'year' ? addYears : addDays
              const length = plannerInterval === 'year' ? 1 : range.length
              onRangeChange(add(activeDate, length))
            } else {
              const sub = plannerInterval === 'year' ? subYears : subDays
              const length = plannerInterval === 'year' ? 1 : range.length
              onRangeChange(sub(activeDate, length))
            }
            setSlideTransitionEnd(false)
          },
          slideChangeTransitionEnd: () => {
            setSlideTransitionEnd(true)
          },
        },
      })
      swiperRef.current = swiper
    }

    if (shouldInitSwiper) {
      initSwiper()
      setShouldInitSwiper(false)
    }

    if (currentRange !== range && hasSlideTransitionEnd) {
      setCurrentRange(range)
      setShouldInitSwiper(true)
    }

    if (currentInterval !== plannerInterval && hasSlideTransitionEnd) {
      setCurrentInterval(plannerInterval)
      setShouldInitSwiper(true)
    }
  }, [
    activeDate,
    range,
    plannerInterval,
    currentRange,
    currentInterval,
    shouldInitSwiper,
    hasSlideTransitionEnd,
    onRangeChange,
  ])
  return [virtualData]
}
