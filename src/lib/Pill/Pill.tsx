/** @jsx jsx */
import { FC } from 'react'
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { Text } from 'lib/Text'
import CloseButton from './CloseButton'

interface PillProps {
  className?: string
  onClose?: () => void
  text: string
}

const PillComponent: FC<PillProps> = ({ onClose, text, className }) => (
  <div className={className}>
    <Text size="small">{text}</Text>
    {onClose ? <CloseButton onClose={onClose} /> : null}
  </div>
)

const Pill = styled(PillComponent)`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  margin: 8px 0;
  border-radius: 40px;
  margin-right: 16px;
  background: ${({ theme }) => theme.color.blue[400]};
`

export default Pill
