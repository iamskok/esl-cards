import styled from 'styled-components'

export default styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[4]};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(2, minmax(240px, 1fr));
    grid-auto-rows: minmax(150px, auto);
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }
`
