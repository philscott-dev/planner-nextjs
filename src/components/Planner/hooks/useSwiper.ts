import { useEffect, useState, useRef } from 'react'
import { subDays, addDays } from 'date-fns'
import { Swiper } from 'swiper/bundle'
import { VirtualData } from 'swiper/types/components/virtual'

export default function useSwiper(
  activeDate: Date,
  range: Date[],
  onRangeChange: (date: Date) => void,
) {
  const swiperRef = useRef<Swiper>()
  const [isInitialRender, setInitialRender] = useState(false)
  const [hasSlideNextTransitionEnd, setSlideNextTransitionEnd] = useState(false)
  const [hasSlidePrevTransitionEnd, setSlidePrevTransitionEnd] = useState(false)
  const [didReachBeginning, setReachBeginning] = useState(false)
  const [didReachEnd, setReachEnd] = useState(false)
  const [virtualData, setVirtualData] = useState<VirtualData>()
  useEffect(() => {
    function initSwiper() {
      console.log('triggered')
      const swiper = new Swiper('.swiper-container', {
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
          slideNextTransitionStart: () => {
            setSlideNextTransitionEnd(false)
          },
          slideNextTransitionEnd: () => {
            setSlideNextTransitionEnd(true)
          },
          reachBeginning: (swiper: Swiper) => {
            onRangeChange(subDays(activeDate, range.length))
            setSlidePrevTransitionEnd(false)
            setReachBeginning(true)
          },
          slidePrevTransitionStart: () => {
            setSlidePrevTransitionEnd(false)
          },
          slidePrevTransitionEnd: (swiper: Swiper) => {
            setSlidePrevTransitionEnd(true)
          },
          reachEnd: (swiper: Swiper) => {
            onRangeChange(addDays(activeDate, range.length))
            setSlideNextTransitionEnd(false)
            setReachEnd(true)
          },
        },
      })
      swiperRef.current = swiper
    }

    if (!isInitialRender) {
      initSwiper()
      setInitialRender(true)
    }

    if (didReachBeginning && hasSlidePrevTransitionEnd) {
      swiperRef.current?.destroy(true, true)
      initSwiper()
      setReachBeginning(false)
    }

    if (didReachEnd && hasSlideNextTransitionEnd) {
      swiperRef.current?.destroy(true, true)
      initSwiper()
      setReachEnd(false)
    }
  }, [
    activeDate,
    range,
    onRangeChange,
    isInitialRender,
    didReachBeginning,
    didReachEnd,
    hasSlideNextTransitionEnd,
    hasSlidePrevTransitionEnd,
  ])
  return [virtualData]
}
