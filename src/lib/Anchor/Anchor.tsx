import styled from '@emotion/styled'
import { css, Theme } from '@emotion/react'
import { Sizes } from './types'

interface TextProps {
  size?: Sizes
  href?: string
}

const Anchor = styled.a<TextProps>`
  ${sizes};
  text-decoration: underline;
  text-align: inherit;
  cursor: pointer;
  font-weight: 500;
  color: ${({ theme }) => theme.color.white[100]};
  transition: ${({ theme }) => theme.transition.color};
  font-family: ${({ theme }) => theme.font.family};
  &:hover {
    color: ${({ theme }) => theme.color.blue[300]};
    transition: ${({ theme }) => theme.transition.color};
    & * {
      color: ${({ theme }) => theme.color.blue[300]};
      transition: ${({ theme }) => theme.transition.color};
    }
  }
`

function sizes({ size, theme }: { size?: Sizes; theme: Theme }) {
  switch (size) {
    case 'small':
      return css`
        font-size: 14px;
        line-height: 18px;
        @media screen and (max-width: ${theme.breakpoint.small}) {
          font-size: 14px;
          line-height: 18px;
        }
      `
    case 'large':
      return css`
        font-size: 18px;
        line-height: 26px;
        @media screen and (max-width: ${theme.breakpoint.small}) {
          font-size: 16px;
          line-height: 21px;
        }
      `
    default:
      return css`
        font-size: 16px;
        line-height: 24px;
        @media screen and (max-width: ${theme.breakpoint.small}) {
          font-size: 14px;
          line-height: 20px;
        }
      `
  }
}

export default Anchor
