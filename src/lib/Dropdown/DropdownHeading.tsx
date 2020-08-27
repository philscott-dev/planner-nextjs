import styled from '@emotion/styled'

export default styled.p<{ isDelete?: boolean; disabled?: boolean }>`
  display: flex;
  align-items: left;
  white-space: nowrap;
  align-items: flex-start;
  outline: none;
  border-style: solid;
  width: 100%;
  outline: none;
  border: none;
  margin: 0;
  font-size: 12px;
  padding: 8px 24px 4px 24px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.font.family};
  transition: ${({ theme }) => theme.transition.all};
  color: ${({ theme }) => theme.color.gray[200]};
  background: ${({ theme }) => theme.color.blue[700]};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    /* display: block; */
    width: 100%;
  }
`
