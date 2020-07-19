/** @jsx jsx */
import { FC, useState, useContext, useEffect } from 'react'
import { jsx, css } from '@emotion/react'
import { ValidationContext } from './Form'
import { LoadingStatus } from './hooks/useLoadingStatus'

export interface ButtonProps {
  name?: string
}

const Button: FC<ButtonProps> = ({ name, children }) => {
  const { delayedStatus, animationSpeed } = useContext(ValidationContext)
  const [previousStatus, setPreviousStatus] = useState(LoadingStatus.Normal)
  const [animation, setAnimation] = useState(baseCss)

  useEffect(() => {
    const delayToNormal = () => {
      setTimeout(() => {
        setAnimation(baseCss)
      }, animationSpeed)
    }

    if (previousStatus !== delayedStatus) {
      if (
        previousStatus === LoadingStatus.Error &&
        delayedStatus === LoadingStatus.Normal
      ) {
        setAnimation(errorToNormal)
        delayToNormal()
      }
      if (
        previousStatus === LoadingStatus.Success &&
        delayedStatus === LoadingStatus.Normal
      ) {
        setAnimation(successToNormal)
        delayToNormal()
      }
      if (delayedStatus === LoadingStatus.Success) {
        setAnimation(normalToSuccess)
      }
      if (delayedStatus === LoadingStatus.Error) {
        setAnimation(normalToError)
      }
      setPreviousStatus(delayedStatus)
    }
  }, [delayedStatus, previousStatus, animationSpeed])

  const disabled = delayedStatus !== LoadingStatus.Normal

  return (
    <button type="submit" disabled={disabled} name={name} css={animation}>
      {children}
    </button>
  )
}

const colors = {
  blue: '#114b5f',
  red: '#ff5151',
  green: '#1a936f',
}

const baseCss = css`
  position: relative;
  text-align: center;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  background-size: 360% 120%;
  color: #fcfcfc;
  border: none;
  height: 40px;
  border-radius: 2px;
  overflow: hidden;
  background-position: right bottom;
  background: linear-gradient(
    135deg,
    ${colors.blue},
    ${colors.blue} 33%,
    ${colors.red} 33%,
    ${colors.red} 66%,
    ${colors.blue} 66%
  );
  background-position: right bottom;
  background-size: 360% 120%;
`

export const normalToError = css`
  ${baseCss};
  background: linear-gradient(
    135deg,
    ${colors.blue},
    ${colors.blue} 33%,
    ${colors.red} 33%,
    ${colors.red} 66%,
    ${colors.blue} 66%
  );
  background-position: 50% bottom;
  background-size: 360% 120%;
  transition: all ${700}ms ease-in-out;
`

export const errorToNormal = css`
  ${baseCss};
  background: linear-gradient(
    135deg,
    ${colors.blue},
    ${colors.blue} 33%,
    ${colors.red} 33%,
    ${colors.red} 66%,
    ${colors.blue} 66%
  );
  background-position: left bottom;
  background-size: 360% 120%;
  transition: all ${700}ms ease-in-out;
`

export const normalToSuccess = css`
  ${baseCss};
  background: linear-gradient(
    135deg,
    ${colors.blue},
    ${colors.blue} 33%,
    ${colors.green} 33%,
    ${colors.green} 66%,
    ${colors.blue} 66%
  );
  background-position: 50% bottom;
  background-size: 360% 120%;
  transition: all ${700}ms ease-in-out;
`
export const successToNormal = css`
  ${baseCss};
  background: linear-gradient(
    135deg,
    ${colors.blue},
    ${colors.blue} 33%,
    ${colors.green} 33%,
    ${colors.green} 66%,
    ${colors.blue} 66%
  );
  background-position: left bottom;
  background-size: 360% 120%;
  transition: all ${700}ms ease-in-out;
`

export default Button
