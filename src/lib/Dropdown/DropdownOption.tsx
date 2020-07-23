import styled from '@emotion/styled'

export default styled.button<{ isDelete?: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  white-space: nowrap;
  align-items: center;
  outline: none;
  pointer-events: all;
  border-style: solid;
  cursor: pointer;
  width: 100%;
  outline: none;
  border: none;
  margin: 0;
  cursor: pointer;
  font-size: 16px;
  padding: 16px 16px;
  transition: ${({ theme }) => theme.transition.all};
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[500]};
  /* &:nth-of-type(1) {
    border-radius: 8px 8px 0 0;
  }
  &:nth-last-of-type(1) {
    border-radius: 0 0 8px 8px
  } */
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
