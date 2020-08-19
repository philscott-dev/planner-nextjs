/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'
import { FiPlus, FiX } from 'react-icons/fi'

interface AddEventButtonProps {
  className?: string
  isVisible: boolean
  onMouseDown: () => void
}
const AddEventButton: FC<AddEventButtonProps> = ({
  className,
  isVisible,
  onMouseDown,
}) => {
  return (
    <button className={className} onMouseDown={onMouseDown}>
      {isVisible ? <FiX /> : <FiPlus />}
    </button>
  )
}

export default styled(AddEventButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-size: 24px;
  height: 56px;
  width: 56px;
  border-radius: 56px;
  border: 0;
  outline: none;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[400]};
`
