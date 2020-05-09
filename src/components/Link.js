import React from 'react'
import Text from './Text'
import styled from 'styled-components'

const StyledLink = styled(Text)`
  color: ${({ theme }) => theme.colors.secondary};
  transition: color ${({ theme }) => theme.durations.default}
    ${({ theme }) => theme.timingFunctions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export default ({ children, ...props }) => (
  <StyledLink as='a' {...props}>
    {children}
  </StyledLink>
)
