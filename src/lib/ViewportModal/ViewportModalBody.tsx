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
  overflow-y: auto;
  box-sizing: border-box;
  padding: 24px 24px 0 24px;
  height: 100%;
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.xsmall}) {
    padding: 24px 16px 0 16px;
  }
`
