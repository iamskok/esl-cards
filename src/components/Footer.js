import React from 'react'
import styled from 'styled-components'
import Text from './Text'
import Link from './Link'

const StyledFooter = styled.footer`
  padding: ${({ theme }) => theme.space[3]};
`

export default ({ children }) => (
  <StyledFooter>
    <Text center={true}>
      {`Built with `}
      <Link
        tabIndex='-1'
        href='https://media.giphy.com/media/3oriO6qJiXajN0TyDu/source.gif'
      >
        {`<3`}
      </Link>
      {` and pixels by `}
      <Link tabIndex='-1' href='https://github.com/iamskok'>
        Vladimir
      </Link>
    </Text>

    {children}
  </StyledFooter>
)
