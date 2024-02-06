function adicionarCorAoFocarInput() {
    const ListInput = document.querySelectorAll('input')
    console.log(ListInput.length);
    console.log(ListInput);

    ListInput.forEach((object) => {
        object.addEventListener('focus', () => {
            object.style.backgroundColor = '#98FB98'
        });

        object.addEventListener('blur', () => {
            object.style.backgroundColor = 'white'
        });
    })
}

atualizarCorStatusEstoque();

function LoadCate() {
    const selectCate = document.getElementById('categoriaMotivo');
    selectCate.innerHTML = "";

    const optFirst = document.createElement('option');
    optFirst.value = 0;
    optFirst.text = "Selecione uma Cetegoria";

    selectCate.add(optFirst);

    categorias.forEach((Categoria) => {
        const opt = document.createElement('option');
        opt.value = Categoria.idCategoria;
        opt.text = Categoria.Descricao;

        selectCate.add(opt);
    });
}


function LoadMotivos() {
    const selectCate = document.getElementById('Motivo');
    selectCate.innerHTML = "";

    const optFirst = document.createElement('option');
    optFirst.value = 0;
    optFirst.text = "Selecione um Motivo";

    selectCate.add(optFirst);

    const categoriaValue = document.getElementById('categoriaMotivo').value;

    if (categoriaValue !== '0') {
        const motivoFiltrado = motivos.filter((e) => e.idCategoria == categoriaValue);

        if (motivoFiltrado.length > 0) {
            motivoFiltrado.forEach((motivo) => {
                const opt = document.createElement('option');
                opt.value = motivo.idMotivo;
                opt.text = motivo.Descricao;

                selectCate.add(opt);
            });

            selectCate.disabled = false;
            selectCate.style.backgroundColor = '';
        } else {
            selectCate.disabled = true;
            selectCate.style.backgroundColor = 'lightgray';
        }
    } else {
        selectCate.disabled = true;
        selectCate.style.backgroundColor = 'lightgray';
    }
    atualizarCorStatusEstoque();
}

document.getElementById('categoriaMotivo').addEventListener('change', () => {
    LoadMotivos();
});

document.addEventListener('DOMContentLoaded', LoadMotivos);

LoadCate();
adicionarCorAoFocarInput();



var count = 0;

function exibirDadosTabela(id, produto, estoque, quantidade) {
    var totalDeTudo = 0;
    produtos.forEach((Produto) => {
        const codigo = Produto.idProduto;
        const produto = Produto.Descricao;
        const Qtd = Produto.Estoque;
        const Un = Produto.Unidade;
        const Preco = Produto.Valor;
        const Total = Produto.Valor * Produto.Estoque;

        if (codigo == id) {
            document.getElementById("DescricaoProduto").value = produto;
            document.getElementById("Estoque").value = Qtd
        }

        if (codigo == id && quantidade <= Qtd && quantidade != '') {
            const stringAux = "<tr id='teste" + count + "'><td>" + codigo + "</td><td>" + produto + "</td><td>" + Qtd + "</td><td>" + quantidade + "</td><td>R$" + Preco + "</td><td>R$" + Preco * quantidade + "</td><td><button class='BtnRemoverItens' onclick='remover(" + count + ", " + Preco * quantidade + " , " + codigo + " , " + quantidade + ")'>Remover</button></td></tr>";
            document.getElementById("tabelaTeste").innerHTML += stringAux;
            count += 1;

            Produto.Estoque = Qtd - quantidade;
            document.getElementById("Estoque").value = Produto.Estoque;


            if (document.getElementById("total").value != '') {
                document.getElementById("total").value = parseInt(document.getElementById("total").value) + Preco * quantidade;
            } else {
                document.getElementById("total").value = Preco * quantidade;
            }

        }

    });


}

function remover(id, total, codigo, quantidade) {
    document.getElementById("teste" + id).remove();
    document.getElementById("total").value = parseInt(document.getElementById("total").value) - total;

    const produto = produtos.filter((e) => e.idProduto == codigo);

    produto[0].Estoque += quantidade;
    document.getElementById("Estoque").value = produto[0].Estoque;
    document.getElementById("DescricaoProduto").value = produto[0].Descricao;
    document.getElementById("CodigoProduto").value = produto[0].idProduto;
    atualizarCorStatusEstoque();

}

document.getElementById('botaoAdicionar').disabled = true;
document.getElementById('Quantidade').addEventListener('input', function () {
    const quantidadeInput = document.getElementById('Quantidade');
    const estoqueInput = document.getElementById('Estoque');
    const botaoAdicionar = document.getElementById('botaoAdicionar');

    if (
        quantidadeInput.value.trim() === '' ||
        parseInt(quantidadeInput.value) <= 0 ||
        parseInt(quantidadeInput.value) > parseInt(estoqueInput.value)
    ) {
        botaoAdicionar.disabled = true;
        botaoAdicionar.style.opacity = '0.5';
        botaoAdicionar.style.backgroundColor = '#dddddd';
    } else {
        botaoAdicionar.disabled = false;
        botaoAdicionar.style.opacity = '1';
        botaoAdicionar.style.backgroundColor = '#007C1B';
    }
});


