import styled from '@emotion/styled'

const ItemWrapper = styled.div<{ left: number; width: number }>`
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  list-style: none;
  list-style-type: none;
  height: inherit;
  width: ${({ width }) => width}px;
  top: 0;
  left: ${({ left }) => -left}px;
  background: purple;
  white-space: nowrap;
  transition: all 0.1s ease-in-out;
`

export default ItemWrapper
