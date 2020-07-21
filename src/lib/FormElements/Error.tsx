/** @jsx jsx */
import { useContext, FC } from 'react'
import { jsx, css, Theme } from '@emotion/react'
import { ValidationContext } from './Form'
import { Text } from 'lib'

export interface ErrorProps {
  name: string
}

const Error: FC<ErrorProps> = ({ name }) => {
  const { errors } = useContext(ValidationContext)
  const error = errors[name]
  if (!error) return null
  return (
    <Text className="errormessage" size="small" css={errorCss}>
      {error}
    </Text>
  )
}

const errorCss = (theme: Theme) => css`
  color: ${theme.color.red};
  margin-left: 24px;
  margin-top: 8px;
`

export default Error
