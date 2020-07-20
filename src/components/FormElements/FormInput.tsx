/** @jsx jsx */
import { FC, ChangeEvent, useState, useEffect } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { useInputValidation } from './hooks/useInputValidation'

type Size = 'large' | 'small'

export interface InputProps {
  name: string
  placeholder: string
  type: string
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

const INPUT_LARGE: number = 54
const INPUT_SMALL: number = 40

const Input: FC<InputProps> = ({
  name,
  label,
  inputSize = 'large',
  placeholder,
  defaultValue,
  type,
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
      console.log(defaultValue)
    }
  }, [defaultValue])

  const handleOnFocus = () => {
    setLabelVisibility(true)
  }

  const handleOnBlur = () => {
    if (!value) {
      setLabelVisibility(false)
    }
    onBlur()
  }

  return (
    <Container inputSize={inputSize}>
      <StyledLabel error={!!error} isVisible={isVisible || value.length > 0}>
        {placeholder}
      </StyledLabel>
      <StyledInput
        type={type}
        name={name}
        value={value}
        error={!!error}
        placeholder={isVisible ? '' : placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        inputSize={inputSize}
        {...props}
        {...fns}
      />
    </Container>
  )
}

interface ContainerProps {
  inputSize: Size
}

const Container = styled.div<ContainerProps>`
  overflow-y: visible;
  overflow: visible;
  display: flex;
  position: relative;
  width: 100%;
  border-radius: ${({ inputSize }) =>
    inputSize === 'large' ? INPUT_LARGE : INPUT_SMALL}px;
`

interface StyledInputProps {
  type: string
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

const StyledInput = styled.input<StyledInputProps>`
  height: ${({ inputSize }) =>
    inputSize === 'large' ? INPUT_LARGE : INPUT_SMALL}px;
  margin-bottom: 16px;
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

interface StyledLabelProps {
  isVisible: boolean
  error: boolean
}

const StyledLabel = styled.label<StyledLabelProps>`
  position: absolute;
  left: 20px;
  background: ${({ theme }) => theme.color.blue[500]};
  padding: 0 4px;
  transition: all 0.2s ease-in-out;
  visibility: ${({ isVisible }) => (isVisible ? 'visibility' : 'hidden')};
  top: ${({ isVisible }) => (isVisible ? -8 : 12)}px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  color: ${({ theme, error }) =>
    !error ? theme.color.white[100] : theme.color.red[300]};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 14px;
`

Input.defaultProps = {
  type: 'text',
}

export default Input
