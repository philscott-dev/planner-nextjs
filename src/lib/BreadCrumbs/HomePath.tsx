/** @jsx jsx */
import { FC } from 'react'
import { css, jsx } from '@emotion/react'
import { FiHome } from 'react-icons/fi'
import { Anchor } from 'lib/Anchor'

const HomePath: FC<{ homePath?: string }> = ({ homePath }) => {
  return (
    <Anchor
      aria-label="Home"
      href={homePath ? homePath : '/'}
      size="large"
      css={anchorCss}
    >
      <FiHome />
    </Anchor>
  )
}

const anchorCss = css`
  display: flex;
  align-items: center;
  line-height: unset;
`

export default HomePath
