import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const StyledButton = styled(Button)`
  position: absolute;
  top: ${({ theme }) => theme.space[3]};
  right: ${({ theme }) => theme.space[3]};
`

export default ({ children, onClick }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
)
