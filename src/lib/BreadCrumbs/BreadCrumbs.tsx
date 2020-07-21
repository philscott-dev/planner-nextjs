import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Anchor } from 'lib/Anchor'
import Slash from './Slash'
import HomePath from './HomePath'

type Path = {
  label: string
  href: string
}
interface BreadCrumbsProps {
  paths: Path[]
  homePath?: string
}

const BreadCrumbs: FC<BreadCrumbsProps> = ({ paths, homePath }) => {
  return (
    <Container>
      <HomePath homePath={homePath} />
      {paths.map((path) => (
        <>
          <Slash />
          <Anchor href={path.href}>{path.label}</Anchor>
        </>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.blue[700]};
  margin-bottom: 32px;
`

export default BreadCrumbs
