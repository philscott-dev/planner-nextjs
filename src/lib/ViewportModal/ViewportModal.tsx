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
  id?: number | string
  index: number
  onCancel: (index: number) => void
  onDelete?: (index: number) => void
  onClone: (index: number) => void
  onConfirm: (index: number) => void
}

const ViewportModal: FC<ViewportModalProps> = ({
  className,
  children,
  title,
  id,
  index,
  onCancel,
  onDelete,
  onClone,
  onConfirm,
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

  const handleClone = () => {
    onClone(index)
  }

  const handleConfirm = () => {
    onConfirm(index)
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
        id={id}
        title={title}
        isMinimized={isMinimized}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        onClose={handleCancel}
        onDelete={handleDelete}
        onClone={handleClone}
      />
      {!isMinimized ? (
        <>
          <ViewportModalBody>{children}</ViewportModalBody>
          <ViewportModalActionBar
            onCancel={handleCancel}
            onConfirm={handleConfirm}
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
  position: fixed;
  max-height: 850px;
  height: 100%;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  width: ${({ isMinimized }) => (!isMinimized ? '768px' : 0)};
  box-shadow: ${({ theme }) => theme.shadow.up.two};
  background: ${({ theme }) => theme.color.blue[500]};
  transition: ${({ theme }) => theme.transition.all};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    max-height: 100vh;
    margin: 0;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`

export default ViewportModal
