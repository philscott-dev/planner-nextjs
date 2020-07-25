/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'
import { Text } from 'lib'
import { format } from 'date-fns'

interface PlannerHeaderMonthProps {
  date?: Date
  className?: string
}

const PlannerHeaderMonth: FC<PlannerHeaderMonthProps> = ({
  date,
  className,
}) => {
  return (
    <div className={className}>
      <Text align="center">{date ? format(date, 'MMM') : null}</Text>
    </div>
  )
}

export default styled(PlannerHeaderMonth)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  /* background: ${({ theme }) => theme.color.blue[600]};
  border-right: 2px solid black; */
`
