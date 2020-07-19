import styled from '@emotion/styled'

const IconButton = styled.button`
  margin: 0;
  padding: 0;
  line-height: 0;
  border: 0;
  font-size: 100%;
  display: block;
  background: transparent;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  color: ${({ theme }) => theme.color.white[100]};
  outline: none;
  &:hover {
    & * {
      color: ${({ theme }) => theme.color.blue[300]};
      transition: ${({ theme }) => theme.transition.color};
    }
  }
`

export default IconButton
