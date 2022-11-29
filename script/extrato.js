const valorExtrato = document.querySelector("#valorExtrato");
const tipoExtrato = document.querySelector("#tipoExtrato");
const nameExtrato = document.querySelector("#nameExtrato");
const divMovimentacoes = document.querySelector(".containerMovimentacoes");
const saldo = document.querySelector("#saldo");

let dadosLocalStorage = localStorage.getItem("contas");
let contas = JSON.parse(dadosLocalStorage);
let idConta = localStorage.getItem("idConta");



saldo.innerHTML = contas[idConta].saldo;




    function getExtrato(){
        for(i=0;i<contas[idConta].historico.length;i++){
            criarExtrato(i);
        }
    }




    function criarExtrato(id){
        let divTipo = document.createElement('div');
        divTipo.className = "divTipo";
        let spanTipo = document.createElement('span');
        spanTipo.id="tipoExtrato";
        spanTipo.innerHTML = contas[idConta].historico[id].tipo;
        divTipo.appendChild(spanTipo);
        divMovimentacoes.appendChild(divTipo);


        let divName = document.createElement('div');
        divName.className = "divName";
        let spanName = document.createElement('span');
        spanName.id = "nameExtrato";
        spanName.innerHTML=contas[idConta].historico[id].nome;
        divName.appendChild(spanName);
        divMovimentacoes.appendChild(divName);

        let divValor = document.createElement('div');
        divValor.className ="divValor";
        let valorExtrato = document.createElement('span');
        valorExtrato.id = "valorExtrato";
        valorExtrato.innerHTML=contas[idConta].historico[id].valor;
        divValor.appendChild(valorExtrato);
        divMovimentacoes.appendChild(divValor);

    }






document.onload = getExtrato();