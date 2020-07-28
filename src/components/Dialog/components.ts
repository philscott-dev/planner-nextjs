import { Button, Text } from 'lib'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Dialog = styled.div<{ isVisible: boolean }>`
  flex-direction: column;
  box-sizing: border-box;
  position: absolute;
  left: 8px;
  z-index: 150;
  overflow: hidden;
  border-radius: 8px;
  padding: 24px;
  max-width: 350px;
  background: ${({ theme }) => theme.color.blue[600]};
  box-shadow: ${({ theme }) => theme.shadow.up.two};
  /* display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')}; */
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: all 0.3s ease-in-out;
`

const DialogLabel = styled(Text)`
  margin-bottom: 24px;
`

const DialogText = styled(Text.Light)`
  font-size: 14px;
  margin-bottom: 24px;
`

const CancelButton = styled(Button)`
  display: flex;
  justify-content: center;
  flex: 1;
  padding: 16px 0;
  margin-right: 12px;
  background: ${({ theme }) => theme.color.blue[500]};
  border: 0;
  color: ${({ theme }) => theme.color.gray[300]};
  &:hover {
    color: ${({ theme }) => theme.color.blue[300]};
  }
`

const deleteCss = css`
  display: flex;
  justify-content: center;
  flex: 1;
  box-shadow: none;
  padding: 16px 0;
  background: transparent;
  &:hover {
    border: 2px solid #ff0202;
    background: transparent;
    color: #ff0202;
    box-shadow: none;
  }
`

const submitCss = css`
  display: flex;
  justify-content: center;
  flex: 1;
  padding: 0;
  padding: 16px 0;
  box-shadow: none;
  border: 0;
  &:hover {
    box-shadow: none;
  }
`

const inputCss = css`
  margin-bottom: 24px;
  width: 350px;
`

const iconCss = css`
  margin-left: 8px;
`

export {
  Dialog,
  DialogLabel,
  DialogText,
  CancelButton,
  inputCss,
  submitCss,
  deleteCss,
  iconCss,
}
