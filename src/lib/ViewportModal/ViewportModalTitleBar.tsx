/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/react'
import { FC, MouseEvent, useState } from 'react'
import { IconButton, Text, Button } from 'lib'
import {
  FiMinimize2,
  FiMaximize2,
  FiX,
  FiMoreVertical,
  FiTrash2,
} from 'react-icons/fi'
import { FaRegClone, FaTrashAlt } from 'react-icons/fa'

interface ViewportModalTitleBarProps {
  className?: string
  title?: string
  id?: number | string
  isMinimized: boolean
  onDelete: () => void
  onClone: () => void
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
}

const ViewportModalTitleBar: FC<ViewportModalTitleBarProps> = ({
  className,
  title,
  id,
  isMinimized,
  onDelete,
  onClose,
  onClone,
  onMinimize,
  onMaximize,
}) => {
  const [isMenuVisible, setMenuVisibility] = useState(false)
  const [isDeleteVisible, setDeleteVisibility] = useState(false)

  const handleBarDoubleClick = (_e: MouseEvent) => {
    //isMinimized ? onMaximize() : onMinimize()
  }

  const handleMenuVisibility = (e: MouseEvent<HTMLButtonElement>) => {
    setMenuVisibility(!isMenuVisible)
    setDeleteVisibility(false)
  }

  const handleDeleteClick = () => {
    setDeleteVisibility(true)
    setMenuVisibility(false)
  }

  const handleDeleteCancel = () => {
    setDeleteVisibility(false)
  }
  const handleDeleteConfirm = () => {
    setDeleteVisibility(false)
    onDelete()
  }

  const handleCloneClick = () => {
    onClone()
    setMenuVisibility(false)
  }
  return (
    <div className={className}>
      <Bar onDoubleClick={handleBarDoubleClick} isVisible={true}>
        <Flex>
          <IconButton
            type="button"
            disabled={!id}
            onMouseDown={handleMenuVisibility}
            style={{ marginRight: 4, minHeight: 24, minWidth: 24 }}
          >
            <FiMoreVertical />
          </IconButton>
        </Flex>
        <Title>{id && title ? title : 'New Event'}</Title>
        <Flex>
          <IconButton
            onMouseDown={onClose}
            style={{ marginLeft: 16, minHeight: 24, minWidth: 24 }}
          >
            <FiX />
          </IconButton>
        </Flex>
      </Bar>
      <SubBar isVisible={isMenuVisible}>
        <Flex>
          <Button.Tertiary
            type="submit"
            size="small"
            style={{ marginRight: 16 }}
            onClick={handleCloneClick}
          >
            <FaRegClone css={iconCss} /> Clone
          </Button.Tertiary>
          <Button.Tertiary
            type="button"
            size="small"
            onMouseDown={handleDeleteClick}
          >
            <FiTrash2 css={iconCss} /> Delete
          </Button.Tertiary>
        </Flex>
      </SubBar>
      <SubBar isVisible={isDeleteVisible}>
        <Flex>
          <Text.Light>Are you sure you want to delete?</Text.Light>
        </Flex>
        <Flex>
          <Button.Tertiary
            type="button"
            size="small"
            style={{ marginRight: 16 }}
            onMouseDown={handleDeleteCancel}
          >
            <FiX css={iconCss} /> Cancel
          </Button.Tertiary>
          <Button.Tertiary
            type="submit"
            size="small"
            onMouseDown={handleDeleteConfirm}
          >
            <FiTrash2 css={iconCss} /> Confirm
          </Button.Tertiary>
        </Flex>
      </SubBar>
    </div>
  )
}

export default styled(ViewportModalTitleBar)``

const Bar = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  min-height: 64px;
  padding: 0 24px;
  background: ${({ theme }) => theme.color.blue[700]};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    padding: 0 24px;
  }
`

const SubBar = styled(Bar)`
  flex-wrap: wrap;
`

const Title = styled(Text)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 1;
  margin: 0 16px;
`

const iconCss = css`
  margin-right: 4px;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 8px 0;
`

const IB = styled(IconButton)<{ isDelete?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  min-width: 40px;
  margin-right: 8px;
  border-radius: 2px;
  background: ${({ theme }) => theme.color.blue[600]};
  border: 2px solid ${({ theme }) => theme.color.blue[400]};
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.color.blue[400]};
  transition: ${({ theme }) => theme.transition.all};
  &:hover {
    border-color: ${({ theme, isDelete }) =>
      isDelete ? theme.color.red[300] : theme.color.blue[300]};
    & * {
      color: ${({ theme }) => theme.color.white[100]};
      transition: ${({ theme }) => theme.transition.color};
    }
  }
`
