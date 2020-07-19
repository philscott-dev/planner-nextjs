/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'

interface ViewportModalProps {
  className?: string
  modalWidth: number
}

const ViewportModal: FC<ViewportModalProps> = ({ className }) => {
  return (
    <div className={className}>
      <Relative>
        <Item />
      </Relative>
    </div>
  )
}

export default styled(ViewportModal)`
  position: sticky;
  bottom: 0;
  height: 10px;
  background: red;
  z-index: 2;
  overflow: visible;
`

const Relative = styled.div`
  position: relative;
  height: 5px;
  width: 100vw;
  background: green;
`

const Item = styled.div`
  height: 40px;
  width: 40px;
`
