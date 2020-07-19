/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC, useState } from 'react'
import ViewportModalTitleBar from './ViewportModalTitleBar'
import ViewportModalActionBar from './ViewportModalActionBar'
import ViewportModalBody from './ViewportModalBody'
import { Form } from 'components'
import { Entries } from 'components/FormElements/types'

interface ViewportModalProps {
  className?: string
  title?: string
  index: number
  onCancel: (index: number) => void
  onConfirm: (index: number) => void
}

const ViewportModal: FC<ViewportModalProps> = ({
  className,
  children,
  title,
  index,
  onCancel,
  onConfirm,
}) => {
  const [isMinimized, setMinimized] = useState(false)

  const handleCancel = () => {
    onCancel(index)
  }
  const handleConfirm = (e: Entries) => {
    console.log(e)
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
      <Form
        loading={false}
        error={undefined}
        onSubmit={handleConfirm}
        autoComplete={'off'}
        rules={{}}
      >
        <ViewportModalTitleBar
          title={title}
          isMinimized={isMinimized}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onClose={handleCancel}
        />
        {!isMinimized ? (
          <>
            <ViewportModalBody>{children}</ViewportModalBody>
            <ViewportModalActionBar onCancel={handleCancel} />
          </>
        ) : null}
      </Form>
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
  min-width: ${({ isMinimized }) => (!isMinimized ? '768px' : 0)};
  min-height: ${({ isMinimized }) => (!isMinimized ? '600px' : 0)};
  margin: 0 16px;
  z-index: 1;
  box-shadow: ${({ theme }) => theme.shadow.up.two};
  background: ${({ theme }) => theme.color.blue[500]};
  transition: all 0.3s ease-in-out;
`

export default ViewportModal
