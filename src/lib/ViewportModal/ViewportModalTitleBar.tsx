/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/react'
import { FC, MouseEvent } from 'react'
import { IconButton, Text } from 'lib'
import { FiMinimize2, FiMaximize2, FiX } from 'react-icons/fi'
import { FaTrashAlt } from 'react-icons/fa'

interface ViewportModalTitleBarProps {
  className?: string
  title?: string
  isMinimized: boolean
  onDelete?: () => void
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
}

const ViewportModalTitleBar: FC<ViewportModalTitleBarProps> = ({
  className,
  title,
  isMinimized,
  onDelete,
  onClose,
  onMinimize,
  onMaximize,
}) => {
  const handleBarDoubleClick = (_e: MouseEvent) => {
    //isMinimized ? onMaximize() : onMinimize()
  }
  return (
    <div className={className} onDoubleClick={handleBarDoubleClick}>
      <Flex>
        <IconButton onMouseDown={onDelete} css={iconCss}>
          <FaTrashAlt />
        </IconButton>
        <Title>{title ? title : 'New Event'}</Title>
      </Flex>
      <Flex>
        {/* {isMinimized ? (
          <IconButton onMouseDown={onMaximize} css={iconCss}>
            <FiMaximize2 />
          </IconButton>
        ) : (
          <IconButton onMouseDown={onMinimize} css={iconCss}>
            <FiMinimize2 />
          </IconButton>
        )} */}
        <IconButton onMouseDown={onClose} style={{ marginRight: 16 }}>
          <FiX />
        </IconButton>
      </Flex>
    </div>
  )
}

export default styled(ViewportModalTitleBar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 64px;
  padding: 0 24px;
  background: ${({ theme }) => theme.color.blue[700]};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.xsmall}) {
    padding: 0 16px;
  }
`

const Title = styled(Text)`
  margin-right: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const iconCss = css`
  margin-right: 16px;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
`
