import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Data } from './types'
import { isBoolean, isFunction, isNumber, isString } from 'helpers/typecheck'
// import isDate from 'date-fns/isDate'
// import format from 'date-fns/format'

export interface TableHeadingProps {
  value?: (
    row: Data,
    rowIndex: number,
    data: Data[],
  ) => JSX.Element | string | boolean | number
  row: Data
  data: Data[]
  rowIndex: number
  className?: string
}

const Td: FC<TableHeadingProps> = ({
  value,
  row,
  data,
  rowIndex,
  className,
}) => {
  // stringify bools
  if (isBoolean(value)) {
    return <td className={className}>{String(value)}</td>
  }

  // call functions
  if (isFunction(value)) {
    return <td className={className}>{value(row, rowIndex, data)}</td>
  }

  // return normal render
  if (isString(value) || isNumber(value)) {
    return <td className={className}>{value}</td>
  }

  // if not renderable, return an empty TD
  return <td className={className}></td>
}

export default styled(Td)`
  font-size: 14px;
  vertical-align: top;
  padding: 8px;
  font-weight: 400;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
`
