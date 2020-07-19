/** @jsx jsx */
import { jsx, css, Theme } from '@emotion/react'
import { FC } from 'react'
import { FiX } from 'react-icons/fi'
import { IconButton } from '../IconButton'

const CloseButton: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <IconButton aria-label="close" onMouseDown={onClose} css={buttonCss}>
      <FiX css={iconCss} />
    </IconButton>
  )
}

const buttonCss = css`
  margin-left: 8px;
`
const iconCss = (theme: Theme) =>
  css`
    color: ${theme.color.white[100]};
  `

export default CloseButton
