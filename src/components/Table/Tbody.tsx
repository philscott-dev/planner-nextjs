import styled from '@emotion/styled'

interface TbodyProps {
  isScrollable?: boolean
}

const Tbody = styled.tbody<TbodyProps>`
  overflow-y: ${({ isScrollable }) => (isScrollable ? 'auto' : 'unset')};
  > tr {
    &:hover {
      background: ${({ theme }) => theme.color.blue[400]};
    }
  }
`

export default Tbody
