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

        // constrói uma chave (id) se nenhuma existir
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
        $('#sucessoGravacao').modal('show')
    } else {
        // Dispara modal com o erro
        // Seletor do jQuery
        $('#erroGravacao').modal('show')
    }
}
