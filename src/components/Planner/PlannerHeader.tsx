/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { jsx } from '@emotion/react'
import PlannerHeaderDay from './PlannerHeaderDay'
import PlannerHeaderToolbar from './PlannerHeaderToolbar'
import PlannerHeaderLabel from './PlannerHeaderLabel'
import { PlannerInterval, PlannerLayout } from './types'
import { format } from 'date-fns'

interface PlannerHeaderProps {
  title?: string
  className?: string
  activeColumn?: number
  activeDate: Date
  range: Date[]
  plannerInterval: PlannerInterval
  plannerLayout: PlannerLayout
  onHeaderClick: (e: MouseEvent) => void
  onHeaderDoubleClick: (e: MouseEvent) => void
  onPlannerIntervalChange: (plannerInterval: PlannerInterval) => void
  onActiveDateChange: (date: Date) => void
  onPlannerRename: (title: string) => void
  onSettingsClick: () => void
  onNewPlannerClick: () => void
  onImportClick: () => void
  onExportClick: () => void
  onAddEventClick: () => void
  onAddRowClick: () => void
  onPlannerLayoutChange: (plannerLayout: PlannerLayout) => void
}

const PlannerHeader: FC<PlannerHeaderProps> = ({
  title,
  range,
  className,
  plannerInterval,
  plannerLayout,
  activeColumn,
  activeDate,
  onHeaderClick,
  onHeaderDoubleClick,
  onPlannerIntervalChange,
  onPlannerLayoutChange,
  onActiveDateChange,
  onSettingsClick,
  onPlannerRename,
  onNewPlannerClick,
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
        title={title}
        month={month}
        year={year}
        activeDate={activeDate}
        plannerInterval={plannerInterval}
        plannerLayout={plannerLayout}
        onRenamePlannerConfirm={onPlannerRename}
        onActiveDateChange={onActiveDateChange}
        onPlannerIntervalChange={onPlannerIntervalChange}
        onPlannerLayoutChange={onPlannerLayoutChange}
        onSettingsClick={onSettingsClick}
        onNewPlannerClick={onNewPlannerClick}
        onImportClick={onImportClick}
        onExportClick={onExportClick}
        onAddEventClick={onAddEventClick}
        onAddRowClick={onAddRowClick}
      />
      <DateRowWrapper>
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
