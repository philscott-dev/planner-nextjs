/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useState, useEffect } from 'react'
import { jsx } from '@emotion/react'
import { useInputValidation } from './hooks/useInputValidation'
import { Size } from './types'
import { INPUT_LARGE, INPUT_SMALL } from './constants'
import FormLabel from './FormLabel'
import Select from './Select'
import { FaCaretDown } from 'react-icons/fa'

export interface FormSelectProps {
  className?: string
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
  tabIndex?: number
  children: React.ReactNode
}

const FormSelect: FC<FormSelectProps> = ({
  className,
  name,
  label,
  inputSize = 'large',
  placeholder,
  defaultValue,
  children,
  ...props
}) => {
  const { value, error, onBlur, ...fns } = useInputValidation(
    name,
    defaultValue,
  )

  const [isVisible, setLabelVisibility] = useState(false)

  useEffect(() => {
    if (defaultValue != undefined) {
      setLabelVisibility(true)
    }
  }, [defaultValue])

  const handleOnFocus = () => {
    setLabelVisibility(true)
  }

  const handleOnBlur = () => {
    if (!value || !value.length) {
      setLabelVisibility(false)
    }
    onBlur()
  }

  return (
    <Container className={className} inputSize={inputSize}>
      <FormLabel error={!!error} isVisible={isVisible || value.length > 0}>
        {placeholder}
      </FormLabel>

      <Select
        name={name}
        value={value}
        error={!!error}
        placeholder={isVisible ? '' : placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        inputSize={inputSize}
        {...props}
        {...fns}
      >
        {children}
      </Select>
      <ArrowDown />
    </Container>
  )
}

const Container = styled.div<{ inputSize: Size }>`
  overflow-y: visible;
  overflow: visible;
  display: flex;
  position: relative;
  width: 100%;
  border-radius: ${({ inputSize }) =>
    inputSize === 'large' ? INPUT_LARGE : INPUT_SMALL}px;
`

const ArrowDown = styled(FaCaretDown)`
  position: absolute;
  color: ${({ theme }) => theme.color.gray[200]};
  right: 24px;
  top: 50%;
  margin-top: -8px;
  pointer-events: none;
`

export default FormSelect
