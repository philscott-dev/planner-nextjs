/** @jsx jsx */
import styled from '@emotion/styled'
import { css, Theme } from '@emotion/react'
import { Size } from 'types'

type Sizes = Size.large
interface H1Props {
  size?: Sizes
}

const H1 = styled.h1<H1Props>`
  ${sizes}
  text-align: inherit;
  font-size: 40px;
  line-height: 50px;
  margin-bottom: 16px;
  font-weight: 300;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    font-size: 32px;
    line-height: 36px;
  }
`

function sizes({ size, theme }: { size?: Sizes; theme: Theme }) {
  if (size === 'large') {
    return css`
      font-size: 72px;
      line-height: 77px;
      @media screen and (max-width: ${theme.breakpoint.small}) {
        font-size: 56px;
        line-height: 56px;
      }
    `
  }
}

export default H1
