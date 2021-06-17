/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useEffect, useRef, useState } from 'react'
import { jsx, css } from '@emotion/react'
import AddEventButton from './AddEventButton'
import { Dropdown, DropdownOption } from 'lib'
import { FaCalendarPlus } from 'react-icons/fa'
import { MdViewDay } from 'react-icons/md'
import { useIntersectionObserver } from 'hooks'

interface AddEventProps {
  className?: string
  onAddEvent: () => void
  onAddRow: () => void
}
const AddEvent: FC<AddEventProps> = ({ className, onAddEvent, onAddRow }) => {
  const entry = useIntersectionObserver({
    element: '#planner__bottom',
  })

  console.log(entry?.isBottom)

  const handleAddEvent = () => {
    onAddEvent()
  }
  const handleAddRow = () => {
    onAddRow()
  }

  return (
    <Container className={className}>
      <Wrapper>
        <Dropdown
          direction={['left', 'up']}
          bottom={60}
          renderNode={(onClick, isVisible) => (
            <AddEventButton
              disabled={!entry?.isBottom}
              isVisible={isVisible}
              onMouseDown={onClick}
            />
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
    </Container>
  )
}

export default AddEvent

const Container = styled.div<{ disabled?: boolean }>`
  z-index: 152;
  position: fixed;
  bottom: 32px;
  right: 32px;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : null)};
`
const Wrapper = styled.div`
  position: relative;
`
const iconCss = css`
  margin-right: 8px;
`
