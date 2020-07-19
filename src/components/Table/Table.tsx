import React, { FC } from 'react'
import styled from '@emotion/styled'
import Tbody from './Tbody'
import Thead from './Thead'
import Th from './Th'
import Td from './Td'
import Tr from './Tr'
import useUniqueKeys from './useUniqueKeys'
import { Data, ExtraTableData } from './types'

interface TableProps {
  data: Data[]
  extraData?: ExtraTableData
  exclude?: string[]
  include?: string[]
  isScrollable?: boolean
  className?: string
}

const Table: FC<TableProps> = ({
  data,
  extraData,
  exclude,
  include,
  isScrollable,
  className,
}) => {
  const keys = useUniqueKeys({ data, extraData, include, exclude })
  return (
    <table className={className}>
      <Thead>
        <Tr>
          {keys.map((key) => (
            <Th key={key} heading={key} />
          ))}
        </Tr>
      </Thead>
      <Tbody isScrollable={isScrollable}>
        {data &&
          data.map((obj, index) => {
            // spread the extra data to each object
            const row = { ...obj, ...extraData }
            //@ts-ignore
            const value = row[key]
            return (
              <Tr key={index}>
                {keys.map((key) => (
                  <Td
                    key={key}
                    value={value}
                    rowIndex={index}
                    row={obj}
                    data={data}
                  />
                ))}
              </Tr>
            )
          })}
      </Tbody>
    </table>
  )
}

export default styled(Table)`
  border-collapse: collapse;
  box-shadow: ${({ theme }) => theme.shadow.up.two};
  border-radius: 2px;
  overflow: hidden;
`
