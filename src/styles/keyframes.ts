import { keyframes } from '@emotion/react'
export const fade = keyframes`
  0% {
    display: none;
    visibility: hidden;
    opacity: 0;
  }

  100% {
    display: inherit;
    visibility: visible;
    opacity: 1;
  }
  `

export const fadeOut = keyframes`
0% {
  display: inherit;
  visibility: visible;
  opacity: 1;
}
100% {
  display: none;
  visibility: hidden;
  opacity: 0;
}
`
