import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Sizes } from './types'

export interface ButtonProps {
  size?: Sizes
  type?: 'button' | 'submit' | 'reset'
  isActive?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onTouchStart?: (e: React.TouchEvent<HTMLButtonElement>) => void
}

const Button = styled.button<ButtonProps>`
  ${sizes};
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  align-items: center;
  border-radius: 16px;
  /* border-radius: 72px; */
  outline: none;
  pointer-events: all;
  border-style: solid;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.all};
  &:hover {
    background-size: 100% 100%;
  }
  &:disabled {
    background: gray;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    display: block;
    width: 100%;
  }
`

const Primary = styled(Button)`
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[400]};
  border-color: ${({ theme }) => theme.color.blue[400]};
  box-shadow: ${({ theme }) => theme.shadow.up.one};
  &:hover {
    color: ${({ theme }) => theme.color.white[100]};
    background: ${({ theme }) => theme.color.blue[300]};
    border-color: ${({ theme }) => theme.color.white[300]};
    box-shadow: ${({ theme }) => theme.shadow.up.two};
  }
`

const Secondary = styled(Button)`
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[500]};
  border-color: ${({ theme }) => theme.color.blue[500]};
  box-shadow: ${({ theme }) => theme.shadow.up.one};
  &:hover {
    color: ${({ theme }) => theme.color.white[100]};
    background: ${({ theme }) => theme.color.blue[500]};
    border-color: ${({ theme }) => theme.color.white[500]};
    box-shadow: ${({ theme }) => theme.shadow.up.two};
  }
  &:active {
    box-shadow: ${({ theme }) => theme.shadow.up.one};
  }
`

const Tertiary = styled(Button)`
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[600]};
  border-color: ${({ theme }) => theme.color.blue[400]};
  &:hover {
    color: ${({ theme }) => theme.color.white[100]};
    background: ${({ theme }) => theme.color.blue[500]};
    border-color: ${({ theme }) => theme.color.white[200]};
  }
`

const Alt = styled(Button)`
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[700]};
  border-color: ${({ theme, isActive }) =>
    isActive ? theme.color.blue[400] : theme.color.blue[700]};
  &:hover {
    border-color: ${({ theme }) => theme.color.blue[300]};
  }
`

function sizes({ size }: { size?: Sizes }) {
  switch (size) {
    case 'small':
      return css`
        font-size: 14px;
        padding: 8px 24px;
      `
    case 'large':
      return css`
        font-size: 18px;
        padding: 24px 48px;
      `
    default:
      return css`
        font-size: 16px;
        padding: 16px 40px;
      `
  }
}

export default Object.assign(Button, { Primary, Secondary, Tertiary, Alt })
