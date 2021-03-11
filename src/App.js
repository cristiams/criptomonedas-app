import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import axios from 'axios';

import image from "./assets/img/cryptomonedas.png"

import Form from "./components/Form";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/spinner";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {

  const [cotizarToken, setCotizarToken] = useState('');

  const [cotizarCrypto, setCotizarCrypto] = useState('');

  const [result, setResult] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const cotizar = async () => {
    
      if(cotizarToken === '' || cotizarCrypto === '') return
      else{

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cotizarCrypto}&tsyms=${cotizarToken}`;
        const result = await axios.get(url);

        setLoading(true);

        setTimeout(() => {
          
          setLoading(false);
          console.log(result);
          // console.log(result.data.DISPLAY[cotizarCrypto][cotizarToken]);
          setResult(result.data.DISPLAY[cotizarCrypto][cotizarToken]);
        }, 3000);
      }
    }

    cotizar();
  }, [cotizarToken, cotizarCrypto])

  return (
    <Container>
      
      <div style={{ marginBottom: 50 }}>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        <Form 
        setCotizarToken={setCotizarToken}
        setCotizarCrypto={setCotizarCrypto} 
        />
                
      </div>
      <div style={{ marginBottom: 50, marginTop: 50}}>  
        {loading ? 
          (<Spinner />) 
        : 
          (
            <Cotizacion result={result}/>
          )
        }
        <Image src={image} alt="cryptos"/>
      </div>
    </Container>
  );
}

export default App;
