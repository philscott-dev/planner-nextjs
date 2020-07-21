import { Icons } from './icons'
import React, { FC } from 'react'
import styled from '@emotion/styled'
import 'css.gg/icons-compressed/icons.css'

export interface IconProps {
  name: Icons
  className?: string
}

const Base: FC<IconProps> = ({ name, className }) => (
  <i className={`${className} gg-${name}`} />
)
const Icon = styled(Base)<{ size?: number }>`
  --ggs: ${({ size }) => (size ? size : 1)};
  color: ${({ theme }) => theme.color.gray[200]};
`
export default Icon
