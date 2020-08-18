/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'
import { FiPlus } from 'react-icons/fi'

interface AddEventButtonProps {
  className?: string
  onMouseDown: () => void
}
const AddEventButton: FC<AddEventButtonProps> = ({
  className,
  onMouseDown,
}) => {
  return (
    <button className={className} onMouseDown={onMouseDown}>
      <FiPlus />
    </button>
  )
}

export default styled(AddEventButton)`
  z-index: 152;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 32px;
  right: 32px;
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
