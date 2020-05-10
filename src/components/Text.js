import styled from 'styled-components'

/*
  Component API:

  1. `marginTop` - set custom `margin-top` value.
  2. `sm` - set smaller font size.
  3. `center` - set `text-align: center`
*/

export default styled.p`
  margin-top: ${({ marginTop, theme }) =>
    marginTop ? marginTop : theme.space[0]};
  margin-bottom: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.body};
  font-size: ${({ theme, sm }) =>
    sm ? theme.fontSizes[1] : theme.fontSizes[2]};
  line-height: ${({ theme }) => theme.lineHeights.body};
  transition: color ${({ theme }) => theme.durations.default}
    ${({ theme }) => theme.timingFunctions.default};
  ${({ center }) => center && 'text-align: center'}
`
