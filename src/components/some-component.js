import React from 'react'
import styled from 'styled-components'

const StyledSomeComponent = styled.div`
  padding: 1rem;
  margin: 1rem;
  background: green;
  color: white;
  font-weight: 600;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
`

const SomeComponent = () => (
  <StyledSomeComponent>I'm exposed as SomeComponent. I use font 'Impact'.</StyledSomeComponent>
)
export default SomeComponent
