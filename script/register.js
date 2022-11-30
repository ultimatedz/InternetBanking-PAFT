const inputCEP = document.querySelector("#cepInput");
const inputCPF = document.querySelector("#cpfInput");
const endereco = document.querySelector("#endereco");
const bairroEndereco = document.querySelector("#bairroEndereco");
const cidade = document.querySelector("#cidade");
const estado = document.querySelector("#estado");
const telefoneInput = document.querySelector("#telefoneInput");
const btnRegister = document.querySelector(".btn-register");
const email = document.querySelector("#email");
const fnameInput = document.querySelector("#fnameInput");


let dadosLocalStorage = localStorage.getItem("contas");
let contas = JSON.parse(dadosLocalStorage);
let idConta = localStorage.getItem("idConta");



let validador=0;


const Pessoa = {
    nome: "",
    cep: "",
    estado: "",
    cidade:"",
    saldo:"",
    pixId:"",
    agencia:"",
    conta:"",
}




function PessoaObj(nome,cep,estado,cidade) {

    let pessoa = Object.create(Pessoa);
    pessoa.nome = nome;
    pessoa.cep = cep;
    pessoa.estado = estado;
    pessoa.cidade = cidade;
    pessoa.saldo = 0;
    pessoa.agencia = randNumber(1);
    pessoa.conta = randNumber(2);
    pessoa.pixID = randNumber(3);

    return pessoa;
    
}



function randNumber(id){
    if (id ==1){
        return Math.floor(Math.random() * 9999);
    }else if(id ==2){
        return Math.floor(Math.random() * 999999);
    }else{
        return Math.floor(Math.random() * 99999999999);
    }
}











inputCPF.addEventListener('input', function(e){
    formataCPF(e.target.value);


},false)



inputCEP.addEventListener('input', function(e){
    formataCEP(e.target.value);

},false )


telefoneInput.addEventListener('input', function(e){
    formataTelefone(e.target.value);
}, false)



email.addEventListener('input', function(e){
    validarEmail(e.target.value);
},false)

fnameInput.addEventListener('input', function(e){
    validaNome(e.target.value);
}, false)



function validaNome(nome){
    if (nome.length==4){
        validador++;
        console.log(validador);
        ativaBtn(validador);
    }
}







function formataCPF(cpf){   

    let num = cpf.replace(/[^\d]/g, ''); 
    let len = num.length; 
  
    if(len <= 6){
      cpf = num.replace(/(\d{3})(\d{1,3})/g, '$1.$2');  
    }else if(len <= 9){
      cpf = num.replace(/(\d{3})(\d{3})(\d{1,3})/g, '$1.$2.$3');
    }else if(len <=11){
      cpf = num.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/g, "$1.$2.$3-$4");
    }

    inputCPF.value = cpf;


    if(len ==11){
        let valida=validarCPF(num);

        if(valida == true){
            validador++;
            console.log(validador);
            ativaBtn(validador);

            
        }

    }else{

    }

}

function formataCEP(cep){
    let num = cep.replace(/[^\d]/g, '');
    let len = num.length;

        
    cep = num.replace(/(\d{5})(\d{1,3})/g, '$1-$2');  
    inputCEP.value=cep;
    
    if(len==8){
        getAPI(num);
        console.log(validador);
        validador++;
        ativaBtn(validador);
    }else{
        endereco.value = "";
        bairroEndereco.value = "";
        cidade.value= "";
        estado.value="";

    }


}


function formataTelefone(telefone){
    let num = telefone.replace(/[^\d]/g, '');
    let len = num.length;


        telefone = num.replace(/(\d{2})(\d{5})(\d{4})/g, '($1)$2-$3'); 

        if(len ==11){
            validador++;
            ativaBtn(validador);
            console.log(validador);
        }
    
    telefoneInput.value=telefone;

}







async function getAPI(cep){
    let response = await fetch('https://viacep.com.br/ws/'+cep+'/json/');
    let data = await response.json();

    validateCEP(data);

    endereco.value = data.logradouro;
    endereco.readOnly = true;

    bairroEndereco.value = data.bairro;
    bairroEndereco.readOnly=true;

    cidade.value = data.localidade;
    cidade.readOnly=true;

    estado.value = data.uf;
    estado.readOnly=true;
}


function validateCEP(data){
    try{
        if(data.erro == true){
            throw new Error('CEP INVALIDO');
        }else{
            console.log("Teste CEP passou");
        }
    }catch (err){
        throw new Error(err);
    }
}













function validarEmail(emailValue){
    let reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(reg.test(emailValue)){
        console.log("True");
        email.style.backgroundColor  = "white";
        validador++;
        console.log(validador);
        ativaBtn(validador);
        
        return true;
    }else{
        email.style.backgroundColor  = "orange";
        console.log("False");
        return false;
    }


}







function validarCPF(cpf) {	
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// verifica o 1 digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	// verifica o 2 digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}



function ativaBtn(validador){


    if (validador >=7){
        btnRegister.style.opacity = 1;
        btnRegister.disabled = false;

        let pessoa = PessoaObj(fnameInput.value, inputCEP.value, estado.value, cidade.value);


        let len = contas.length;

        let contaNova =
            {
                nome: "",
                saldo:"",
                pixID:"",
                agencia:"",
                conta:"",
            }
        

        contaNova.nome = pessoa.nome;
        contaNova.saldo = 0;
        contaNova.pixID = pessoa.pixID;
        contaNova.agencia= pessoa.agencia;
        contaNova.conta =  pessoa.conta;


        
        contas.push(contaNova);

        localStorage.setItem("contas", JSON.stringify(contas));
        localStorage.setItem("idConta", len);


        console.log(pessoa.nome);
        console.log(contas);
        console.log(len);


    }

}





    

