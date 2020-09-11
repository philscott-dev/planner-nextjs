/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useRef, MouseEvent, useState } from 'react'
import { jsx, css } from '@emotion/react'
import {
  IconButton,
  Text,
  Button as DefaultButton,
  Input,
  Form,
  FormButton,
} from 'lib'
import {
  FiMoreVertical,
  FiEdit,
  FiX,
  FiCheck,
  FiTrash,
  FiTrash2,
} from 'react-icons/fi'
import { FaAngleDoubleDown, FaAngleDoubleUp, FaTrashAlt } from 'react-icons/fa'
import { useOnClickOutside } from 'hooks'
import { Entries } from 'lib/FormElements/types'

interface PlannerRowHeaderProps {
  className?: string
  isActive: boolean
  label: string
  id: string | number
  index: number
  rowCount: number
  onRowRename: (value: string, rowId: string | number, index: number) => void
  onRowDelete: (rowId: string | number, index: number) => void
  onRowUp: (rowId: string | number, index: number) => void
  onRowDown: (rowId: string | number, index: number) => void
  onMouseDown: (e: MouseEvent) => void
  onDoubleClick: (e: MouseEvent) => void
}
const PlannerRowHeader: FC<PlannerRowHeaderProps> = ({
  className,
  children,
  label,
  isActive,
  id,
  index,
  rowCount,
  onRowRename,
  onRowDelete,
  onRowUp,
  onRowDown,
  onMouseDown,
  onDoubleClick,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMenuVisible, setMenuVisibility] = useState(false)
  const [isRenameVisible, setRenameVisibility] = useState(false)
  const [isDeleteVisible, setDeleteVisibility] = useState(false)
  useOnClickOutside(
    ref,
    () => {
      setMenuVisibility(false)
      setDeleteVisibility(false)
      setRenameVisibility(false)
    },
    isMenuVisible || isDeleteVisible || isRenameVisible,
  )

  const handleMenuVisibility = (e: MouseEvent<HTMLButtonElement>) => {
    setMenuVisibility(!isMenuVisible)
    setDeleteVisibility(false)
    setRenameVisibility(false)
  }

  const handleRenameClick = () => {
    setRenameVisibility(true)
    setMenuVisibility(false)
  }

  const handleDeleteClick = () => {
    setDeleteVisibility(true)
    setMenuVisibility(false)
  }

  const handleRowUpClick = () => {
    onRowUp(id, index)
  }
  const handleRowDownClick = () => {
    onRowDown(id, index)
  }

  const handleRenameCancel = () => {
    setRenameVisibility(false)
  }

  const handleRenameConfirm = (entries: Entries) => {
    const value = entries.label as string
    onRowRename(value, id, index)
    setRenameVisibility(false)
  }

  const handleDeleteCancel = () => {
    setDeleteVisibility(false)
  }
  const handleDeleteConfirm = () => {
    onRowDelete(id, index)
    setDeleteVisibility(false)
  }

  return (
    <Wrapper
      ref={ref}
      className={className}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <Container>
        <Heading>
          <IconButton onMouseDown={handleMenuVisibility} css={iconButtonCss}>
            <FiMoreVertical />
          </IconButton>
          <Text size="small">
            {isDeleteVisible
              ? `Are you sure you want to delete ${label}?`
              : label}
          </Text>
        </Heading>
        <Menu isVisible={isMenuVisible}>
          <Button onMouseDown={handleRenameClick}>
            <FiEdit css={iconCss} /> Rename
          </Button>
          <Button disabled={index === 0} onMouseDown={handleRowUpClick}>
            <FaAngleDoubleUp css={iconCss} /> Up
          </Button>
          <Button
            disabled={rowCount === index + 1}
            onMouseDown={handleRowDownClick}
          >
            <FaAngleDoubleDown css={iconCss} /> Down
          </Button>
          <Button onMouseDown={handleDeleteClick}>
            <FaTrashAlt css={iconCss} /> Delete
          </Button>
        </Menu>
        <SubMenu isVisible={isRenameVisible}>
          <Form
            loading={false}
            error={undefined}
            rules={{}}
            autoComplete="off"
            onSubmit={handleRenameConfirm}
          >
            <Input
              type="text"
              name="label"
              shouldShowLabel={false}
              placeholder={label}
              defaultValue={label}
              inputSize="small"
              css={css`
                margin: 0;
                max-width: 363px;
                flex-shrink: 1;
                margin-right: 8px;
              `}
            />
            <IB isDelete onMouseDown={handleRenameCancel}>
              <FiX />
            </IB>
            <IB type="submit">
              <FiCheck />
            </IB>
          </Form>
        </SubMenu>
        <Menu isVisible={isDeleteVisible}>
          <IB onMouseDown={handleDeleteCancel}>
            <FiX />
          </IB>
          <IB isDelete onMouseDown={handleDeleteConfirm}>
            <FiTrash2 />
          </IB>
        </Menu>
      </Container>
    </Wrapper>
  )
}

export default PlannerRowHeader

const Wrapper = styled.div<{ isSticky?: boolean }>`
  position: sticky;
  z-index: 150;
  top: 140px;
  box-sizing: border-box;
  display: flex;
  pointer-events: none;
  background: ${({ theme, isSticky }) =>
    isSticky ? theme.color.blue[700] : `${theme.color.blue[700]}4c`};
`

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 2px;
  padding: 2px 4px 2px 0;
  margin: 2px 4px 2px 4px;
  pointer-events: all;
`

const Heading = styled.div`
  display: flex;
`

const Menu = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  flex: 1;
  max-width: 375px;
  align-items: center;
  padding-left: 6px;
  padding-right: 6px;
  box-sizing: border-box;
  min-height: 62px;
  max-height: 62px;
`

const SubMenu = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  align-items: center;
  flex: 1;
  max-width: 375px;
  padding-top: 8px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 8px;
  box-sizing: border-box;
  min-height: 61px;
  max-height: 61px;
`

const iconCss = css`
  margin-right: 8px;
`

const iconButtonCss = css`
  margin-right: 4px;
`

const Button = styled(DefaultButton.Tertiary)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  padding: 0;
  font-size: 14px;
  margin-right: 24px;
  font-weight: 300;
  line-height: 24;
  font-family: ${({ theme }) => theme.font.family};
`

const IB = styled(IconButton)<{ isDelete?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  min-width: 40px;
  margin-right: 8px;
  border-radius: 2px;
  background: ${({ theme }) => theme.color.blue[500]};
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
