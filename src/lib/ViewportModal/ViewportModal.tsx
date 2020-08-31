/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC, useState } from 'react'
import ViewportModalTitleBar from './ViewportModalTitleBar'
import ViewportModalActionBar from './ViewportModalActionBar'
import ViewportModalBody from './ViewportModalBody'

interface ViewportModalProps {
  className?: string
  title?: string
  index: number
  onCancel: (index: number) => void
  onDelete?: (index: number) => void
}

const ViewportModal: FC<ViewportModalProps> = ({
  className,
  children,
  title,
  index,
  onCancel,
  onDelete,
}) => {
  const [isMinimized, setMinimized] = useState(false)

  const handleCancel = () => {
    onCancel(index)
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(index)
    }
  }

  const handleMinimize = () => {
    setMinimized(true)
  }

  const handleMaximize = () => {
    setMinimized(false)
  }

  return (
    <Container isMinimized={isMinimized} className={className}>
      <ViewportModalTitleBar
        title={title}
        isMinimized={isMinimized}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        onClose={handleCancel}
        onDelete={handleDelete}
      />
      {!isMinimized ? (
        <>
          <ViewportModalBody>{children}</ViewportModalBody>
          <ViewportModalActionBar
            onCancel={handleCancel}
            onDelete={onDelete ? handleDelete : undefined}
          />
        </>
      ) : null}
    </Container>
  )
}

interface ContainerProps {
  isMinimized: boolean
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  width: ${({ isMinimized }) => (!isMinimized ? '768px' : 0)};
  /* height: ${({ isMinimized }) => (!isMinimized ? '600px' : 0)}; */
  box-shadow: ${({ theme }) => theme.shadow.up.two};
  background: ${({ theme }) => theme.color.blue[500]};
  transition: ${({ theme }) => theme.transition.all};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    margin: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`

export default ViewportModal
