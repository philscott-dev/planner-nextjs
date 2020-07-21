/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { Node } from './types'
import { FormButton, Form, Input } from 'lib'

interface EditPanelProps {
  className?: string
  nodes: Node[]
  activeId?: number
}
const EditPanel: FC<EditPanelProps> = ({ className, activeId }) => {
  const handleSubmit = (obj: any) => {
    console.log(obj)
  }
  return (
    <div className={className}>
      <Form
        loading={false}
        error={undefined}
        onSubmit={handleSubmit}
        autoComplete={'off'}
        rules={{}}
      >
        <Input
          inputSize="small"
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={activeId}
        />
        <Input inputSize="small" type="text" name="body" placeholder="Body" />
        <FormButton>Submit</FormButton>
      </Form>
    </div>
  )
}

export default styled(EditPanel)`
  min-width: 250px;
`
