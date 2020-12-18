class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
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

    bd.gravar(despesa)
}
