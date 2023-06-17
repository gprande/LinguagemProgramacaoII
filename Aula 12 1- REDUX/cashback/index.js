const Redux = require('redux')

//funcao criadora de acao
const criarContrato = (nome, taxa) => {
    return {
        type: 'CRIAR_CONTRATO',
        payload: {
            nome, taxa
        }
    }
}
//funcao criadora de acao que cancela contrato
const cancelarContrato = (nome) => {
    return {
        type: 'CANCELAR_CONTRATO',
        payload: {nome}
    }
}
//funcao cashback
const solicitarCashback = (nome, valor) => {
    return {
        type: 'SOLICITAR_CASHBACK',
        payload: {
            nome, valor
        }
    }
}
//reducer historico pedidos cashback
const historicoPedidosCashback = (
    historicoDePedidosCashbackAtual = [],
    acao
    ) => {
        if (acao.type === 'SOLICITAR_CASHBACK'){
            return [...historicoDePedidosCashbackAtual, acao.payload]
        }
        return historicoDePedidosCashbackAtual
}
//reducer caixa
const caixa = (caixaAtual = 0, acao) => {
    acao.type === 'SOLICITAR_CASHBACK'
    ? caixaAtual - acao.payload.valor
    : acao.type === 'CRIAR_CONTRATO'
    ? caixaAtual + acao.payload.taxa
    : caixaAtual
}

const historicoDeContratos = (
    historicoDeContratosAtual = [],
    acao
) => {
    if(acao.type === 'CRIAR_CONTRATO')
        return [...historicoDeContratosAtual, acao.payload]
    if(acao.type === 'CANCELAR_CONTRATO')
        return historicoDeContratosAtual.filter(
            contrato => contrato.nome != acao.payload.nome
        )
    return historicoDeContratosAtual
}