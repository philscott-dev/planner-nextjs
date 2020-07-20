/** @jsx jsx */
import {
  FC,
  useState,
  createRef,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
} from 'react'
import { jsx } from '@emotion/react'
import { useOnClickOutside } from 'hooks'
import styled from '@emotion/styled'
import { format, isEqual, isValid } from 'date-fns'
import Calendar from './Calendar'
import Controls from './Controls'
import Input from './Input'
import Picker from './Picker'

export interface DatepickerProps {
  name?: string
  date?: Date
  onChange: (date: Date) => void
  className?: string
}

const Datepicker: FC<DatepickerProps> = ({
  date,
  onChange,
  name,
  className,
}) => {
  const pickerRef = createRef<HTMLDivElement>()
  const inputRef = createRef<HTMLInputElement>()
  const [isVisible, setVisible] = useState<boolean>(false)
  useOnClickOutside(pickerRef, () => setVisible(false), isVisible)

  const handleShowPicker = () => {
    setVisible(!isVisible)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      e.preventDefault()
      setVisible(false)
    }
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const part = e.target.value.split('-').map((str) => Number(str))
    const [year, month, day] = part
    const nextDate = new Date(year, month - 1, day)
    if (isValid(nextDate) && (date === undefined || !isEqual(date, nextDate))) {
      onChange(nextDate)
    }
  }

  const handleRangeChange = (date: Date) => {
    onChange(date)
  }

  const handleDateChange = (date: Date) => {
    onChange(date)
    setVisible(false)
  }

  return (
    <div className={className}>
      <Input
        name={name}
        ref={inputRef}
        type="date"
        value={date ? format(date, 'yyyy-MM-dd') : undefined}
        onMouseDown={handleShowPicker}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <Picker ref={pickerRef} isVisible={isVisible}>
        <Controls date={date} onChange={handleRangeChange} />
        <Calendar date={date} onSelectedDate={handleDateChange} />
      </Picker>
    </div>
  )
}

export default styled(Datepicker)`
  display: inline-block;
  position: relative;
`
