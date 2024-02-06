const categorias = [
    {
        "idCategoria": 1,
        "Descricao": "Gestão",
    },
    {
        "idCategoria": 2,
        "Descricao": "Cliente",
    },
    {
        "idCategoria": 3,
        "Descricao": "RP",
    },
]
const motivos=[
    {
        "idMotivo": 1,
        "Descricao": "Planejamento",
        "idCategoria": 1
    },
    {
        "idMotivo": 2,
        "Descricao": "Financeiro",
        "idCategoria": 1
    },
    {
        "idMotivo": 3,
        "Descricao": "Quebra de Máquina",
        "idCategoria": 2
    }
]


const produtos=[
    {
        "idProduto": 10,
        "Descricao": "Papel A4",
        "Estoque": 100,
        "EstoqueMinimo": 50,
        "Unidade":'Pç',
        "Valor": 10,
    },
    {
        "idProduto": 20,
        "Descricao": "Mel doce",
        "Estoque": 50,
        "EstoqueMinimo": 25,
        "Unidade":'Pç',
        "Valor": 20,
    },
]



const departamentos = [
    {
        "idDep": 1,
        "Descricao": "Sec. Educação",
        "Responsavel": "José"
    },
    {
        "idDep": 2,
        "Descricao": "Sec. Trabalho",
        "Responsavel": "Menino Feio"
    },
    {
        "idDep": 3,
        "Descricao": "NAT",
        "Responsavel": "Joana Like"
    }
]

const funcionarios = [
    {
        "idFuncionario": 1,
        "Nome": "Anderson",
        "Cargo": "Atendente"
    },
    {
        "idFuncionario": 2,
        "Nome": "Clara",
        "Cargo": "Supervisora"
    },
    {
        "idFuncionario": 3,
        "Nome": "Milena",
        "Cargo": "Diretora"
    }
]