const agencia = document.querySelector("#ccAgencia");
const inputAgencia = document.querySelector("#agencia");
const conta = document.querySelector("#ccConta");
const inputConta = document.querySelector("#conta")
const inputToken = document.querySelector("#token");
const linkAccount =document.querySelector("#linkAccount");
let btnNextLogin = document.querySelector("#btn-next");
const nomeCC = document.querySelector("#nomeCC");


let counterAgencia = 0;
let counterConta = 0;
let counterToken = 0;
let counterTotal = [0,0,0]





let contas = [
    {
        nome: "Caio Henrique",
        saldo: "3602,80",
        pixID: "10570957230",
        agencia: "4060",
        conta: "102030",
        historico: [
            {
                nome: "Mari",
                valor: "572,49",
                tipo: "Transferencia",
            },
            {
                nome: "Sebastião",
                valor: "16,00",
                tipo: "Recebimento",
            },
            {
                nome: "Investimento",
                valor: "3000,00",
                tipo: "Investimento",
            },
            {
                nome: "Compra",
                valor: "842,55",
                tipo: "Pagamento",
            },
            {
                nome: "Daylane",
                valor: "2709,00",
                tipo: "Transferencia"
            }
        ]
    },
    
    {
        nome: "Kelly Jarnick",
        saldo: "17985,50",
        pixID: "75421354650",
        agencia:"4090",
        conta:"302010",
        historico: [
            {
                nome: "Caio",
                valor: "10,00",
                tipo: "Transferencia",
            },
            {
                nome: "Investimento",
                valor: "20000,00",
                tipo: "Investimento",
            }
        ]
    },
    {
        nome: "Mari Marques",
        saldo: "1572,20",
        pixID:"15725756915245",
        agencia:"4070",
        conta:"604020",
        historico: [
            {
                nome: "Pagamento",
                valor: "230,00",
                tipo: "Pagamento"
            },
            {
                nome: "Boleto Pago",
                valor: "170,99",
                tipo: "Pagamento",
            }
        ]
    }
]






inputAgencia.addEventListener('input', function (e) {
    linkAccount.setAttribute("href", "");

    btnNextLogin.style.cursor = "default";
    btnNextLogin.style.opacity = "0";

    agencia.innerHTML=e.target.value;
    counterTotal[0] = 0;
    counterAgencia = e.target.value.length;
    inputAgencia.className = "invalid";
    console.log(counterAgencia);
    if(counterAgencia ==4){
        inputAgencia.className=""
        counterTotal[0] = 1;
        console.log(`Counter Agencia Final: ${counterTotal}`);




        
        if (counterTotal[0] == 1 && counterTotal[1] ==1 && counterTotal[2] ==1){
            linkAccount.setAttribute("href", "account.html");
            btnNextLogin.style.opacity = "1";
            btnNextLogin.style.cursor = "pointer";
        }
    }

  }, false);


  inputConta.addEventListener('input', function(e){
    linkAccount.setAttribute("href", "");


    btnNextLogin.style.cursor = "default";
    btnNextLogin.style.opacity = "0";
    conta.innerHTML=e.target.value;
    counterTotal[1] = 0;
    counterConta= e.target.value.length;
    inputConta.className="invalid";
    console.log(`Counter Conta Inicial: ${counterTotal}`);
    if(counterConta == 6){
        inputConta.className="";
        counterTotal[1] = 1;
        console.log(`Counter Conta Final: ${counterTotal}`);


        for(i=0;i<contas.length;i++){
            if(contas[i].conta == e.target.value){
                nomeCC.innerHTML = contas[i].nome;
                localStorage.setItem("idConta", i);
            }
        }

        
        if (counterTotal[0] == 1 && counterTotal[1] ==1 && counterTotal[2] ==1){
            linkAccount.setAttribute("href", "account.html");
            btnNextLogin.style.opacity = "1";
            btnNextLogin.style.cursor = "pointer";
        }

    }
  }, false)

  inputToken.addEventListener('input', function(e){
    linkAccount.setAttribute("href", "");

    btnNextLogin.style.cursor = "default";
    btnNextLogin.style.opacity = "0";
    counterToken=e.target.value.length;
    console.log(`Counter Token inicial: ${counterTotal}`);
    counterTotal[2] = 0;
    inputToken.className="invalid";
    if(counterToken ==8){
        inputToken.classList="";
        counterTotal[2] = 1;
        console.log(`Counter Token Final: ${counterTotal}`);


        if (counterTotal[0] == 1 && counterTotal[1] ==1 && counterTotal[2] ==1){
            linkAccount.setAttribute("href", "account.html");
            btnNextLogin.style.opacity = "1";
            btnNextLogin.style.cursor = "pointer";

        }

    }
  },false);








document.onload = localStorage.setItem("contas", JSON.stringify(contas));   //Salva as contas
