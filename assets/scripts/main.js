// document.getElementById('departamento').addEventListener('focus', () => {

//     const inputDepartamento = document.getElementById('departamento');
//     inputDepartamento.style.backgroundColor='#98FB98'
// })


// document.getElementById('departamento').addEventListener('blur', () => {

//     const inputDepartamento = document.getElementById('departamento');
//     inputDepartamento.style.backgroundColor='white'
// })



function adicionarCorAoFocarInput() {
    const ListInput = document.querySelectorAll('input')
    console.log(ListInput.length);
    console.log(ListInput);

    // Array.prototype.map.call(ListInput, (object)=>{
    //     object.style.backgroundColor='#98FB98'
    // });


    ListInput.forEach((object) => {
        object.addEventListener('focus', () => {
            object.style.backgroundColor = '#98FB98'
        });

        object.addEventListener('blur', () => {
            object.style.backgroundColor = 'white'
        });
    })
}


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
    console.log(categoriaValue);
    const motivoFiltrado = motivos.filter((e) => e.idCategoria == categoriaValue)

    motivoFiltrado.forEach((motivo) => {
        const opt = document.createElement('option');
        opt.value = motivo.idCategoria;
        opt.text = motivo.Descricao;

        selectCate.add(opt);
    });
}

document.getElementById('categoriaMotivo').addEventListener('change', () => {
    LoadMotivos();
});

LoadMotivos();
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
            const stringAux = "<tr id='teste"+ count +"'><td>" + codigo + "</td><td>" + produto + "</td><td>" + Qtd + "</td><td>" + quantidade + "</td><td>R$" + Preco + "</td><td>R$" + Preco * quantidade + "</td><td><button class='BtnRemoverItens' onclick='remover("+ count +", "+ Preco * quantidade +" , "+ codigo +" , "+ quantidade +")'>Remover</button></td></tr>";
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

function remover(id, total, codigo, quantidade){
    document.getElementById("teste"+ id).remove();
    document.getElementById("total").value = parseInt(document.getElementById("total").value) - total;

    const produto = produtos.filter((e) => e.idProduto == codigo);

    produto[0].Estoque += quantidade;
    document.getElementById("Estoque").value = produto[0].Estoque;
    document.getElementById("DescricaoProduto").value = produto[0].Descricao;
    document.getElementById("CodigoProduto").value = produto[0].idProduto;

}

function adicionarProduto() {
    var id = document.getElementById("CodigoProduto").value
    var produto = document.getElementById("DescricaoProduto").value
    var estoque = document.getElementById("Estoque").value
    var quantidade = document.getElementById("Quantidade").value
    console.log(quantidade);
    exibirDadosTabela(id, produto, estoque, quantidade);

    document.getElementById("Quantidade").value = '';
}
