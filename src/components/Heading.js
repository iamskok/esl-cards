import React from 'react'
import styled from 'styled-components'
import PageHeading from './PageHeading'

const StyledHeading = styled(PageHeading)`
  margin-top: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.fontSizes[4]};
`

export default ({ children }) => (
  <StyledHeading as='h2'>{children}</StyledHeading>
)
