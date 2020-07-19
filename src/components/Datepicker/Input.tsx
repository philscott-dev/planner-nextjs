/** @jsx jsx */
import styled from '@emotion/styled'

const Input = styled.input`
  ::-webkit-calendar-picker-indicator {
    display: none;
  }
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[600]};
  border-color: ${({ theme }) => theme.color.blue[400]};
  white-space: nowrap;
  align-items: center;
  border-radius: 72px;
  outline: none;
  pointer-events: all;
  border-style: solid;
  cursor: pointer;
  padding: 4px 32px;
  font-family: ${({ theme }) => theme.font.family};
  transition: ${({ theme }) => theme.transition.all};
  &:disabled {
    background: gray;
  }
  &:hover {
    color: ${({ theme }) => theme.color.white[100]};
    background: ${({ theme }) => theme.color.blue[500]};
    border-color: ${({ theme }) => theme.color.white[100]};
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    display: block;
    width: 100%;
  }
`

export default Input
