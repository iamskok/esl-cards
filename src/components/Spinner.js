import React from 'react'
import styled, { keyframes } from 'styled-components'

const animation = () => keyframes`
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
`

const StyledSpinner = styled.div`
  position: relative;
  display: inline-block;
  width: ${({ theme }) => theme.sizes.spinner};
  height: ${({ theme }) => theme.sizes.spinner};

  div {
    position: absolute;
    border: ${({ theme }) => theme.borderWidth[2]} solid
      ${({ theme }) => theme.colors.gray};
    border-radius: ${({ theme }) => theme.radii[3]};
    opacity: 1;
    animation: ${animation} ${({ theme }) => theme.durations.spinner}
      ${({ theme }) => theme.timingFunctions.spinner} infinite;
  }

  div:nth-child(2) {
    animation-delay: ${({ theme }) => theme.durations.spinnerDelay};
  }
`

export default () => (
  <StyledSpinner>
    <div />
    <div />
  </StyledSpinner>
)
