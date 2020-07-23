/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'
import { IconButton, H3 } from 'lib'
import { FiX } from 'react-icons/fi'

interface ModalProps {
  title: string
  children: any
  isVisible: boolean
  onClose?: () => void
}

const Modal: FC<ModalProps> = ({ title, children, isVisible, onClose }) => {
  return (
    <Wrapper isVisible={isVisible}>
      <TitleBar>
        <H3>{title}</H3>
        {onClose ? (
          <IconButton onMouseDown={onClose}>
            <FiX />
          </IconButton>
        ) : null}
      </TitleBar>
      {children}
    </Wrapper>
  )
}

interface WrapperProps {
  isVisible: boolean
}

const Wrapper = styled.div<WrapperProps>`
  padding: 32px 40px;
  position: fixed;
  left: 0;
  right: 0;
  top: ${({ isVisible }) => (isVisible ? '50%' : '48%')};
  transform: translateY(-50%);
  margin: auto;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  background: ${({ theme }) => theme.color.blue[600]};
  box-shadow: ${({ theme }) => theme.shadow.up.two};
  z-index: 150;
`
const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  /* border-bottom: 1px solid */
`

export default Modal
