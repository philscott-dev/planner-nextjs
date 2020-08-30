/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx, css } from '@emotion/react'
import { EventColors } from 'constants/colors'
import { capitalize } from 'helpers/string'
import { Entries } from 'lib/FormElements/types'
import { PlannerEvent, PlannerEventGroup } from 'components/Planner/types'
import {
  ViewportModalContainer,
  ViewportModal,
  Input,
  Select,
  DateInput,
  Textarea,
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
              <SelectPlaceholder text="Select a user" />
              {events &&
                events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.label}
                  </option>
                ))}
            </Select>
            <Select
              placeholder="Color"
              name="color"
              tabIndex={5}
              defaultValue={item.color}
            >
              <SelectPlaceholder text="Pick a color" />
              {Object.entries(EventColors).map((value, index) => {
                return (
                  <option key={index} value={value[1]}>
                    {capitalize(value[0])}
                  </option>
                )
              })}
            </Select>
          </Flex>
          <Flex>
            <Textarea
              name="description"
              placeholder="Description"
              tabIndex={3}
            />
          </Flex>
        </ViewportModal>
      ))}
    </ViewportModalContainer>
  )
}

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  > * {
    margin: 40px 16px 24px 16px;
  }
`

export default EventEditor
