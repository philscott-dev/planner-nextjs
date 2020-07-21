/** @jsx jsx */
import { FC, useMemo } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { getWeekOfMonth } from 'date-fns'

interface WeekProps {
  index?: number
  date?: Date
  shouldHighlight?: boolean
}

const Week: FC<WeekProps> = ({
  children,
  index,
  date,
  shouldHighlight = true,
}) => {
  const isActive = useMemo<boolean>(() => {
    if (date && shouldHighlight) {
      return getWeekOfMonth(date) - 1 === index
    }
    return false
  }, [date, index, shouldHighlight])
  return (
    <Tr isActive={isActive} role="row">
      {children}
    </Tr>
  )
}

const Tr = styled.tr<{ isActive: boolean }>`
  background: ${({ theme, isActive }) =>
    isActive ? theme.color.gray[300] + '50' : 'transparent'};
`

export default Week
