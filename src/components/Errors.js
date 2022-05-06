import React from 'react';
import styled from 'styled-components';

export default function Errors(props) {
  return (
    <Alert>ATTENZIONE: {props.text}</Alert>
  )
}

const Alert = styled.p`
    color: #ddb100;
`