import React, { useState,useEffect } from 'react';
import styled from "@emotion/styled";
import axios from 'axios';

import Error from './Error';

import useToken from "../hooks/useToken";
import useCrypto from "../hooks/useCrypto";

const Button = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #FFF;
  transition: background-color .3s ease;
  &:hover {
    background-color: #326AC0;
    cursor:pointer;
  }
`
const Form = () => {

  const [cryptos, setCryptos] = useState([]);

  const [ error, setError] = useState(false);

  const tokens = [

    {cod: 'USD', name: 'Dolar USA'},
    {cod: 'MXN', name: 'Peso Mexicano'},
    {cod: 'EUR', name: 'Euro'},
    {cod: 'GDP', name: 'Libra Esterlina'}
  ];

  const [token, setToken,SelectToken] = useToken('Elige tu moneda', '',tokens);

  const [crypto, setCrypto,SelectCrypto] = useCrypto('Elige tu criptomoneda', '', cryptos);

  useEffect(() => {
    
    const requestAPI = async () => {

      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

      try {
        const response = await axios.get(url);
        console.log(response);
        setCryptos(response.data.Data);
      } catch (error) {
        // setError(true);
        console.error(error);
      }
    }
    requestAPI();
  }, [])

  const checkToken = e => {

    e.preventDefault();

    // validar si ambos campos estan llenos
    if(token === '' || crypto === '') {
      setError(true);
      return;
    }

    // pasar los datos al componente principal
    setError(false);
    // setToken(token);
    // setCrypto(crypto);
  }

  return (

    <form onSubmit={checkToken}>

      {error ? <Error message="Todos los campos son obligatorios" /> : null}
      <SelectToken />
      <SelectCrypto />
      <Button type="submit" value="Calcular"/>
    </form>
  )
}

export default Form;
