import React, { useState } from 'react'
import styled from 'styled-components'
import isTouchDevice from '../utils/is-touch-device'

const StyledButton = styled.button`
  padding: ${({ theme }) => theme.space[2]};
  border: 0;
  border-radius: ${({ theme }) => theme.radii[1]};
  background-color: ${({ touch, theme }) =>
    touch ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.fontSizes[3]};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.durations.default}
    ${({ theme }) => theme.timingFunctions.default};
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: ${!isTouchDevice() &&
    (({ theme }) => theme.colors.primary)};
  }
`

export default ({ children, onClick, ...props }) => {
  const [touch, setTouch] = useState(false)
  const addTouchStyles = () => setTouch(true)
  const removeTouchStyles = () => setTouch(false)

  return (
    <StyledButton
      {...props}
      touch={touch}
      onTouchStart={addTouchStyles}
      onTouchEnd={removeTouchStyles}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}
