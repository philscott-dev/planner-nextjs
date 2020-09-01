/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx, css } from '@emotion/react'
import { EventColors } from 'constants/colors'
import { capitalize } from 'helpers/string'
import { Entries } from 'lib/FormElements/types'
import { rules } from './rules'
import { PlannerEvent, PlannerEventGroup } from 'components/Planner/types'
import {
  ViewportModalContainer,
  ViewportModal,
  Input,
  Select,
  DateInput,
  Textarea,
  SelectPlaceholder,
  Form,
  Error,
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
  const handleConfirm = (entries: Entries) => {
    console.log(entries)
    onConfirm(entries, 0)
  }

  return (
    <ViewportModalContainer>
      {editableItems.map((item, index) => (
        <Form
          key={item.id}
          loading={false}
          error={'error'}
          onSubmit={handleConfirm}
          autoComplete={'off'}
          rules={rules}
        >
          <ViewportModal
            index={index}
            title={item.title}
            onCancel={onCancel}
            onDelete={onDelete}
          >
            <Flex>
              <Wrap>
                <Error name="summary" />
                <Input
                  type="text"
                  name="summary"
                  tabIndex={1}
                  placeholder="Summary"
                  defaultValue={item.title}
                />
              </Wrap>
            </Flex>
            <Flex>
              <Wrap>
                <Error name="startTime" />
                <DateInput
                  name="startTime"
                  placeholder="Start Date"
                  tabIndex={2}
                  defaultValue={item.startTime}
                />
              </Wrap>
              <Wrap>
                <Error name="endTime" />
                <DateInput
                  name="endTime"
                  placeholder="End Date"
                  tabIndex={3}
                  defaultValue={item.endTime}
                />
              </Wrap>
            </Flex>
            <Flex>
              <Wrap>
                <Error name="user" />
                <Select
                  placeholder="User"
                  name="user"
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
              </Wrap>
              <Wrap>
                <Error name="color" />
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
              </Wrap>
            </Flex>
            <Flex>
              <Wrap>
                <Error name="description" />
                <Textarea
                  name="description"
                  placeholder="Description"
                  tabIndex={6}
                />
              </Wrap>
            </Flex>
          </ViewportModal>
        </Form>
      ))}
    </ViewportModalContainer>
  )
}

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  > div {
    margin: 16px 16px 24px 16px;
  }
`

const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export default EventEditor
