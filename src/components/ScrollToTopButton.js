import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import backToTop from '../icons/back-to-top.svg'
import SVG from 'react-inlinesvg'

const StyledScrollTopButton = styled(Button)`
  position: absolute;
  right: ${({ theme }) => theme.space[3]};
  bottom: ${({ theme }) => theme.space[3]};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transition: opacity ${({ theme }) => theme.durations.default}
    ${({ theme }) => theme.timingFunctions.default};
`

const StyledSVG = styled(SVG)`
  width: ${({ theme }) => theme.sizes.svgButton};
  height: ${({ theme }) => theme.sizes.svgButton};
  pointer-events: none;
`

export default ({ scrollTop, visible }) => (
  <StyledScrollTopButton
    onClick={scrollTop}
    visible={visible}
    // When button is invisible remove it from the default
    // navigation flow.
    tabIndex={visible ? 0 : -1}
  >
    <StyledSVG src={backToTop} />
  </StyledScrollTopButton>
)
