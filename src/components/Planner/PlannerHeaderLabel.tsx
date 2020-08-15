/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'
import { Text } from 'lib'
import { format } from 'date-fns'
import { PlannerInterval } from './types'

interface PlannerHeaderLabelProps {
  date?: Date
  className?: string
  interval: PlannerInterval
}

const PlannerHeaderLabel: FC<PlannerHeaderLabelProps> = ({
  date,
  className,
  interval,
}) => {
  const displayFormat =
    interval === 'year'
      ? 'yyyy'
      : interval === 'month'
      ? 'MMM'
      : interval === 'week'
      ? 'MMM'
      : interval === 'day'
      ? 'MMM dd'
      : ''
  return (
    <div className={className}>
      <Text align="center">{date ? format(date, displayFormat) : null}</Text>
    </div>
  )
}

export default styled(PlannerHeaderLabel)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`
