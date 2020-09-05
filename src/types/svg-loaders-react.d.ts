declare module 'svg-loaders-react' {
  import type { FC } from 'react'
  interface Props {
    stroke: string
    strokeOpacity?: string
    viewBox: string
  }

  export const Grid: FC<Props>
}
