import styled from 'styled-components'

export default styled.p`
  margin-top: ${({ marginTop, theme }) =>
    marginTop ? marginTop : theme.space[0]};
  margin-bottom: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.body};
  font-size: ${({ theme, sm }) =>
    sm ? theme.fontSizes[1] : theme.fontSizes[2]};
  line-height: ${({ theme }) => theme.lineHeights.body};
  ${({ center }) => center && 'text-align: center'}
`
