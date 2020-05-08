import React from 'react'
import styled from 'styled-components'

const StyledImage = styled.img`
  display: block;
  height: ${({ theme }) => theme.sizes.image};
  margin: 0 auto ${({ theme }) => theme.space[2]};
`

export default ({ alt, src }) => (
  <StyledImage alt={alt} src={src} loading='lazy' />
)
