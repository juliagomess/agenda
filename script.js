var contatos = [];
var cont = 1;

function criaDiv(id,nome,numero) {
    var divContato = document.createElement("button");
    var paragrafroNome = document.createElement("span");
    var paragrafroNumero = document.createElement("span");
    var paragrafroID = document.createElement("span");
    var idContato = document.createTextNode("ID: " + id);
    var nomeContato = document.createTextNode("Nome: " + nome);
    var numeroContato = document.createTextNode("Numero: " + numero);

    paragrafroID.append(idContato);
    paragrafroNome.append(nomeContato);
    paragrafroNumero.append(numeroContato);

    divContato.append(paragrafroID);
    divContato.append(paragrafroNome);
    divContato.append(paragrafroNumero);
    divContato.setAttribute("class","contatos");
    divContato.setAttribute("onclick","detalhaContato("+ id.toString() +")");

    var lista = document.getElementById("lista");
    lista.append(divContato);
}

function adicionaContato() {
    var campoNome = document.querySelector("#nome");
    var campoNumero = document.querySelector("#numero");

    var novoNome = document.querySelector("#nome").value;
    var novoNumero = document.querySelector("#numero").value;
    if(novoNome != '' && novoNumero != '') {
      var novo = {
          id: cont,
          nome: novoNome,
          numero: novoNumero
      };
      contatos.push(novo);
      console.log(contatos);

      criaDiv(novo.id,novo.nome,novo.numero);

      campoNome.value = '';
      campoNumero.value = '';
      cont++;
  }
}

function listarContatos() {
    for(var i=0; i<contatos.length; i++) {
        criaDiv(contatos[i].id, contatos[i].nome, contatos[i].numero);
    }
}

function procuraContato(index) {
    for(var i=0; i<contatos.length; i++) {
        if(contatos[i].id == index)
            return i;
    }

    return -1;
}

function detalhaContato(index) {
    var divDetalhe = document.getElementById("detalhes");
    divDetalhe.style.border = "5px solid #FBCA1F";

    var campoiD = document.querySelector("#idContato");
    var campoNome = document.querySelector("#nomeEdita");
    var campoNumero = document.querySelector("#numeroEdita");

    var i = procuraContato(index);
    campoiD.value = contatos[i].id;
    campoNome.value = contatos[i].nome;
    campoNumero.value = contatos[i].numero;
}

function editaContato() {
    var campoiD = document.querySelector("#idContato").value;
    var campoNome = document.querySelector("#nomeEdita").value;
    var campoNumero = document.querySelector("#numeroEdita").value;

    var i = procuraContato(campoiD);
    contatos[i].nome = campoNome;
    contatos[i].numero = campoNumero;

    var divDetalhe = document.getElementById("detalhes");
    divDetalhe.style.border = "none";

    campoiD.value = '';
    campoNome.value = '';
    campoNumero.value = '';

    var lista = document.getElementById("lista");
    lista.innerHTML = '';
    listarContatos();
}

function removeContato() {
    var campoiD = document.querySelector("#idContato").value;
    var campoNome = document.querySelector("#nomeEdita").value;
    var campoNumero = document.querySelector("#numeroEdita").value;
    var i = procuraContato(campoiD);
    contatos.splice(1,i);

    console.log(contatos);

    var divDetalhe = document.getElementById("detalhes");
    divDetalhe.style.border = "none";

    campoiD.value = '';
    campoNome.value = '';
    campoNumero.value = '';

    var lista = document.getElementById("lista");
    lista.innerHTML = '';
    listarContatos();
}

function buscarContato() {
    var campoBusca = document.getElementById("busca");
    var lista = document.getElementById("lista");
    var flag=0;

    if (campoBusca.value != '') {
        lista.innerHTML = '';

        for(var i=0; i<contatos.length; i++) {
            if(contatos[i].nome == campoBusca.value) {
                criaDiv(contatos[i].id,contatos[i].nome,contatos[i].numero);
                flag=1;
            }
        }

        if(flag==0) {
            alert("Contato não encontrado");
            listarContatos();
        }
    } else {
        listarContatos();
    }
}