import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.space[2]};
  border: ${({ theme }) => theme.borderWidth[1]} solid
    ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radii[1]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  transition: border-color ${({ theme }) => theme.durations.default}
    ${({ theme }) => theme.timingFunctions.default};
  appearance: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Label = styled.label`
  margin-bottom: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes[3]};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${({ theme }) => theme.sizes.searchBox};
  margin: 0 auto ${({ theme }) => theme.space[5]};
`

export default ({ label, placeholder, onChange }) => {
  const handleChange = event => onChange(event.target.value.trim())

  return (
    <Container>
      <Label htmlFor='search'>{label}</Label>
      <Input
        type='text'
        name='search'
        id='search'
        placeholder={placeholder}
        onChange={handleChange}
      />
    </Container>
  )
}
