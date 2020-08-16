/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/react'
import { H1, Text } from 'lib'
import { FaDownload } from 'react-icons/fa'
import { IconButton } from 'lib/IconButton'
import { FiX } from 'react-icons/fi'
import { isString } from 'util'
import { useOnClickOutside } from 'hooks'
import {
  FC,
  DragEvent,
  ChangeEvent,
  useEffect,
  useState,
  createRef,
} from 'react'

interface PlannerFileImportProps {
  className?: string
  isVisible: boolean
  onImport: (json: string) => void
  onClose: () => void
}

const PlannerFileImport: FC<PlannerFileImportProps> = ({
  className,
  isVisible,
  onImport,
  onClose,
}) => {
  const ref = createRef<HTMLDivElement>()
  useOnClickOutside(ref, () => onClose(), isVisible)
  // useEffect(() => {
  //   if (isVisible) {
  //     setMount(true)
  //   } else {
  //     const timeout = setTimeout(() => {
  //       setMount(false)
  //     }, 1000)
  //     return () => clearTimeout(timeout)
  //   }
  // }, [isVisible])

  useEffect(() => {
    function prevDef(e: Event) {
      e.preventDefault()
    }
    window.addEventListener('dragover', prevDef, false)
    window.addEventListener('drop', prevDef, false)
    return () => {
      window.removeEventListener('dragover', prevDef, false)
      window.removeEventListener('drop', prevDef, false)
    }
  }, [])
  const handleDragEnter = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleDrop = async (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const droppedFiles = e.dataTransfer.files
    const fileReader: FileReader = new FileReader()
    const file = droppedFiles.item(0)
    if (file && file.type === 'application/json') {
      fileReader.onload = function () {
        if (fileReader.result && isString(fileReader.result)) {
          onImport(fileReader.result)
        }
      }
      fileReader.readAsText(file)
    }
  }

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const fileReader: FileReader = new FileReader()
    const files = e.target.files
    const file = files?.item(0)
    if (file && file.type === 'application/json') {
      fileReader.onload = function () {
        if (fileReader.result && isString(fileReader.result)) {
          onImport(fileReader.result)
        }
      }
      fileReader.readAsText(file)
    }
  }

  return (
    <Modal ref={ref} isVisible={isVisible} className={className}>
      <Flex>
        <H1>Import</H1>
        <IconButton onMouseDown={onClose}>
          <FiX />
        </IconButton>
      </Flex>
      <Form
        className="box"
        action=""
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
      >
        <Container className="box__input">
          <Icon />
          <Input
            className="box__file"
            type="file"
            name="file__uploader"
            id="file__uploader"
            accept=".json,application/json"
            onChange={handleSubmit}
          />
          <Label htmlFor="file__uploader">
            <Link>Choose a JSON file </Link>
            &nbsp;
            <Text.Light className="box__dragndrop">
              {' '}
              or drag it here.
            </Text.Light>
          </Label>
          <Submit className="box__button" type="submit">
            Upload
          </Submit>
        </Container>
        {/* <div className="box__uploading">Uploading…</div>
        <div className="box__success">Done!</div>
        <div className="box__error">
          Error! <span></span>.
        </div> */}
      </Form>
    </Modal>
  )
}

interface ModalProps {
  isVisible: boolean
}
const Modal = styled.div<ModalProps>`
  display: none;
  visibility: ${({ isVisible }) => (!isVisible ? 'hidden' : 'visible')};
  position: absolute;
  top: ${({ isVisible }) => (isVisible ? '0' : '-450px')};
  width: 500px;
  left: 50%;
  margin-left: -250px;
  padding: 0 32px 24px 32px;
  align-items: center;
  z-index: 150;
  box-sizing: border-box;
  background: ${({ theme }) => theme.color.blue[700]};
  box-shadow: ${({ theme }) => theme.shadow.up.two};
  transition: all 0.3s ease-in-out;
`

const Form = styled.form`
  font-size: 20px;
  background-color: ${({ theme }) => theme.color.blue[400]};
  position: relative;
  padding: 100px 20px;
  outline: 2px dashed ${({ theme }) => theme.color.white[100]};
  outline-offset: -10px;
  -webkit-transition: outline-offset 0.15s ease-in-out,
    background-color 0.15s linear;
  transition: outline-offset 0.15s ease-in-out, background-color 0.15s linear;
`

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  max-width: 80%;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
`

const Label = styled.label`
  display: flex;
`

const Submit = styled.button`
  display: none;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Icon = styled(FaDownload)`
  color: ${({ theme }) => theme.color.white[100]};
  font-size: 40px;
  margin-bottom: 16px;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`

const Link = styled(Text)`
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.gray[200]};
  }
  transition: all 0.3s ease-in-out;
`

export default PlannerFileImport