function adicionarProduto() {
    var id = document.getElementById("CodigoProduto").value
    var produto = document.getElementById("DescricaoProduto").value
    var estoque = document.getElementById("Estoque").value
    var quantidade = document.getElementById("Quantidade").value
    
    if (!Number.isInteger(Number(quantidade)) || quantidade <= 0) {
        alert('Digite uma quantidade válida (inteira maior que zero).');
        return;
    }

    exibirDadosTabela(id, produto, estoque, quantidade);

    document.getElementById("Quantidade").value = '';
    document.getElementById('botaoAdicionar').disabled = true;
    document.getElementById('botaoAdicionar').style.opacity = '0.5';
    document.getElementById('botaoAdicionar').style.backgroundColor = '#dddddd';

    atualizarCorStatusEstoque();
}


atualizarCorStatusEstoque();



function validarCampos() {
    const camposObrigatorios = [
        'inpNumero',
        'idDepartamento',
        'departamento',
        'dataRequisicao',
        'idFuncionario',
        'cargo',
        'categoriaMotivo',
        'Motivo',
        'urgente',
        'medio',
        'baixo'
    ];

    camposObrigatorios.forEach(campoId => {
        const campo = document.getElementById(campoId);
        campo.style.backgroundColor = '';
    });

    const radioPrioridadeDiv = document.querySelector('.radioPrioridade');
        radioPrioridadeDiv.style.border = '';
        radioPrioridadeDiv.style.borderRadius = '';

    let camposFaltando = [];
    camposObrigatorios.forEach(campoId => {
        const campo = document.getElementById(campoId);

        if (campo.tagName === 'SELECT' && campo.value === '0') {
            camposFaltando.push(campo);
        } else if (campo.type === 'radio' && !document.querySelector(`input[name="${campo.name}"]:checked`)) {
            camposFaltando.push(campo);

            if (campo.name === 'prioridade') {
                radioPrioridadeDiv.style.border = '2px solid rgba(255, 0, 0, 0.7)';
                radioPrioridadeDiv.style.borderRadius = '8px';
            }
        } else if (!campo.value.trim()) {
            camposFaltando.push(campo);
        }
    });

    if (camposFaltando.length > 0) {
        camposFaltando.forEach(campo => {
            campo.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
        });

        alert('Preencha todos os campos obrigatórios antes de gravar.');
    } else {
        alert('Dados gravados com sucesso!');
    }
}


document.getElementById('botaoGravar').addEventListener('click', validarCampos);





document.getElementById('idDepartamento').addEventListener("keyup",function(){
    const codigoPesquisado = document.getElementById('idDepartamento').value;
    let departamentosFiltrados = departamentos.filter((p)=> p.idDep==codigoPesquisado);

    if (departamentosFiltrados.length>0) {
        document.getElementById('departamento').value=departamentosFiltrados[0].Descricao;
        
    }else{
        document.getElementById('departamento').value="";
    }
});

document.getElementById('idFuncionario').addEventListener("keyup",function(){
    const codigoPesquisado = document.getElementById('idFuncionario').value;
    let funcionariosFiltrados = funcionarios.filter((p)=> p.idFuncionario==codigoPesquisado);

    if (funcionariosFiltrados.length>0) {
        document.getElementById('NomeFuncionario').value = funcionariosFiltrados[0].Nome;
        document.getElementById('cargo').value = funcionariosFiltrados[0].Cargo;
        
    }else{
        document.getElementById('NomeFuncionario').value="";
    }
});


document.getElementById('CodigoProduto').addEventListener("keyup", function(){
    const codigoPesquisado = document.getElementById('CodigoProduto').value;
    let produtosFiltrados = produtos.filter((p)=> p.idProduto==codigoPesquisado);

    const quantidadeInput = document.getElementById('Quantidade');

    if(produtosFiltrados.length !== 0 && produtosFiltrados[0].Estoque > 0){
        document.getElementById('DescricaoProduto').value = produtosFiltrados[0].Descricao;
        document.getElementById('Estoque').value = produtosFiltrados[0].Estoque;
        
        quantidadeInput.disabled = false;
    } else {
        document.getElementById('DescricaoProduto').value = "";
        quantidadeInput.value = "";
        produtosFiltrados[0].Estoque = 0;
        
        quantidadeInput.disabled = true;
    }
});

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('Quantidade').disabled = true;
});

const radioInputs = document.querySelectorAll('.chkPrioridade');

radioInputs.forEach(radio => {
    radio.addEventListener('change', function () {
        radioInputs.forEach(radio => {
            radio.style.setProperty('--accent-color', ''); 
        });

        const nivelPrioridade = this.id;

        switch (nivelPrioridade) {
            case 'urgente':
                this.style.setProperty('--accent-color', 'red');
                break;
            case 'medio':
                this.style.setProperty('--accent-color', 'yellow');
                break;
            case 'baixo':
                this.style.setProperty('--accent-color', 'green');
                break;
            default:
                this.style.setProperty('--accent-color', 'blue');
                break;
        }
    });
});


function atualizarCorStatusEstoque() {
    var statusEstoque = document.getElementById("StatusEstoque");


    var produtoAtual = produtos.find(produto => produto.idProduto == document.getElementById("CodigoProduto").value);

    if (!produtoAtual) {
        console.error("Produto não encontrado.");
        return;
    }


    var estoqueAtual = parseFloat(document.getElementById("Estoque").value);


    var diferencaEstoque = estoqueAtual - produtoAtual.EstoqueMinimo;

    if (diferencaEstoque <= 0) {
        statusEstoque.src = "./assets/img/vermelho.svg";
    } else if (diferencaEstoque <= 0.1 * produtoAtual.EstoqueMinimo) {
        statusEstoque.src = "./assets/img/amarelo.svg";
    } else {
        statusEstoque.src = "./assets/img/verde.svg";
    }
}
