const valor = document.querySelector("#valor");
const pixID = document.querySelector("#pixID");
const btnTransfer = document.querySelector(".btn-pix")
btnTransfer.style.opacity=0;
btnTransfer.disabled = true;

const validaCampos = 0;
let saldoDinheiroFormatado;
let chavepix;


let dadosLocalStorage = localStorage.getItem("contas");
let contas = JSON.parse(dadosLocalStorage);
let idConta = localStorage.getItem("idConta");







pixID.addEventListener('input', function (e) {
    chavepix = e.target.value.replace(/[^\d]/g, '');
    validaCPF(e.target.value);

},false);




valor.addEventListener('input', function (e) {
    formatarMoeda(e.target.value);

},false);




function validaCPF(cpf){   

    let num = cpf.replace(/[^\d]/g, ''); 
    let len = num.length; 
  
    if(len <= 6){
      cpf = num.replace(/(\d{3})(\d{1,3})/g, '$1.$2');  
    }else if(len <= 9){
      cpf = num.replace(/(\d{3})(\d{3})(\d{1,3})/g, '$1.$2.$3');
    }else if(len <=11){
      cpf = num.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/g, "$1.$2.$3-$4");
    }else if(len <=14){
      cpf = num.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    }


    if (len == 11){
      btnTransfer.style.opacity = 1;
      btnTransfer.disabled=false;
    }else if( len ==14){
      btnTransfer.style.opacity = 1;
      btnTransfer.disabled=false;
    }else{
      btnTransfer.style.opacity = 0;
      btnTransfer.disabled=true;
      
    }


    pixID.value= cpf;
  }


  function formatarMoeda(saldo) {
    let dinheiro = valor.value;
    
    dinheiro = dinheiro + '';
    dinheiro = parseInt(dinheiro.replace(/[\D]+/g,''));
    dinheiro = dinheiro + '';
    dinheiro = dinheiro.replace(/([0-9]{2})$/g, ",$1");
    valor.value = dinheiro;

  
    if (dinheiro.length > 6) {
        dinheiro = dinheiro.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        valor.value = dinheiro;

    }
    if (dinheiro.length >9){
        dinheiro = dinheiro.replace(/([0-9]{3})([0-9]{3})([0-9]{2}$)/g, ".$1.$2,$3");
        valor.value = dinheiro;

    }

    if (dinheiro.length >10){
        dinheiro = dinheiro.replace(/([0-9]{3})([0-9]{3})([0-9]{2}$)/g, ".$1.$2,$3");
        valor.value = dinheiro;
    }


    if(dinheiro =='NaN'){
        console.log("Aqui");
        console.log(valor.value);
        valor.value = "";
        console.log(valor.value);
    }

    saldoDinheiroFormatado= parseInt(dinheiro.replace(/[\D]+/g,'')) /100;
  }


  btnTransfer.onclick = function(){

    console.log(saldoDinheiroFormatado);
    console.log(chavepix);
    let len = contas[idConta].historico.length; 

      for(i=0;i<contas.length;i++){
        if(contas[i].pixID == chavepix){
          let len2 = contas[i].historico.length;

          let temp1 = parseFloat(contas[i].saldo);
          let temp2 = parseFloat(contas[idConta].saldo);

          
          contas[i].saldo = temp1 + saldoDinheiroFormatado;
          contas[idConta].saldo = temp2 - saldoDinheiroFormatado;


          contas[idConta].historico[len] = 
          {
            nome: "Pagamento",
            valor: saldoDinheiroFormatado,
            tipo: "Pagamento",
          }

          contas[i].historico[len2] = {
            nome: "Recebimento",
            valor: saldoDinheiroFormatado,
            tipo: "Recebimento"
          }






          localStorage.setItem("contas", JSON.stringify(contas));
        }

      }
  }
