/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx, keyframes } from '@emotion/react'
import { Grid } from 'svg-loaders-react'
import { Text } from 'lib'

interface LoadingIndicatorProps {
  className?: string
  isLoading: boolean
}
const LoadingIndicator: FC<LoadingIndicatorProps> = ({
  className,
  isLoading = false,
}) => {
  if (!isLoading) {
    return null
  }
  return (
    <div className={className}>
      <Grid stroke="#fcfcfc" strokeOpacity="1" viewBox="-1 -1 108 108" />
      <Text.Light>Loading</Text.Light>
    </div>
  )
}

export default styled(LoadingIndicator)`
  position: fixed;
  display: flex;
  left: 24px;
  bottom: 24px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: none;
  > svg {
    box-sizing: border-box;
    width: 24px;
    height: 24px;
  }
  > p {
    margin-left: 16px;
  }
`

// const pulse = keyframes`
//    0% { transform: scale(0.9); opacity: 0.7; }
//     50% { transform: scale(1); opacity: 1; }
//     100% { transform: scale(0.9); opacity: 0.7; }
// `
