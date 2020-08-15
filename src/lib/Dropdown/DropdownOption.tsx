import styled from '@emotion/styled'

export default styled.button<{ isDelete?: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  white-space: nowrap;
  align-items: center;
  outline: none;
  border-style: solid;
  cursor: pointer;
  width: 100%;
  outline: none;
  border: none;
  margin: 0;
  font-size: 14px;
  padding: 12px 16px;
  transition: ${({ theme }) => theme.transition.all};
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[500]};
  &:hover {
    color: ${({ theme, isDelete }) =>
      isDelete ? theme.color.red[200] : theme.color.blue[300]};
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    display: block;
    width: 100%;
  }
`
