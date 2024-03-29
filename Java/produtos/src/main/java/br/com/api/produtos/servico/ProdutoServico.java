package br.com.api.produtos.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.produtos.modelo.ProdutoModelo;
import br.com.api.produtos.modelo.RespostaModelo;
import br.com.api.produtos.repositorio.ProdutoRepositorio;

@Service
public class ProdutoServico {
    

    @Autowired
    private ProdutoRepositorio pr;

    @Autowired
    private RespostaModelo rm;


    //Método para listar os produtos
    public Iterable<ProdutoModelo> listar(){
        return pr.findAll();
    }

    //Metodo para cadastrar ou alterar produtos
    public ResponseEntity<?> cadastrarAlterar(ProdutoModelo pm, String acao){

        //verificando se o  nome e marca foram preenchidos
        if(pm.getNome().equals("")){
            rm.setMensagem("O nome do produto é o brigatorio!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST );
        }else if(pm.getMarca().equals("")){
            rm.setMensagem("O nome da marca é obrigatório");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }else{
            if(acao.equals("cadastrar")){
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.CREATED);
            }else{
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.OK);
            }
        }

    }

    //Metodo para remover produtos
    public ResponseEntity<RespostaModelo> remover(long codigo){

        pr.deleteById(codigo);

        rm.setMensagem("O produto foi removido com sucesso!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }   

}
