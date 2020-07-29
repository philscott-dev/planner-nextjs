import { ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { Size } from './types'
import { INPUT_LARGE, INPUT_SMALL } from './constants'

interface InputProps {
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

export default styled.input<InputProps>`
  -webkit-appearance: none;
  ::-webkit-calendar-picker-indicator {
    display: none;
  }
  box-sizing: border-box;
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
  &::placeholder {
    color: ${({ theme, error }) =>
      !error ? theme.color.gray[200] : theme.color.red[300]};
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
  &:focus {
    border: 2px solid
      ${({ theme, error }) =>
        !error ? theme.color.blue[300] : theme.color.red[300]};
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    border-right: 1px solid ${({ theme }) => theme.color.white[100]};
  }
  transition: all 0.3s ease-in-out;
`
