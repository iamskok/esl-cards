import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import backToTop from '../icons/back-to-top.svg'
import SVG from 'react-inlinesvg'

const StyledScrollTopButton = styled(Button)`
  position: absolute;
  right: ${({ theme }) => theme.space[3]};
  bottom: ${({ theme }) => theme.space[3]};
`

const StyledSVG = styled(SVG)`
  width: ${({ theme }) => theme.sizes.svgButton};
  height: ${({ theme }) => theme.sizes.svgButton};
  pointer-events: none;
`

export default ({ play }) => {
  const [showScroll, setShowScroll] = useState(false)
  // console.log('showScroll', showScroll)

  const checkScrollTop = () => {
    // console.log('checkScrollTop')
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false)
    }
  }

  const scrollTop = () => {
    // console.log('scrollTop')
    try {
      // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0)
    }
    play()
  }

  window.addEventListener('scroll', checkScrollTop)

  return (
    <StyledScrollTopButton onClick={scrollTop}>
      <StyledSVG src={backToTop} />
    </StyledScrollTopButton>
  )
}
