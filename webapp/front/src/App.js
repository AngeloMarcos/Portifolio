import React, { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  //UseState
  const [btnCadastrar,setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);

  //UseEffect
  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(returno => returno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  },[]);

  return (
    <div>
      <p>{JSON.stringify(produtos)}</p>
      <Formulario botao={btnCadastrar}/>
      <Tabela/>
    </div>
  );
}

export default App;
