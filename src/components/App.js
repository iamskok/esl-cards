import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../theme'
import GlobalStyles from '../styles/global'
import ScrollContainer from './ScrollContainer'
import Container from './Container'
import PageHeading from './PageHeading'
import ColorModeButton from './ColorModeButton'
import SearchBox from './SearchBox'
import FlexCenter from './FlexCenter'
import Spinner from './Spinner'
import Grid from './Grid'
import Card from './Card'
import Footer from './Footer'
import ScrollToTopButton from './ScrollToTopButton'
import useFetch from '../hooks/useFetch'
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

  const stored = localStorage.getItem(`isDarkMode`)
  const [isDarkMode, setIsDarkMode] = useState(
    stored === `true` ? true : false
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

  const res = useFetch(
    `${ENDPOINT}?${INITIAL_PAGE_SIZE}&page=${urlParams.currentPage}&name=${urlParams.name}`,
    {}
  )

  useEffect(() => {
    if (res.response !== null && res.error === null) {
      setCards([...cards, ...res.response.cards])
      setBlockRequest(false)
      if (res.response.cards.length === 0) {
        setExhausted(true)
      }
    }
  }, [res.response && res.response.cards])

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
  }

  const handleColorMode = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem(`isDarkMode`, !isDarkMode)
  }

  return (
    <ScrollContainer onScroll={handleScroll}>
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
              <ScrollToTopButton />
            </Footer>
          </>
        </Container>
      </ThemeProvider>
    </ScrollContainer>
  )
}
