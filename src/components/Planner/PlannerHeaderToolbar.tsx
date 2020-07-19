/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent } from 'react'
import { jsx, css } from '@emotion/react'
import { Button } from 'components'
import { PlannerInterval } from './types'

interface PlannerHeaderToolbarProps {
  month: string
  year: string
  className?: string
  plannerInterval: PlannerInterval
  onPlannerIntervalChange: (plannerInterval: PlannerInterval) => void
}

const PlannerHeaderToolbar: FC<PlannerHeaderToolbarProps> = ({
  month,
  year,
  className,
  plannerInterval,
  onPlannerIntervalChange,
}) => {
  console.log(month, year)
  const handleIntervalChange = (e: MouseEvent<HTMLButtonElement>) => {
    onPlannerIntervalChange(e.currentTarget.value as PlannerInterval)
  }
  return (
    <div className={className}>
      <Heading>{month}</Heading>
      <Heading css={subCss}>{year}</Heading>
      <IntButton
        value="week"
        isActive={plannerInterval === 'week'}
        onMouseDown={handleIntervalChange}
      >
        Week
      </IntButton>
      <IntButton
        value="month"
        isActive={plannerInterval === 'month'}
        onMouseDown={handleIntervalChange}
      >
        Month
      </IntButton>
      <IntButton
        value="year"
        isActive={plannerInterval === 'year'}
        onMouseDown={handleIntervalChange}
      >
        Year
      </IntButton>
    </div>
  )
}

export default styled(PlannerHeaderToolbar)`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.color.blue[700]};
  padding: 24px;
`
const Heading = styled.h2`
  text-align: inherit;
  font-size: 32px;
  line-height: 42px;
  margin: 0;
  font-weight: 300;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    font-size: 26px;
    line-height: 28px;
  }
`
const subCss = css`
  margin: 0 32px 0 8px;
  font-weight: 100;
`
const IntButton = styled(Button.Alt)`
  margin-left: 16px;
`
