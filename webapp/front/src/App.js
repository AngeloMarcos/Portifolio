import React, { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  //objeto produto
  const produto = {
    codigo : 0,
    nome: '',
    marca: ''
  }

  //UseState
  const [btnCadastrar,setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);


  //UseEffect
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(returno => returno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  //Obtendo dados do formulario
  const aoDigitar = (e) =>{
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  //Cadastrar produto

  const cadastrar = ()=>{
    fetch('http://localhost:8080/cadastrar', {
      method:'post', 
      body: JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        setProdutos([...produtos, retorno_convertido]);
        alert('Produto cadastrado com sucesso!');
        limparFormulario();
      }
    })
  }


   //Alterar produto

   const alterar = ()=>{
    fetch('http://localhost:8080/alterar', {
      method:'put', 
      body: JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
       
        //Mensagem
        alert('Produto alterado com sucesso!');

         //Cópia do vetor de produtos

      let vetorTemp = [...produtos];

      //indice
      
      let indice = vetorTemp.findIndex((p) =>{
        return p.codigo === objProduto.codigo;
      });

      //Alterar produto do vetorTemp
      vetorTemp [indice] = objProduto;

      //Atualiza o vetor de produtos
      setProdutos(vetorTemp);

        //limpa formulario
        limparFormulario();
      }
    })
  }


   //Deletar produto

   const remover = ()=>{
    fetch('http://localhost:8080/remover/'+objProduto.codigo, {
      method:'delete', 
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      //Mensagem
      alert(retorno_convertido.mensagem);

      //Cópia do vetor de produtos

      let vetorTemp = [...produtos];

      //indice
      
      let indice = vetorTemp.findIndex((p) =>{
        return p.codigo === objProduto.codigo;
      });

      //Remove produto do vetorTemp
      vetorTemp.splice(indice, 1);

      //Atualiza o vetor de produtos
      setProdutos(vetorTemp);

      //Limpar formulario
      limparFormulario();

    })
  }

  //Limpar Formulário
  const limparFormulario = () =>{
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  //selecionar produto
  const selecionarProduto = (indice) =>{
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  //retorno
  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado ={aoDigitar} cadastrar = {cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
