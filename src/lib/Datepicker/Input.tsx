/** @jsx jsx */
import styled from '@emotion/styled'

const Input = styled.input<{ error?: boolean }>`
  ::-webkit-calendar-picker-indicator {
    display: none;
  }
  height: 54px;
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

export default Input
