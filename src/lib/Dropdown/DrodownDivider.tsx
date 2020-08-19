import styled from '@emotion/styled'

export default styled.hr<{ isDelete?: boolean; disabled?: boolean }>`
  margin: 16px 24px;
  box-sizing: border-box;
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.color.blue[400]};
  color: ${({ theme }) => theme.color.blue[700]};
`
