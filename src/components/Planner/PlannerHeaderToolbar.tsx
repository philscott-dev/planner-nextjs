/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent, useState, createRef } from 'react'
import { jsx, css } from '@emotion/react'
import { Button } from 'lib'
import { Picker, Controls, Calendar } from 'lib/Datepicker'
import { PlannerInterval } from './types'
import { useOnClickOutside } from 'hooks'
import PlannerControl from './PlannerControl'
import { FaCaretDown } from 'react-icons/fa'
import { FaFileImport, FaFileExport } from 'react-icons/fa'
import { FiPlus, FiMoreVertical, FiEdit } from 'react-icons/fi'
import { GoCalendar } from 'react-icons/go'
import { MdPlaylistAdd } from 'react-icons/md'
import { Dropdown, DropdownOption, IconButton } from 'lib'
import { RenameDialog } from 'components'
import { H2 } from 'lib'

interface PlannerHeaderToolbarProps {
  title?: string
  month: string
  year: string
  activeDate: Date
  className?: string
  plannerInterval: PlannerInterval
  onActiveDateChange: (date: Date) => void
  onPlannerIntervalChange: (plannerInterval: PlannerInterval) => void
  onSettingsClick: () => void
  onNewPlannerClick: () => void
  onImportClick: () => void
  onExportClick: () => void
  onAddEventClick: () => void
  onAddRowClick: () => void
  onRenamePlannerConfirm: (title: string) => void
}

const PlannerHeaderToolbar: FC<PlannerHeaderToolbarProps> = ({
  title,
  month,
  year,
  className,
  activeDate,
  onActiveDateChange,
  plannerInterval,
  onPlannerIntervalChange,
  onSettingsClick,
  onRenamePlannerConfirm,
  onNewPlannerClick,
  onImportClick,
  onExportClick,
  onAddEventClick,
  onAddRowClick,
}) => {
  const pickerRef = createRef<HTMLDivElement>()
  const [isRenameVisible, setRenameVisibility] = useState<boolean>(false)
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

  const handlePickerClick = () => {
    setPickerVisibility(!isPickerVisible)
  }

  const handleRenamePlannerVisibility = () => {
    setRenameVisibility(!isRenameVisible)
  }

  const handleRenamePlannerConfirm = (value: string) => {
    onRenamePlannerConfirm(value)
    setRenameVisibility(false)
  }

  return (
    <div className={className}>
      <Flex>
        <Dropdown
          renderNode={(onClick) => (
            <IconButton
              onMouseDown={onClick}
              css={css`
                font-size: 24px;
              `}
            >
              <FiMoreVertical />
            </IconButton>
          )}
        >
          <DropdownOption onMouseDown={onNewPlannerClick}>
            <GoCalendar css={iconCss} /> New
          </DropdownOption>
          <DropdownOption onMouseDown={onImportClick}>
            <FaFileImport css={iconCss} /> Import
          </DropdownOption>
          <DropdownOption onMouseDown={onExportClick}>
            <FaFileExport css={iconCss} /> Export
          </DropdownOption>
          <DropdownOption onMouseDown={handleRenamePlannerVisibility}>
            <FiEdit css={iconCss} /> Rename
          </DropdownOption>
        </Dropdown>
        <Heading>{title || 'Planner'}</Heading>
      </Flex>
      <div>
        <RenameDialog
          value={title}
          placeholder={'Title'}
          isVisible={isRenameVisible}
          onCancel={handleRenamePlannerVisibility}
          onConfirm={handleRenamePlannerConfirm}
          onClickOutside={handleRenamePlannerVisibility}
        />
      </div>

      <IntervalWrapper>
        <PickerWrapper>
          <PickerButton onMouseDown={handlePickerClick}>
            <DateHeading>{month}</DateHeading>
            <DateHeading css={subCss}>{year}</DateHeading>
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
          value="year"
          isActive={plannerInterval === 'year'}
          onMouseDown={handleIntervalChange}
        >
          Year
        </IntButton>
      </IntervalWrapper>

      <ControlWrapper>
        <PlannerControl text="Event" onMouseDown={onAddEventClick}>
          <MdPlaylistAdd />
        </PlannerControl>
      </ControlWrapper>
    </div>
  )
}

export default styled(PlannerHeaderToolbar)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.blue[700]};
  padding: 24px;
`

const Heading = styled(H2)`
  margin: 0;
  margin-right: 8px;
`

const DateHeading = styled.h2`
  text-align: inherit;
  font-size: 28px;
  line-height: 42px;
  margin: 0;
  font-weight: 300;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
  transition: all 0.3s ease-in-out;
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
  &:hover {
    > h2,
    svg {
      color: ${({ theme }) => theme.color.blue[300]};
    }
  }
  transition: all 0.3s ease-in-out;
`

const PickerWrapper = styled.div`
  position: relative;
`

const Flex = styled.div`
  flex: 1;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`

const ControlWrapper = styled(Flex)`
  justify-content: flex-end;
`

const IntervalWrapper = styled(Flex)`
  justify-content: center;
`

const arrowDown = css`
  color: #fcfcfc;
  transition: all 0.3s ease-in-out;
`

const subCss = css`
  margin: 0 8px;
  font-weight: 100;
`
const IntButton = styled(Button.Alt)`
  margin-left: 16px;
  padding: 12px 24px;
  font-size: 14px;
`

const iconCss = css`
  margin-right: 8px;
`
