/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'
import { H1, Button } from 'components'

interface PlannerFileImportProps {
  className?: string
}

const PlannerFileImport: FC<PlannerFileImportProps> = ({ className }) => {
  return (
    <div className={className}>
      <H1>Import</H1>
      <Input type="file" accept=".json,application/json" />

      <Button.Primary>Cancel</Button.Primary>
      <Button.Primary>Confirm</Button.Primary>
    </div>
  )
}

export default styled(PlannerFileImport)`
  position: absolute;
  top: 0;
  width: 500px;
  left: 50%;
  margin-left: -250px;
  padding: 0 32px 24px 32px;
  align-items: center;
  background: ${({ theme }) => theme.color.blue[700]};
  z-index: 150;
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.shadow.up.two};
`

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.color.white[100]};
`
