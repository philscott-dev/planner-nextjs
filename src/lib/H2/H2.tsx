import styled from '@emotion/styled'
import { css, Theme } from '@emotion/react'
import { Size } from 'types'

type Sizes = Size.large
interface H2Props {
  size?: Sizes
}

const H2 = styled.h2<H2Props>`
  ${sizes}
  text-align: inherit;
  font-size: 32px;
  line-height: 42px;
  margin-bottom: 16px;
  font-weight: 300;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    font-size: 26px;
    line-height: 28px;
  }
`

function sizes({ size, theme }: { size?: Sizes; theme: Theme }) {
  if (size === 'large') {
    return css`
      font-size: 58px;
      line-height: 68px;
      @media screen and (max-width: ${theme.breakpoint.small}) {
        font-size: 40px;
        line-height: 40px;
      }
    `
  }
}

export default H2
