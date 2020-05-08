import styled from 'styled-components'

export default styled.h1`
  margin-top: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.heading};
  font-size: ${({ theme }) => theme.fontSizes[6]};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  text-align: center;
`
