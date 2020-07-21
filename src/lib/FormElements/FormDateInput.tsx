/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useState, useEffect, createRef } from 'react'
import { jsx } from '@emotion/react'
import { useInputValidation } from './hooks/useInputValidation'
import { useOnClickOutside } from 'hooks'
import { Size } from './types'
import { INPUT_LARGE, INPUT_SMALL } from './constants'
import { format } from 'date-fns'
import { Picker, Controls, Calendar } from 'lib/Datepicker'
import FormLabel from './FormLabel'
import Input from './Input'

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
  const { value, error, onBlur, onChange, ...fns } = useInputValidation(
    name,
    defaultValue,
  )

  const pickerRef = createRef<HTMLDivElement>()
  const inputRef = createRef<HTMLInputElement>()
  const [isPickerVisible, setPickerVisibility] = useState<boolean>(false)
  const [isLabelVisible, setLabelVisibility] = useState(false)
  const [type, setType] = useState<'date' | 'text'>('text')
  useOnClickOutside(
    pickerRef,
    () => setPickerVisibility(false),
    isPickerVisible,
  )

  // NEW: if defaultValue changes, update things
  useEffect(() => {
    if (defaultValue != undefined) {
      setLabelVisibility(true)
    }
  }, [defaultValue])

  const handleOnFocus = () => {
    setLabelVisibility(true)
    setPickerVisibility(true)
    setType('date')
  }

  const handleOnBlur = () => {
    if (!value) {
      setType('text')
    }
    setLabelVisibility(false)
    onBlur()
  }

  const handleDateChange = (date: Date) => {
    //onChange()
  }

  return (
    <Container inputSize={inputSize}>
      <FormLabel error={!!error} isVisible={isLabelVisible || value.length > 0}>
        {placeholder}
      </FormLabel>
      <Input
        type={type}
        name={name}
        value={value ? format(value, 'yyyy-MM-dd') : undefined}
        error={!!error}
        placeholder={isLabelVisible ? '' : placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        inputSize={inputSize}
        onChange={onChange}
        {...props}
        {...fns}
      />
      <Picker ref={pickerRef} isVisible={isPickerVisible}>
        <Controls date={value || new Date()} onChange={handleDateChange} />
        <Calendar
          date={value || new Date()}
          onSelectedDate={handleDateChange}
        />
      </Picker>
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

export default FormDateInput
