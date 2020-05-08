import styled from 'styled-components'

export default styled.div`
  max-width: ${({ theme }) => theme.sizes.container};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[3]};
`
