import styled from '@emotion/styled'

interface StyledLabelProps {
  isVisible: boolean
  error: boolean
}

export default styled.label<StyledLabelProps>`
  position: absolute;
  left: 0;
  background: ${({ theme }) => theme.color.blue[500]};
  padding: 0 4px;
  transition: all 0.2s ease-in-out;
  visibility: ${({ isVisible }) => (true ? 'visibility' : 'hidden')};
  top: ${({ isVisible }) => (true ? -32 : 12)}px;
  opacity: ${({ isVisible }) => (true ? 1 : 0)};
  color: ${({ theme, error }) =>
    !error ? theme.color.gray[200] : theme.color.red[300]};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  text-transform: uppercase;
`
