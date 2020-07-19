/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent } from 'react'
import { jsx } from '@emotion/react'
import { Text } from 'components'
import { PlannerInterval } from './types'
import { format } from 'date-fns'

interface PlannerHeaderDayProps {
  isActive?: boolean
  date: Date
  range: number
  headerFormat: string
  plannerInterval: PlannerInterval
  onMouseDown: (e: MouseEvent) => void
  onDoubleClick: (e: MouseEvent) => void
  className?: string
}

const PlannerHeaderDay: FC<PlannerHeaderDayProps> = ({
  isActive,
  date,
  range,
  headerFormat,
  plannerInterval,
  className,
  onMouseDown,
  onDoubleClick,
}) => {
  const dateString = format(date, headerFormat).split(' ')
  return (
    <Wrapper
      className={className}
      isActive={isActive}
      range={range}
      plannerInterval={plannerInterval}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <div>
        <Text size="small" align="center">
          {dateString[0]}
        </Text>
        <Text size="small" align="center">
          {dateString[1]}
        </Text>
      </div>
    </Wrapper>
  )
}

interface WrapperProps {
  range: number
  isActive?: boolean
  plannerInterval: PlannerInterval
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ range }) => `calc((100% - 140px) / ${range - 1})`};
  box-sizing: border-box;
  background: ${({ isActive, theme }) =>
    isActive ? theme.color.blue[700] : theme.color.blue[500]};
  border: ${({ isActive, theme }) =>
    isActive ? `1px solid ${theme.color.blue[300]}` : null};
  border-bottom: none;

  &:nth-of-type(odd) {
    > div > p {
      color: ${({ plannerInterval }) =>
        plannerInterval === 'month' ? 'transparent' : null};
    }
  }
`

export default PlannerHeaderDay