import { createGlobalStyle } from 'styled-components'
import modernNormalize from './modern-normalize'
import interWoff2 from '../fonts/inter-subset.woff2'

export default createGlobalStyle`
  /* stylelint-disable */
  ${modernNormalize}
  /* stylelint-enable */

  @font-face {
    font-family: 'Inter var';
    font-weight: 100 900;
    font-display: swap;
    font-style: oblique 0deg 10deg;
    src: url(${interWoff2}) format('woff2-variations'),
      url(${interWoff2}) format('woff2');
  }

  ::selection {
    background: ${({ theme }) => theme.colors.primary};
  }

  :focus {
    outline-offset: ${({ theme }) => theme.space[1]};
    outline-width: ${({ theme }) => theme.borderWidth[1]};
    outline-style: dashed;
    outline-color: ${({ theme }) => theme.colors.primary};
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    transition: color ${({ theme }) => theme.durations.default}
    ${({ theme }) => theme.timingFunctions.default},
    background-color ${({ theme }) => theme.durations.default} ${({
  theme,
}) => theme.timingFunctions.default};
  }
`
