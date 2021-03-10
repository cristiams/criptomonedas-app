import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display:block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`

// Un hook en realidad es una funcion

const useToken = (label, stateInitial, tokens) => {
  
  const [state, setState] = useState(stateInitial);
  
  const Selector = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select
        onChange={ e => setState(e.target.value)}
        value={state}
      >
      <option value="">- Seleccione Moneda-</option>
        {tokens.map(token => (
          <option key={token.cod} value={token.cod}>{token.name}</option>
        ))}
      </Select>
    </Fragment>
  );

  // retornar state, fn (actualiza state), interfaz

  return [state, setState,Selector];
}

export default useToken;
