/** @jsx jsx */
import { FC, WheelEvent, useState, useEffect, useRef } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import Item from './Item'
import ItemWrapper from './ItemWrapper'
import ActionButton from './ActionButton'

const RATIO = 2.33333333333

interface TouchMoveProps {
  className?: string
}
const TouchMove: FC<TouchMoveProps> = ({ className }) => {
  const [deltaX, setDeltaX] = useState(0)
  const [image, setImage] = useState({ width: 0, height: 0, src: '' })
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let img = new Image()
    img.onload = function () {
      //@ts-ignore
      setImage({ width: this.width, height: this.height, src: this.src })
    }
    img.src = 'http://phrogz.net/tmp/gkhead.jpg'
    setImage(img)
  }, [])
  useEffect(() => {
    if (ref.current) {
      const el = ref?.current?.getBoundingClientRect()
      setWidth(el.width)
    }
  }, [ref])
  const onSwipe = (e: WheelEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const delta = e.deltaX + deltaX
    setDeltaX(delta > 30 ? 100 : 0)
  }

  const handleItemClick = () => {
    document.body.innerHTML = `<img src="${image.src}" style="position:absolute;width:100%;height:100%;z-index:100;background:#000;object-fit:contain;"></div>`
  }

  const handleActionClick = () => {
    setDeltaX(0)
  }
  return (
    <Wrapper
      ref={ref}
      height={width / RATIO}
      className={className}
      onWheel={onSwipe}
    >
      <ItemWrapper left={deltaX} width={width}>
        <Item src={image.src} width={width} onClick={handleItemClick} />
        <ActionButton onClick={handleActionClick} />
      </ItemWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ height: number }>`
  position: relative;
  overflow-x: hidden;
  white-space: nowrap;
  height: 150px;
  width: 100%;
  background: white;
`

export default TouchMove
