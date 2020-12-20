class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    } 

    validarDados() {
        // Percorre os atributos contidos dentro do próprio
        // objeto despesa[]
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }

}

class Bd {
    constructor() {
        let id = localStorage.getItem('id')

        // Constrói uma chave (id) se nenhuma existir
        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProxId() {
        // recupera o id atual do Local Storage
        let proximoId = localStorage.getItem('id')
        // passa para o próximo id (soma 1)
        return parseInt(proximoId) + 1
    }

    // Recebe um objeto literal dentro da função e faz a 
    // conversão p JSON
    gravar(d) {
        // Pega o próximo id e atualiza no objeto d
        let id = this.getProxId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    // Recupera os registros dentro de Local Storage toda vez
    // que consulta.html for carregada
    recuperarTodosRegistros() {
        // Array de despesas
        let despesas = Array()
        let id = localStorage.getItem('id')

        // Recupera todas as despesas cadastradas em 
        // Local Storage
        for(let i = 1; i <= id; i++) {
            // Recupera a despesa em formato JSON e converte 
            // para objeto literal com o método parse()
            let despesa = JSON.parse(localStorage.getItem(i))

            // Verifica se existem índices com valor null
            // (despesas que foram excluídas, por exemplo)
            if(despesa === null) {
                // Pula o índice e continua a execução
                continue
            }
            // Insere no array
            despesas.push(despesa)
        }
        return despesas
    }

    // Filtra despesas
    pesquisar(despesa) {
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()

        console.log(despesa)
        console.log(despesasFiltradas)

        // Ano
        if(despesa.ano != '') {
            console.log('Filtro de ano:')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        // Mes
        if(despesa.mes != '') {
            console.log('Filtro de mes:')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        // Dia
        if(despesa.dia != '') {
            console.log('Filtro de dia:')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }


        // Tipo
        if(despesa.tipo != '') {
            console.log('Filtro de tipo:')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        // Descrição
        if(despesa.descricao != '') {
            console.log('Filtro de descrição:')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        // Valor
        if(despesa.valor != '') {
            console.log('Filtro de valor:')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        console.log(despesasFiltradas)
    }
}

let bd = new Bd()

function cadastrarDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    // Verifica se o usuário preencheu todos os dados antes
    // de gravar
    if(despesa.validarDados()) {
        // Grava dados no Local Storage
        bd.gravar(despesa)

        // Dispara modal de sucesso
        document.getElementById('modal_titulo').innerHTML = "Registro inserido"
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa registrada com sucesso!'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'
        $('#registraDespesa').modal('show') 

        // Limpa os campos
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    } else {
        // Dispara modal com o erro
        document.getElementById('modal_titulo').innerHTML = "Erro de gravação"
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Preencha todos os campos, por favor!'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'
        // Seletor do jQuery
        $('#registraDespesa').modal('show')
    }
}

function carregaListaDespesas() {
    let despesas = Array()
    // Recebe a lista com todas as despesas
    despesas = bd.recuperarTodosRegistros()
    // Seleciona o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    // Percorrer o array e listar as despesas dinamicamente
    despesas.forEach(function(d) {
        // Cria a linha (tr)
        let linha = listaDespesas.insertRow()
        //Cria as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        // Ajustar o tipo
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    bd.pesquisar(despesa)
}