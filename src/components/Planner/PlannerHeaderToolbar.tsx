/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent, useState, createRef } from 'react'
import { jsx, css } from '@emotion/react'
import { Button } from 'components'
import { Picker, Controls, Calendar } from 'components/Datepicker'
import { PlannerInterval } from './types'
import { useOnClickOutside } from 'hooks'

interface PlannerHeaderToolbarProps {
  month: string
  year: string
  activeDate: Date
  onActiveDateChange: (date: Date) => void
  className?: string
  plannerInterval: PlannerInterval
  onPlannerIntervalChange: (plannerInterval: PlannerInterval) => void
}

const PlannerHeaderToolbar: FC<PlannerHeaderToolbarProps> = ({
  month,
  year,
  className,
  activeDate,
  onActiveDateChange,
  plannerInterval,
  onPlannerIntervalChange,
}) => {
  const pickerRef = createRef<HTMLDivElement>()
  const [isPickerVisible, setPickerVisibility] = useState<boolean>(false)
  useOnClickOutside(
    pickerRef,
    () => setPickerVisibility(false),
    isPickerVisible,
  )

  const handleIntervalChange = (e: MouseEvent<HTMLButtonElement>) => {
    onPlannerIntervalChange(e.currentTarget.value as PlannerInterval)
  }

  const handleRangeChange = (date: Date) => {
    onActiveDateChange(date)
  }

  const handleDateChange = (date: Date) => {
    onActiveDateChange(date)
    setPickerVisibility(false)
  }
  return (
    <div className={className}>
      <Flex>
        <PickerWrapper>
          <PickerButton
            onMouseDown={() => setPickerVisibility(!isPickerVisible)}
          >
            <Heading>{month}</Heading>
            <Heading css={subCss}>{year}</Heading>
          </PickerButton>
          <Picker ref={pickerRef} isVisible={isPickerVisible}>
            <Controls date={activeDate} onChange={handleRangeChange} />
            <Calendar date={activeDate} onSelectedDate={handleDateChange} />
          </Picker>
        </PickerWrapper>
      </Flex>
      <Flex>
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
          disabled
          value="year"
          isActive={plannerInterval === 'year'}
          onMouseDown={handleIntervalChange}
        >
          Year
        </IntButton>
      </Flex>
    </div>
  )
}

export default styled(PlannerHeaderToolbar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const PickerButton = styled.button`
  position: relative;
  display: flex;
  border: none;
  padding: 0;
  margin: 0;
  outline: 0;
  background: transparent;
  cursor: pointer;
`

const PickerWrapper = styled.div`
  position: relative;
`

const Flex = styled.div`
  display: flex;
`

const subCss = css`
  margin: 0 32px 0 8px;
  font-weight: 100;
`
const IntButton = styled(Button.Alt)`
  margin-left: 16px;
`
