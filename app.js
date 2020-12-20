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
    console.log(despesas)
}