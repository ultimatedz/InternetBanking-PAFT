const eyeIcon = document.querySelector("#eyeIcon");
const saldo = document.querySelector("#valueSaldo")
const privacy = document.querySelector(".privacy");
const privacyFatura = document.querySelector("#faturaCC");
const nome = document.querySelector("#nome");


let dadosLocalStorage = localStorage.getItem("contas");
let contas = JSON.parse(dadosLocalStorage);

let idConta = localStorage.getItem("idConta");

saldo.innerHTML = contas[idConta].saldo;
nome.innerHTML = contas[idConta].nome;




eyeIcon.onclick = function(){
    if (eyeIcon.className== "fa-sharp fa-solid fa-eye"){
        eyeIcon.className= 'fa-solid fa-eye-slash';
        saldo.style.filter = "blur(7px)";
        privacy.style.filter = "blur(7px)";
        privacyFatura.style.filter = "blur(7px)";

    }else{
        eyeIcon.className="fa-sharp fa-solid fa-eye";
        saldo.style.filter = "blur(0px)";
        privacy.style.filter = "blur(0px)";
        privacyFatura.style.filter = "blur(0px)"


    }
}



document.onload = console.log(contas[idConta].saldo);