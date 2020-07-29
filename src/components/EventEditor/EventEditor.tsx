/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx, css } from '@emotion/react'
import { EventColors } from 'constants/colors'
import { capitalize } from 'helpers/string'
import { Entries } from 'lib/FormElements/types'
import { PlannerEvent, PlannerEventGroup } from 'lib/Planner/types'
import {
  ViewportModalContainer,
  ViewportModal,
  Input,
  Select,
  DateInput,
  H3,
  SelectPlaceholder,
} from 'lib'

interface EventEditorProps {
  events: PlannerEventGroup[]
  editableItems: PlannerEvent[]
  onCancel: (index: number) => void
  onConfirm: (entries: Entries, index: number) => void
  onDelete: (index: number) => void
}

const EventEditor: FC<EventEditorProps> = ({
  events,
  editableItems,
  onCancel,
  onConfirm,
  onDelete,
}) => {
  return (
    <ViewportModalContainer>
      {editableItems.map((item, index) => (
        <ViewportModal
          key={item.id}
          index={index}
          title={item.title}
          onCancel={onCancel}
          onConfirm={onConfirm}
          onDelete={onDelete}
        >
          <H3
            css={css`
              margin-left: 24px;
              margin-bottom: 32px;
            `}
          >
            Event Details
          </H3>
          <ModalWrapper>
            <Flex>
              <Input
                type="text"
                name="title"
                tabIndex={1}
                placeholder="Event Title"
                defaultValue={item.title}
              />
            </Flex>
            <Flex>
              <DateInput
                name="startTime"
                placeholder="Start Date"
                tabIndex={2}
                defaultValue={item.startTime}
              />
              <DateInput
                name="endTime"
                placeholder="End Date"
                tabIndex={3}
                defaultValue={item.endTime}
              />
            </Flex>
            <Flex>
              <Select
                placeholder="User"
                name="assigneeId"
                tabIndex={4}
                defaultValue={item.assigneeId}
              >
                <SelectPlaceholder text="Assign a User" />
                {events &&
                  events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.label}
                    </option>
                  ))}
              </Select>
            </Flex>
            <Flex>
              <Select
                placeholder="Color"
                name="color"
                tabIndex={5}
                defaultValue={item.color}
              >
                <SelectPlaceholder text="Pick a Color" />
                {Object.entries(EventColors).map((value, index) => {
                  return (
                    <option key={index} value={value[1]}>
                      {capitalize(value[0])}
                    </option>
                  )
                })}
              </Select>
            </Flex>
          </ModalWrapper>
        </ViewportModal>
      ))}
    </ViewportModalContainer>
  )
}

const Flex = styled.div`
  display: flex;
  margin-bottom: 32px;
  div:nth-of-type(2) {
    margin-left: 32px;
  }
`

const ModalWrapper = styled.div`
  padding: 0 24px;
`

export default EventEditor
