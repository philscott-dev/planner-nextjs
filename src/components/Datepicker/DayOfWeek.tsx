/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'

export interface DayOfWeekProps {
  day: string
}

const DayOfWeek: FC<DayOfWeekProps> = ({ day }) => {
  return (
    <Th key={day} role="columnheader" aria-label={day}>
      <Abbr title={day}>{day.slice(0, 2)}</Abbr>
    </Th>
  )
}

const Th = styled.th`
  background: ${({ theme }) => theme.color.blue[600]};
`
const Abbr = styled.abbr`
  width: 32px;
  height: 32px;
  font-size: 14px;
  font-weight: 500;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
`
export default DayOfWeek
