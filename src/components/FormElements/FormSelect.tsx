/** @jsx jsx */
import { FC, useState, useEffect, ChangeEvent } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { useInputValidation } from './hooks/useInputValidation'
import FormLabel from './FormLabel'
import { Size } from './types'
import { INPUT_LARGE, INPUT_SMALL } from './constants'

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

  // NEW: if defaultValue changes, update things
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

interface SelectProps {
  name: string
  error: boolean
  inputSize: Size
  required?: boolean
  value?: string
  placeholder: string
  onFocus: () => void
  onBlur: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Select = styled.select<SelectProps>`
  -webkit-appearance: none;
  height: ${({ inputSize }) =>
    inputSize === 'large' ? INPUT_LARGE : INPUT_SMALL}px;
  padding: 0 24px;
  border-radius: 8px;
  outline: none;
  width: 100%;
  font-size: 14px;
  background-clip: padding-box;
  font-family: ${({ theme }) => theme.font.family};
  font-weight: 200;
  border: 2px solid
    ${({ theme, error }) =>
      !error ? theme.color.blue[400] : theme.color.red[300]};
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[500]};
  &:focus {
    border: 2px solid
      ${({ theme, error }) =>
        !error ? theme.color.blue[300] : theme.color.red[300]};
  }
  &::placeholder {
    color: ${({ theme, error }) =>
      !error ? theme.color.gray[300] : theme.color.red[300]};
    font-family: ${({ theme }) => theme.font.family};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    border: 1px solid ${({ theme }) => theme.color.white[100]};
    -webkit-text-fill-color: ${({ theme }) => theme.color.white[100]};
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    border-right: 1px solid ${({ theme }) => theme.color.white[100]};
  }
  transition: all 0.3s ease-in-out;
`

export default FormSelect
