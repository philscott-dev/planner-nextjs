/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'

interface ViewportModalProps {
  className?: string
  modalWidth: number
}

const ViewportModal: FC<ViewportModalProps> = ({ className }) => {
  return <div className={className}></div>
}

export default styled(ViewportModal)`
  position: fixed;
  bottom: 0;
  height: 100px;
  background: green;
  z-index: 1;
`
