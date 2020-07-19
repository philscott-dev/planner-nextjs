/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'

interface PlannerFileExportProps {
  className?: string
}

const PlannerFileExport: FC<PlannerFileExportProps> = ({ className }) => {
  return <div className={className}></div>
}

export default styled(PlannerFileExport)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 64px;
  background: ${({ theme }) => theme.color.blue[700]};
`
