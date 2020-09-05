/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'

interface ViewportModalBodyProps {
  className?: string
}

const ViewportModalBody: FC<ViewportModalBodyProps> = ({
  className,
  children,
}) => {
  return <div className={className}>{children}</div>
}

export default styled(ViewportModalBody)`
  position: sticky;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 24px 12px 0 12px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.xsmall}) {
    padding: 24px 8px 0 8px;
  }
`
