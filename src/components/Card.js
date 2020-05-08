import React from 'react'
import styled from 'styled-components'
import Heading from './Heading'
import Text from './Text'
import Image from './Image'

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radii[1]};
  background-color: ${({ theme }) => theme.colors.gray};
`

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 ${({ theme }) => '-' + theme.space[2]}
    ${({ theme }) => theme.space[4]};
  padding-right: ${({ theme }) => theme.space[2]};
  padding-left: ${({ theme }) => theme.space[2]};
`

export default ({ name, text, imageUrl, set, type }) => (
  <StyledCard>
    <SpaceBetween>
      {set.name && (
        <Text center={true} sm={true}>
          {set.name}
        </Text>
      )}
      {type && (
        <Text center={true} sm={true}>
          {type}
        </Text>
      )}
    </SpaceBetween>
    {name && <Heading>{name}</Heading>}
    {imageUrl && <Image src={imageUrl} alt={name} />}
    {text && (
      <Text center={true} marginTop='auto'>
        {text}
      </Text>
    )}
  </StyledCard>
)
