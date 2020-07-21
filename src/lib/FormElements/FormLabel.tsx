import styled from '@emotion/styled'

interface StyledLabelProps {
  isVisible: boolean
  error: boolean
}

export default styled.label<StyledLabelProps>`
  position: absolute;
  left: 20px;
  background: ${({ theme }) => theme.color.blue[500]};
  padding: 0 4px;
  transition: all 0.2s ease-in-out;
  visibility: ${({ isVisible }) => (isVisible ? 'visibility' : 'hidden')};
  top: ${({ isVisible }) => (isVisible ? -8 : 12)}px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  color: ${({ theme, error }) =>
    !error ? theme.color.white[100] : theme.color.red[300]};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 14px;
`
