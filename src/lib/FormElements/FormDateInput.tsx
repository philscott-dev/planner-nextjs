/** @jsx jsx */
import styled from '@emotion/styled'
import {
  FC,
  useState,
  useEffect,
  createRef,
  ChangeEvent,
  FocusEvent,
} from 'react'
import { jsx } from '@emotion/react'
import { useInputValidation } from './hooks/useInputValidation'
import { useOnClickOutside } from 'hooks'
import { Size } from './types'
import { INPUT_LARGE, INPUT_SMALL } from './constants'
import { parseISO, format } from 'date-fns'
import { Picker, Controls, Calendar } from 'lib/Datepicker'
import FormLabel from './FormLabel'
import Input from './Input'
import { GoCalendar } from 'react-icons/go'
import useMobileDetect from 'hooks/useMobileDetect'

export interface FormDateInputProps {
  name: string
  placeholder: string
  label?: string
  autofocus?: boolean
  list?: string
  min?: string
  max?: string
  multiple?: boolean
  required?: boolean
  step?: number
  defaultValue?: any
  tabIndex?: number
  inputSize?: Size
}

const FormDateInput: FC<FormDateInputProps> = ({
  name,
  label,
  inputSize = 'large',
  placeholder,
  defaultValue,
  ...props
}) => {
  const isMobile = useMobileDetect()
  const { value, error, onBlur, onChange, ...fns } = useInputValidation(
    name,
    defaultValue,
  )

  const ref = createRef<HTMLDivElement>()
  const [isPickerVisible, setPickerVisibility] = useState<boolean>(false)
  const [isLabelVisible, setLabelVisibility] = useState(false)
  const [type, setType] = useState<'date' | 'text'>('text')
  useOnClickOutside(
    ref,
    () => {
      if (!value || value.length <= 0) {
        setType('text')
        setLabelVisibility(false)
      }
      setPickerVisibility(false)
    },
    isPickerVisible,
  )

  useEffect(() => {
    if (defaultValue != undefined) {
      setLabelVisibility(true)
      setType('date')
    }
  }, [defaultValue])

  // fix race condition when swapping from text to date on mobile
  const handleOnTouchStart = () => {
    setType('date')
  }

  const handleOnFocus = () => {
    setLabelVisibility(true)
    setPickerVisibility(true)
    setType('date')
  }

  const handleOnBlur = () => {
    onBlur()
    setPickerVisibility(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date = parseISO(e.target.value)
    onChange(date)
  }

  const handleMonthChange = (date: Date) => {
    onChange(date)
  }

  const handleDateChange = (date: Date) => {
    onChange(date)
    setPickerVisibility(false)
  }

  return (
    <Container ref={ref} inputSize={inputSize}>
      <FormLabel error={!!error} isVisible={isLabelVisible || value.length > 0}>
        {placeholder}
      </FormLabel>
      <Input
        type={type}
        name={name}
        value={value ? format(value, 'yyyy-MM-dd') : ''}
        error={!!error}
        placeholder={isLabelVisible ? '' : placeholder}
        inputSize={inputSize}
        onTouchStart={handleOnTouchStart}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleInputChange}
        {...props}
        {...fns}
      />
      <CalendarIcon />
      {!isMobile ? (
        <Picker isVisible={isPickerVisible}>
          <Controls
            date={value instanceof Date ? value : new Date()}
            onChange={handleMonthChange}
          />
          <Calendar
            date={value instanceof Date ? value : new Date()}
            onSelectedDate={handleDateChange}
          />
        </Picker>
      ) : null}
    </Container>
  )
}

const Container = styled.div<{ inputSize: Size }>`
  position: relative;
  overflow-y: visible;
  overflow: visible;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  border-radius: ${({ inputSize }) =>
    inputSize === 'large' ? INPUT_LARGE : INPUT_SMALL}px;
`

const CalendarIcon = styled(GoCalendar)`
  position: absolute;
  color: ${({ theme }) => theme.color.gray[200]};
  right: 24px;
  top: 50%;
  margin-top: -8px;
  pointer-events: none;
`

export default FormDateInput
