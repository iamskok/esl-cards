import styled from 'styled-components'
import Button from './Button'

export default styled(Button)`
  position: absolute;
  top: ${({ theme }) => theme.space[3]};
  right: ${({ theme }) => theme.space[3]};
`
