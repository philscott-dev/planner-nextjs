/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent, useState, useEffect, createRef } from 'react'
import { jsx, css } from '@emotion/react'
import { Picker, Controls, Calendar } from 'lib/Datepicker'
import { PlannerInterval, PlannerLayout } from './types'
import { useOnClickOutside } from 'hooks'
import { FiMoreVertical, FiEdit, FiMenu } from 'react-icons/fi'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoMdOptions } from 'react-icons/io'
import { GoCalendar } from 'react-icons/go'
import { RenameDialog } from 'components'
import { format } from 'date-fns'
import { Dropdown, DropdownOption, IconButton, Button, H2 } from 'lib'
import { DropdownHeading, DropdownDivider } from 'lib/Dropdown'
import Input from 'lib/FormElements/Input'
import { MdViewDay } from 'react-icons/md'
import {
  FaFileImport,
  FaFileExport,
  FaCaretDown,
  FaCalendar,
  FaCalendarAlt,
  FaCalendarWeek,
} from 'react-icons/fa'

interface PlannerHeaderToolbarProps {
  title?: string
  range: Date[]
  activeDate: Date
  className?: string
  plannerInterval: PlannerInterval
  plannerLayout: PlannerLayout
  onActiveDateChange: (date: Date) => void
  onPlannerIntervalChange: (plannerInterval: PlannerInterval) => void
  onSettingsClick: () => void
  onNewPlannerClick: () => void
  onImportClick: () => void
  onExportClick: () => void
  onAddEventClick: () => void
  onAddRowClick: () => void
  onRenamePlanner: (title: string) => void
  onPlannerLayoutChange: (plannerLayout: PlannerLayout) => void
}

const PlannerHeaderToolbar: FC<PlannerHeaderToolbarProps> = ({
  title,
  range,
  className,
  activeDate,
  plannerInterval,
  plannerLayout,
  onActiveDateChange,
  onPlannerIntervalChange,
  onRenamePlanner,
  onNewPlannerClick,
  onImportClick,
  onExportClick,
  onAddEventClick,
  onAddRowClick,
  onPlannerLayoutChange,
}) => {
  const pickerRef = createRef<HTMLDivElement>()
  const [isRenameVisible, setRenameVisibility] = useState<boolean>(false)
  const [isPickerVisible, setPickerVisibility] = useState<boolean>(false)
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  useEffect(() => {
    if (activeDate) {
      setMonth(format(activeDate, 'MMM'))
      setYear(format(activeDate, 'yyyy'))
    }
  }, [range, plannerInterval, activeDate])
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
    onRenamePlanner(value)
    setRenameVisibility(false)
  }

  const handlePlannerLayoutChange = (e: MouseEvent<HTMLButtonElement>) => {
    onPlannerLayoutChange(e.currentTarget.value as PlannerLayout)
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
        <PickerWrapper ref={pickerRef}>
          <PickerButton onMouseDown={handlePickerClick}>
            <DateHeading>{month}</DateHeading>
            <DateHeading css={subCss}>{year}</DateHeading>
            <FaCaretDown css={arrowDown} />
          </PickerButton>
          <Picker isVisible={isPickerVisible}>
            <Controls date={activeDate} onChange={handleRangeChange} />
            <Calendar date={activeDate} onSelectedDate={handleDateChange} />
          </Picker>
        </PickerWrapper>
      </Flex>
      <div>
        {/* <RenameDialog
          value={title}
          placeholder={'Title'}
          isVisible={isRenameVisible}
          onCancel={handleRenamePlannerVisibility}
          onConfirm={handleRenamePlannerConfirm}
          onClickOutside={handleRenamePlannerVisibility}
        /> */}
      </div>

      <IntervalWrapper>
        <Heading>{title || 'PlannerJS'}</Heading>
      </IntervalWrapper>

      <ControlWrapper>
        {/* <IntButton
          value="standard"
          isActive={plannerLayout === 'standard'}
          onMouseDown={handlePlannerLayoutChange}
        >
          Standard
        </IntButton>
        <IntButton
          value="condensed"
          isActive={plannerLayout === 'condensed'}
          onMouseDown={handlePlannerLayoutChange}
        >
          Condensed
        </IntButton>
        <IntButton
          value="stacked"
          isActive={plannerLayout === 'stacked'}
          onMouseDown={handlePlannerLayoutChange}
        >
          Stacked
        </IntButton> */}
        {/* <PlannerControl text="Add Row" onMouseDown={onAddRowClick}>
          <MdPlaylistAdd />
        </PlannerControl>
        <PlannerControl text="Add Event" onMouseDown={onAddEventClick}>
          <FiPlus />
        </PlannerControl> */}

        {/* <Form
          loading={false}
          error={undefined}
          onSubmit={(vals) => {
            console.log(vals)
          }}
          autoComplete={'off'}
          rules={{}}
        >
          <ToolbarSelect
            name="view"
            placeholder="View"
            defaultValue={plannerInterval}
          >
            <option hidden disabled>
              View
            </option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </ToolbarSelect>
        </Form> */}

        {/* <Form
          loading={false}
          error={undefined}
          onSubmit={() => {}}
          autoComplete={'off'}
          rules={{}}
        >
          <ToolbarSelect name="interval" placeholder="Interval">
            <SelectPlaceholder text="Interval" />
            <option value="week">Week</option>
            <option value="week">Month</option>
            <option value="week">Year</option>
          </ToolbarSelect>
        </Form> */}
        {/* <IntButton
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
        </IntButton> */}
        {/* <MdViewDay
          style={{ color: '#fcfcfc', fontSize: 24, marginRight: 24 }}
        /> */}

        <Dropdown
          direction="left"
          renderNode={(onClick) => (
            <IconButton
              onMouseDown={onClick}
              css={css`
                font-size: 24px;
              `}
            >
              <IoMdOptions
                style={{ color: '#fcfcfc', fontSize: 24, marginRight: 8 }}
              />
            </IconButton>
          )}
        >
          <DropdownHeading>Time</DropdownHeading>
          <DropdownOption onMouseDown={handleIntervalChange}>
            <FaCalendarWeek css={iconCss} /> Week
          </DropdownOption>
          <DropdownOption onMouseDown={handleIntervalChange}>
            <FaCalendarAlt css={iconCss} /> Month
          </DropdownOption>
          <DropdownOption onMouseDown={handleIntervalChange}>
            <FaCalendar css={iconCss} /> Year
          </DropdownOption>
          <DropdownDivider />
          <DropdownHeading>View</DropdownHeading>
          <DropdownOption onMouseDown={handleRenamePlannerVisibility}>
            <MdViewDay css={iconCss} /> Standard
          </DropdownOption>
          <DropdownOption onMouseDown={handleRenamePlannerVisibility}>
            <AiOutlineMenu css={iconCss} /> Condensed
          </DropdownOption>
          <DropdownOption onMouseDown={handleRenamePlannerVisibility}>
            <FiMenu css={iconCss} /> Stacked
          </DropdownOption>
        </Dropdown>
      </ControlWrapper>
    </div>
  )
}

export default styled(PlannerHeaderToolbar)`
  display: flex;
  position: sticky;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.blue[700]};
  padding: 8px;
  z-index: 2;
  top: 0;
  min-height: 60px;
  max-height: 60px;
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
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  border: none;
  padding: 0;
  margin: 0;
  margin-right: 16px;
  min-height: 60px;
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
  box-sizing: border-box;
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
  align-items: center;
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    /* display: none; */
  }
`

const IntervalWrapper = styled(Flex)`
  justify-content: center;
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    display: none;
  }
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

const Search = styled(Input)`
  height: 48px;
`
