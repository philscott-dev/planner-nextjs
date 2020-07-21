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
  flex: 1;
  background-color: 'blue';
`
