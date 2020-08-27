/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useRef, MouseEvent } from 'react'
import { jsx } from '@emotion/react'
import { useIntersectionObserver } from 'hooks'

interface PlannerRowHeaderProps {
  className?: string
  isActive: boolean
  onMouseDown: (e: MouseEvent) => void
  onDoubleClick: (e: MouseEvent) => void
}
const PlannerRowHeader: FC<PlannerRowHeaderProps> = ({
  className,
  children,
  onMouseDown,
  onDoubleClick,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  //const isSticky = useIntersectionObserver(ref.current, null)

  return (
    <Wrapper
      ref={ref}
      className={className}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <Container>{children}</Container>
    </Wrapper>
  )
}

export default PlannerRowHeader

const Wrapper = styled.div<{ isSticky?: boolean }>`
  position: sticky;
  z-index: 150;
  top: 140px;
  box-sizing: border-box;
  display: flex;
  pointer-events: none;
  background: ${({ theme, isSticky }) =>
    isSticky ? theme.color.blue[700] : `${theme.color.blue[700]}4c`};
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 2px;
  padding: 2px 4px 2px 0;
  margin: 2px 4px 2px 4px;
`
