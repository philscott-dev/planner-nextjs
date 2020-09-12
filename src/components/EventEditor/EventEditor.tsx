/** @jsx jsx */
import styled from '@emotion/styled'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
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

export enum Submit {
  Confirm,
  Clone,
}

interface EventEditorProps {
  events: PlannerEventGroup[]
  editableItems: PlannerEvent[]
  onCancel: (index: number) => void
  onDelete: (index: number) => void
  onClone: (entries: Entries, index: number) => void
  onConfirm: (entries: Entries, index: number) => void
}

const EventEditor: FC<EventEditorProps> = ({
  events,
  editableItems,
  onCancel,
  onConfirm,
  onDelete,
  onClone,
}) => {
  const [issueType, setIssueType] = useState<string>()
  const [submitType, setSubmitType] = useState<Submit>()

  const handleSubmit = (entries: Entries) => {
    if (submitType === Submit.Confirm) {
      onConfirm(entries, 0)
    }

    if (submitType === Submit.Clone) {
      onClone(entries, 0)
    }
  }

  const handleSelectIssueType = (e: ChangeEvent<HTMLSelectElement>) => {
    setIssueType(e.currentTarget.value)
  }

  const handleConfirm = () => {
    setSubmitType(Submit.Confirm)
  }

  const handleClone = () => {
    setSubmitType(Submit.Clone)
  }

  return (
    <ViewportModalContainer>
      {editableItems.map((item, index) => (
        <Form
          key={item.id || index}
          loading={false}
          error={'error'}
          onSubmit={handleSubmit}
          autoComplete={'off'}
          rules={rules}
        >
          <ViewportModal
            index={index}
            id={item.id}
            title={item.title}
            onCancel={onCancel}
            onDelete={onDelete}
            onConfirm={handleConfirm}
            onClone={handleClone}
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
                <Error name="user" />
                <Select
                  placeholder="Assignee"
                  name="user"
                  tabIndex={4}
                  defaultValue={item.assigneeId}
                >
                  <SelectPlaceholder text="Assign a user" />
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
                  placeholder="Issue Type"
                  name="color"
                  tabIndex={5}
                  defaultValue={item.color}
                  onChange={handleSelectIssueType}
                >
                  <SelectPlaceholder text="Select an issue type" />
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
            {/* <Flex>
              <Wrap>
                <Error name="epic" />
                <Select
                  placeholder="Epic Link"
                  name="epic"
                  tabIndex={5}
                  defaultValue={item.color}
                  onChange={handleSelectIssueType}
                >
                  <SelectPlaceholder text="Select an epic to link" />
                  {Object.entries(EventColors).map((value, index) => {
                    return (
                      <option key={index} value={value[1]}>
                        {capitalize(value[0])}
                      </option>
                    )
                  })}
                </Select>
              </Wrap>
            </Flex> */}
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
                  placeholder="Due Date"
                  tabIndex={3}
                  defaultValue={item.endTime}
                />
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
