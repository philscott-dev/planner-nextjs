/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'

interface MonthsProps {
  className?: string
}

const Months: FC<MonthsProps> = ({ className }) => {
  return <div className={className}></div>
}

export default styled(Months)
