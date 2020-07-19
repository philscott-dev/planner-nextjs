/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { jsx } from '@emotion/react'
import { Text } from 'components'
import PlannerHeaderDay from './PlannerHeaderDay'
import PlannerHeaderToolbar from './PlannerHeaderToolbar'
import { PlannerInterval } from './types'
import { format } from 'date-fns'

interface PlannerHeaderProps {
  activeColumn?: number
  activeDate: Date
  range: Date[]
  plannerInterval: PlannerInterval
  onHeaderClick: (e: MouseEvent) => void
  onHeaderDoubleClick: (e: MouseEvent) => void
  onPlannerIntervalChange: (plannerInterval: PlannerInterval) => void
  onActiveDateChange: (date: Date) => void
  className?: string
  onSettingsClick: () => void
  onImportClick: () => void
  onExportClick: () => void
  onAddEventClick: () => void
  onAddRowClick: () => void
}

const PlannerHeader: FC<PlannerHeaderProps> = ({
  range,
  className,
  plannerInterval,
  onHeaderClick,
  onHeaderDoubleClick,
  onPlannerIntervalChange,
  onActiveDateChange,
  activeColumn,
  activeDate,
  onSettingsClick,
  onImportClick,
  onExportClick,
  onAddEventClick,
  onAddRowClick,
}) => {
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [headerFormat, setHeaderFormat] = useState('EEE d')
  useEffect(() => {
    if (activeDate) {
      setMonth(format(activeDate, 'MMM'))
      setYear(format(activeDate, 'yyyy'))
      if (plannerInterval === 'week') {
        setHeaderFormat('EEE d')
      }
      if (plannerInterval === 'month') {
        setHeaderFormat('do')
      }
      if (plannerInterval === 'year') {
        setHeaderFormat('MMM')
      }
    }
  }, [range, plannerInterval, activeDate])
  return (
    <div className={className}>
      <PlannerHeaderToolbar
        month={month}
        year={year}
        activeDate={activeDate}
        onActiveDateChange={onActiveDateChange}
        plannerInterval={plannerInterval}
        onPlannerIntervalChange={onPlannerIntervalChange}
        onSettingsClick={onSettingsClick}
        onImportClick={onImportClick}
        onExportClick={onExportClick}
        onAddEventClick={onAddEventClick}
        onAddRowClick={onAddRowClick}
      />
      <DateRowWrapper>
        <CalWrapper range={range.length + 1}></CalWrapper>
        {range.map((date, index) => (
          <PlannerHeaderDay
            key={index}
            date={date}
            plannerInterval={plannerInterval}
            headerFormat={headerFormat}
            isActive={activeColumn === index}
            range={range.length + 1}
            onMouseDown={onHeaderClick}
            onDoubleClick={onHeaderDoubleClick}
          />
        ))}
      </DateRowWrapper>
    </div>
  )
}

export default styled(PlannerHeader)`
  position: sticky;
  z-index: 1;
  top: 0;
  border-bottom: 2px solid black;
`

const DateRowWrapper = styled.div`
  display: flex;
  min-height: 80px;
  &:nth-of-type(2) {
    > p {
      color: ${({ theme }) => theme.color.blue[500]};
    }
  }
`

export const CalWrapper = styled.div<{ range: number }>`
  min-width: 140px;
  width: 140px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.color.blue[500]};
`
