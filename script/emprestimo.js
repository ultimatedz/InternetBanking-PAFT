const btnAutorizar = document.querySelector(".btn-autorizar");
const inputValor = document.querySelector("#valor");




let dadosLocalStorage = localStorage.getItem("contas");
let contas = JSON.parse(dadosLocalStorage);

let idConta = localStorage.getItem("idConta");




btnAutorizar.onclick = function(){

    let temp1 = contas[idConta].saldo;
    let temp2 = inputValor.value;
    console.log(temp1);
    temp1 = parseFloat(temp1);
    temp2 = parseFloat(temp2);
    contas[idConta].saldo = temp1+temp2;

    let len = contas[idConta].historico.length;


    contas[idConta].historico[len] = 
    {
        nome: "Emprestimo",
        valor: temp2,
        tipo: "Emprestimo",

    }


    

    localStorage.setItem("contas", JSON.stringify(contas));

}