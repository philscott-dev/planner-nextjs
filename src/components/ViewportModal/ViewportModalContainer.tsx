/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'

interface ViewportModalContainerProps {
  className?: string
  modalWidth?: number
}

const ViewportModalContainer: FC<ViewportModalContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div className={className}>
      <Relative>{children}</Relative>
    </div>
  )
}

export default styled(ViewportModalContainer)`
  position: fixed;
  bottom: 0;
  max-height: 0;
  z-index: 150;
  overflow: visible;
`

const Relative = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  max-height: 0;
  width: 100vw;
  background: red;
`
