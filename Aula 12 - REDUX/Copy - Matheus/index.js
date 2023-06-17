const Redux = require('redux')

// função criadora de ação 

const criarContrato = (nome, taxa) => {
    return {
        type: 'CRIAR_CONTRATO',
        payload: {
            nome,
            taxa
        }
    }
}
// Cancelar contrato 
const cancelarContrato = (nome) =>{
    return{
        type: 'CANCELAR_CONTRATO',
        payload:{
            nome
        }
    }
}
// Cashback 
const solicitarCashback = (nome, valor)=>{
    return{
        type: 'SOLICITAR_CASHBACK',
        payload:{
            nome,
            valor
        }
    }
}

// reducer: historico de pedido de cashback 
const historicoPedidosCashback = (
    historicoDePedidosCashbackAtual =[],acao
)=>{
    if(acao.type === 'SOLICITAR_CASHBACK'){
        return [...historicoDePedidosCashbackAtual,acao.payload]
    }
    return historicoDePedidosCashbackAtual
}
// reducer: caixa 
const caixa = (caixa_Atual = 0,acao)=>{
    if(acao.type === 'SOLICITAR_CASHBACK'){
        return caixa_Atual -= acao.payload.valor

    } else if(acao.type === 'CRIAR_CONTRATO'){
        return caixa_Atual += acao.payload.taxa
    }
    return caixa_Atual
}
// reducer: historico de contratos
const historicoDeContrato = (historicoDeContratoAtual=[], acao)=>{
    if(acao.type === 'CRIAR_CONTRATO'){
        return [...historicoDeContratoAtual, acao.payload]
    } else if (acao.type === 'CANCELAR_CONTRATO'){
        return [historicoDeContratoAtual].filter(contrato =>{
            contrato.nome !== acao.payload.nome 
        })
    }
    return historicoDeContratoAtual
}

const { combineReducers, createStore } = Redux

const todosOsReducers = combineReducers({
    historicoPedidosCashback,
    historicoDeContrato,
    caixa
})

const store = createStore(todosOsReducers)

//store.dispatch para enviar uma ação 
// store.getState para observar o estado atual 
// Enviar uma ação de criação de contrato para o joão pagando 50 reais exibir o estado depois 

store.dispatch(criarContrato('João',50))
console.log(store.getState())

const transacao = (store)=>{
  const clientes =  ['Jose','Jonas','Pedro','Ana']
  const funcoes = {
    0: (nome)=> store.dispatch(criarContrato(nome,50)),
    1: (nome)=> store.dispatch(cancelarContrato(nome)),
    2: (nome)=> {
        const valor = Math.floor(Math.random() * (30 - 10 + 1) ) + 10
    store.dispatch(solicitarCashback(nome, valor))
    }
  }
  const indice = Math.floor(Math.random() * (3 - 0 + 1) ) + 0
  const numero_funcao = Math.floor(Math.random() * (2 - 0 + 1) ) + 0
  funcoes[numero_funcao](clientes[indice])
}

setInterval(()=>{
    transacao(store)
    console.log(store.getState())
},5000);
