import React, { useState, useEffect } from 'react'
import GlobalStyles from '../styles/global'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../theme'
import ScrollContainer from './ScrollContainer'
import Container from './Container'
import PageHeading from './PageHeading'
import Card from './Card'
import Spinner from './Spinner'
import ColorModeButton from './ColorModeButton'
import ScrollToTopButton from './ScrollToTopButton'
import Grid from './Grid'
import Footer from './Footer'
import FlexCenter from './FlexCenter'
import FixedCenter from './FixedCenter'
import SearchBox from './SearchBox'
import useFetch from '../hooks/useFetch'
import { ENDPOINT, INITIAL_PAGE_SIZE } from '../constants'

export default () => {
  const [blockRequest, setBlockRequest] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [cards, setCards] = useState([])
  const stored = localStorage.getItem(`isDarkMode`)
  const [isDarkMode, setIsDarkMode] = useState(
    stored === `true` ? true : false
  )

  const res = useFetch(
    `${ENDPOINT}?${INITIAL_PAGE_SIZE}&page=${currentPage}`,
    {}
  )

  useEffect(() => {
    if (res.response !== null && res.error === null) {
      setCards([...cards, ...res.response.cards])
      setBlockRequest(false)
    }
  }, [res.response && res.response.cards])

  const handleScroll = event => {
    const clientHeight = event.target.clientHeight
    const scrollTop = event.target.scrollTop
    const scrollHeight = event.target.scrollHeight

    if (blockRequest) return

    if (clientHeight + scrollTop >= scrollHeight * 0.95) {
      setCurrentPage(currentPage + 1)
      setBlockRequest(true)
    }
  }

  return (
    <ScrollContainer onScroll={handleScroll}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Container>
          {!res.response ? (
            <FixedCenter>
              <Spinner />
            </FixedCenter>
          ) : (
            <>
              <header>
                <PageHeading>Elder Scrolls Legends</PageHeading>
                <ColorModeButton
                  onClick={() => {
                    setIsDarkMode(!isDarkMode)
                    localStorage.setItem(`isDarkMode`, !isDarkMode)
                  }}
                >
                  {isDarkMode ? `Dark` : `Light`} Mode
                </ColorModeButton>
              </header>
              <main>
                <SearchBox
                  label='Search cards by name'
                  placeholder='E.g. Shaman'
                />
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
              {blockRequest && (
                <FlexCenter>
                  <Spinner />
                </FlexCenter>
              )}
              <Footer>
                <ScrollToTopButton />
              </Footer>
            </>
          )}
        </Container>
      </ThemeProvider>
    </ScrollContainer>
  )
}
