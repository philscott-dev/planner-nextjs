/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/react'
import { FC, DragEvent, FormEvent, useEffect } from 'react'
import { H1, Text } from 'components'
import { FaDownload } from 'react-icons/fa'
import { IconButton } from 'components/IconButton'
import { FiX } from 'react-icons/fi'

interface PlannerFileImportProps {
  className?: string
}

const PlannerFileImport: FC<PlannerFileImportProps> = ({ className }) => {
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
        console.log(fileReader.result)
      }
      fileReader.readAsText(file)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <div className={className}>
      <Flex>
        <H1>Import</H1>
        <IconButton>
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
          />
          <Label htmlFor="file__uploader">
            <Text
              css={css`
                cursor: pointer;
              `}
            >
              Choose a JSON file{' '}
            </Text>
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
    </div>
  )
}

export default styled(PlannerFileImport)`
  position: absolute;
  top: 0;
  width: 500px;
  left: 50%;
  margin-left: -250px;
  padding: 0 32px 24px 32px;
  align-items: center;
  background: ${({ theme }) => theme.color.blue[700]};
  z-index: 150;
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.shadow.up.two};
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
