/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx, css } from '@emotion/react'
import AddEventButton from './AddEventButton'
import { Dropdown, DropdownOption } from 'lib'
import { FaCalendarPlus } from 'react-icons/fa'
import { MdViewDay } from 'react-icons/md'

interface AddEventProps {
  className?: string
  onAddEvent: () => void
  onAddRow: () => void
}
const AddEvent: FC<AddEventProps> = ({ className, onAddEvent, onAddRow }) => {
  const handleAddEvent = () => {
    onAddEvent()
  }
  const handleAddRow = () => {
    onAddRow()
  }

  return (
    <div className={className}>
      <Wrapper>
        <Dropdown
          direction={['left', 'up']}
          bottom={60}
          renderNode={(onClick, isVisible) => (
            <AddEventButton isVisible={isVisible} onMouseDown={onClick} />
          )}
        >
          <DropdownOption onMouseDown={handleAddRow}>
            <MdViewDay css={iconCss} /> Add Row
          </DropdownOption>
          <DropdownOption onMouseDown={handleAddEvent}>
            <FaCalendarPlus css={iconCss} /> Add Event
          </DropdownOption>
        </Dropdown>
      </Wrapper>
    </div>
  )
}

export default styled(AddEvent)`
  z-index: 152;
  position: fixed;
  bottom: 32px;
  right: 32px;
`
const Wrapper = styled.div`
  position: relative;
`
const iconCss = css`
  margin-right: 8px;
`
