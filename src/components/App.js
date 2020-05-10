import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ThemeProvider } from 'styled-components'
import useSound from 'use-sound'
import clickSound from '../assets/sounds/bite.mp3'
import useFetch from '../hooks/useFetch'
import {
  ENDPOINT,
  PAGE_SIZE,
  DEBOUNCE_TIMEOUT,
  THROTTLE_TIMEOUT,
} from '../constants'
import ScrollContainer from './ScrollContainer'
import throttle from '../utils/throttle'
import { lightTheme, darkTheme } from '../theme'
import GlobalStyles from '../styles/global'
import Container from './Container'
import FlexColumn from './FlexColumn'
import PageHeading from './PageHeading'
import ColorModeButton from './ColorModeButton'
import SearchBox from './SearchBox'
import debounce from '../utils/debounce'
import FlexCenter from './FlexCenter'
import Spinner from './Spinner'
import NoCardsFound from './NoCardsFound'
import Grid from './Grid'
import Card from './Card'
import Footer from './Footer'
import ScrollToTopButton from './ScrollToTopButton'

export default () => {
  const [urlParams, setUrlParams] = useState({
    name: ``,
    currentPage: 1,
  })

  // Block request if the last request is not finished.
  const [blockRequest, setBlockRequest] = useState(true)
  // Block request if there are no more cards available.
  const [exhausted, setExhausted] = useState(false)
  const [cards, setCards] = useState([])
  // Don't show scroll to top button unless viewport has been scrolled
  // passed a certain amount of `px`.
  const [scrollTopButtonVisible, setScrollTopButtonVisible] = useState(
    false
  )

  // Check if the color mode has previously been selected.
  const stored = localStorage.getItem(`isDarkMode`)
  const [isDarkMode, setIsDarkMode] = useState(
    stored === `true` ? true : false
  )

  const [play] = useSound(clickSound)

  const handleColorMode = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem(`isDarkMode`, !isDarkMode)
    play()
  }

  const res = useFetch(
    `${ENDPOINT}?${PAGE_SIZE}&page=${urlParams.currentPage}&name=${urlParams.name}`,
    {}
  )

  // Handle cards search query changes.
  const handleInputChange = useCallback(
    // Suspend function calls until there’s certain amount of inactivity,
    // then invoke function with the latest arguments.
    debounce(text => {
      // Check if search query is different from the previous one.
      // Ignore search query if it hasn't been changed.
      if (text !== urlParams.name) {
        setCards([])
        setUrlParams({
          name: text,
          currentPage: 1,
        })
        setExhausted(false)
      }
    }, DEBOUNCE_TIMEOUT),
    [urlParams]
  )

  useEffect(() => {
    // Listen to the new incoming data from fetch object.
    if (res.response !== null && res.error === null) {
      // Add new cards to the state.
      setCards([...cards, ...res.response.cards])
      setBlockRequest(false)
      // If there are no cards in the last request block future requests.
      if (res.response.cards.length === 0) {
        setExhausted(true)
      }
    }
  }, [res.response && res.response.cards])

  const scrollElement = useRef(null)

  const handleScroll = useCallback(
    // Limit function calls to a certain time frame.
    throttle(() => {
      const {
        clientHeight,
        scrollTop,
        scrollHeight,
      } = scrollElement.current

      if (blockRequest || exhausted) return

      // When the viewport has been scrolled for at least 95% of the scroll
      // height make a new request.
      if (clientHeight + scrollTop >= scrollHeight * 0.95) {
        setUrlParams({
          ...urlParams,
          currentPage: urlParams.currentPage + 1,
        })
        setBlockRequest(true)
      }

      // When the viewport has been scrolled for at least 50% show
      // `ScrollToTopButton` component. Otherwise hide it.
      if (scrollTop >= clientHeight * 0.5) {
        setScrollTopButtonVisible(true)
      } else {
        setScrollTopButtonVisible(false)
      }
    }, THROTTLE_TIMEOUT),
    [urlParams, blockRequest, exhausted]
  )

  const scrollTop = () => {
    try {
      // Try to use new API
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      scrollElement.current.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    } catch (error) {
      // Fallback for browsers that don't support smooth scrolling.
      scrollElement.current.scrollTo(0, 0)
    }
    play()
  }

  return (
    <ScrollContainer ref={scrollElement} onScroll={handleScroll}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Container>
          <FlexColumn as='header'>
            <PageHeading>Elder Scrolls Legends</PageHeading>

            <ColorModeButton onClick={handleColorMode}>
              {isDarkMode ? `Dark` : `Light`} Mode
            </ColorModeButton>
          </FlexColumn>

          <main>
            <SearchBox
              label='Search cards by name'
              placeholder='E.g. Shaman'
              onChange={handleInputChange}
            />

            {/* Show spinner when:

              1. There is no response **or** there is an ongoing request.
              2. There are more cards available. */}
            {(!res.response || res.isLoading) && !exhausted && (
              <FlexCenter>
                <Spinner />
              </FlexCenter>
            )}

            {/* Show "No cards found" message if no more cards
              available **and** there is no ongoing request. */}
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

          {/* Show spinner when the last request is not finished
           **and** there are more cards available. */}
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
        </Container>
      </ThemeProvider>
    </ScrollContainer>
  )
}
