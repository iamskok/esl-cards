import { createGlobalStyle } from 'styled-components'
import modernNormalize from './modern-normalize'
import interWoff2 from '../assets/fonts/inter-subset.woff2'

export default createGlobalStyle`
  /* stylelint-disable */
  ${modernNormalize}
  /* stylelint-enable */

  /* Inter variable font documentation
    https://rsms.me/inter */
  @font-face {
    font-family: 'Inter var';
    /* Set range of available font weight values. */
    font-weight: 100 900;
    /*
      If the font face is not loaded, any element
      attempting to use it must render a fallback
      font face. */
    font-display: swap;
    /* Set available degree range for italic styles.
      In-depth explanation of italic styles in variable fonts -
      https://rwt.io/typography-tips/getting-bent-current-state-italics-variable-font-support */
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
