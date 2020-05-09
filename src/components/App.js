import React, { useState, useEffect, useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../theme'
import GlobalStyles from '../styles/global'
import ScrollContainer from './ScrollContainer'
import Container from './Container'
import PageHeading from './PageHeading'
import ColorModeButton from './ColorModeButton'
import SearchBox from './SearchBox'
import NoCardsFound from './NoCardsFound'
import FlexCenter from './FlexCenter'
import Spinner from './Spinner'
import Text from './Text'
import Grid from './Grid'
import Card from './Card'
import Footer from './Footer'
import ScrollToTopButton from './ScrollToTopButton'
import useFetch from '../hooks/useFetch'
import useSound from 'use-sound'
import mouseClickSound from '../sounds/bite.mp3'
import debounce from '../utils/debounce'
import {
  ENDPOINT,
  INITIAL_PAGE_SIZE,
  DEBOUNCE_TIMEOUT,
} from '../constants'

export default () => {
  const [urlParams, setUrlParams] = useState({
    name: ``,
    currentPage: 1,
  })
  const [blockRequest, setBlockRequest] = useState(true)
  const [exhausted, setExhausted] = useState(false)
  const [cards, setCards] = useState([])
  const [scrollTopButtonVisible, setScrollTopButtonVisible] = useState(
    false
  )

  const stored = localStorage.getItem(`isDarkMode`)
  const [isDarkMode, setIsDarkMode] = useState(
    stored === `true` ? true : false
  )

  const [play] = useSound(mouseClickSound)

  const handleColorMode = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem(`isDarkMode`, !isDarkMode)
    play()
  }

  const res = useFetch(
    `${ENDPOINT}?${INITIAL_PAGE_SIZE}&page=${urlParams.currentPage}&name=${urlParams.name}`,
    {}
  )

  const handleInputChange = text => {
    if (text !== urlParams.name) {
      setCards([])
      setUrlParams({
        name: text,
        currentPage: 1,
      })
      setExhausted(false)
    }
  }

  useEffect(() => {
    if (res.response !== null && res.error === null) {
      setCards([...cards, ...res.response.cards])
      setBlockRequest(false)
      if (res.response.cards.length === 0) {
        setExhausted(true)
      }
    }
  }, [res.response && res.response.cards])

  const scrollElement = useRef(null)

  const handleScroll = event => {
    const clientHeight = event.target.clientHeight
    const scrollTop = event.target.scrollTop
    const scrollHeight = event.target.scrollHeight

    if (blockRequest || exhausted) return

    if (clientHeight + scrollTop >= scrollHeight * 0.95) {
      setUrlParams({
        ...urlParams,
        currentPage: urlParams.currentPage + 1,
      })
      setBlockRequest(true)
    }

    if (scrollTop >= clientHeight * 0.5) {
      setScrollTopButtonVisible(true)
    } else {
      setScrollTopButtonVisible(false)
    }
  }

  const scrollTop = () => {
    try {
      // Try to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      scrollElement.current.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    } catch (error) {
      // Fallback for older browsers
      scrollElement.current.scrollTo(0, 0)
    }
    play()
  }

  return (
    <ScrollContainer onScroll={handleScroll} ref={scrollElement}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Container>
          <>
            <header>
              <PageHeading>Elder Scrolls Legends</PageHeading>

              <ColorModeButton onClick={handleColorMode}>
                {isDarkMode ? `Dark` : `Light`} Mode
              </ColorModeButton>
            </header>

            <main>
              <SearchBox
                label='Search cards by name'
                placeholder='E.g. Shaman'
                onChange={debounce(handleInputChange, DEBOUNCE_TIMEOUT)}
              />

              {(!res.response || res.isLoading) && !exhausted && (
                <FlexCenter>
                  <Spinner />
                </FlexCenter>
              )}

              {cards.length === 0 && !res.isLoading && (
                <FlexCenter>
                  <NoCardsFound />
                </FlexCenter>
              )}

              <Grid>
                {cards.map(({ id, name, text, imageUrl, set, type }) => (
                  <Card
                    key={id}
                    name={name}
                    text={text}
                    imageUrl={imageUrl}
                    set={set}
                    type={type}
                  />
                ))}
              </Grid>
            </main>

            {blockRequest && cards.length > 0 && (
              <FlexCenter>
                <Spinner />
              </FlexCenter>
            )}

            <Footer>
              <ScrollToTopButton
                scrollTop={scrollTop}
                visible={scrollTopButtonVisible}
              />
            </Footer>
          </>
        </Container>
      </ThemeProvider>
    </ScrollContainer>
  )
}
