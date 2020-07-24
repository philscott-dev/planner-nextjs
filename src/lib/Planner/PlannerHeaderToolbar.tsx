/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent, useState, createRef } from 'react'
import { jsx, css } from '@emotion/react'
import { Button } from 'lib'
import { FaCaretDown } from 'react-icons/fa'
import { Picker, Controls, Calendar } from 'lib/Datepicker'
import { PlannerInterval } from './types'
import { useOnClickOutside } from 'hooks'
import PlannerControl from './PlannerControl'
import { FaFileImport, FaFileExport } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { AiFillDatabase } from 'react-icons/ai'

interface PlannerHeaderToolbarProps {
  month: string
  year: string
  activeDate: Date
  onActiveDateChange: (date: Date) => void
  className?: string
  plannerInterval: PlannerInterval
  onPlannerIntervalChange: (plannerInterval: PlannerInterval) => void
  onSettingsClick: () => void
  onImportClick: () => void
  onExportClick: () => void
  onAddEventClick: () => void
  onAddRowClick: () => void
}

const PlannerHeaderToolbar: FC<PlannerHeaderToolbarProps> = ({
  month,
  year,
  className,
  activeDate,
  onActiveDateChange,
  plannerInterval,
  onPlannerIntervalChange,
  onSettingsClick,
  onImportClick,
  onExportClick,
  onAddEventClick,
  onAddRowClick,
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
        {/* <PlannerControl text="Settings" onMouseDown={onSettingsClick}>
          <FaCog />
        </PlannerControl> */}
        <PlannerControl text="Import" onMouseDown={onImportClick}>
          <FaFileImport />
        </PlannerControl>
        <PlannerControl text="Export" onMouseDown={onExportClick}>
          <FaFileExport />
        </PlannerControl>
      </Flex>
      <Flex>
        <PickerWrapper>
          <PickerButton
            onMouseDown={() => setPickerVisibility(!isPickerVisible)}
          >
            <Heading>{month}</Heading>
            <Heading css={subCss}>{year}</Heading>
            <FaCaretDown css={arrowDown} />
          </PickerButton>
          <Picker ref={pickerRef} isVisible={isPickerVisible}>
            <Controls date={activeDate} onChange={handleRangeChange} />
            <Calendar date={activeDate} onSelectedDate={handleDateChange} />
          </Picker>
        </PickerWrapper>
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
      <Flex>
        <PlannerControl text="Row" onMouseDown={onAddRowClick}>
          <AiFillDatabase />
        </PlannerControl>
        <PlannerControl text="Add" onMouseDown={onAddEventClick}>
          <FiPlus />
        </PlannerControl>
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
  font-size: 28px;
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
  align-items: center;
  border: none;
  padding: 0;
  margin: 0;
  margin-right: 16px;
  outline: 0;
  background: transparent;
  cursor: pointer;
`

const PickerWrapper = styled.div`
  position: relative;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
`

const arrowDown = css`
  color: #fcfcfc;
`

const subCss = css`
  margin: 0 8px;
  font-weight: 100;
`
const IntButton = styled(Button.Alt)`
  margin-left: 16px;
`
