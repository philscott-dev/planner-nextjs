import React, { FC } from 'react'
import styled from '@emotion/styled'
import { splitAndCapitalize } from 'helpers/string'

export interface ThProps {
  onClick?: (key: string) => void
  heading: string
  className?: string
}

const Th: FC<ThProps> = ({ heading, onClick, className }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(heading)
    }
  }
  return (
    <th className={className} onClick={handleClick}>
      {splitAndCapitalize(heading)}
    </th>
  )
}

export default styled(Th)`
  padding: 8px;
  font-weight: 500;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
`
