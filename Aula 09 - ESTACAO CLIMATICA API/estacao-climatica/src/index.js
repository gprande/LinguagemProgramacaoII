import "bootstrap/dist/css/bootstrap.min.css"

import React from 'react'
import ReactDOM from 'react-dom'
import Estacao_climatica from "./Estacao_climatica"
import Loading from "./Loading"
export default class App extends React.Component {

    state = {
        latitude: null,
        longitude: null,
        estacao: null,
        data: null,
        icone: null,
        mensagemDeErro: null
    }
    componentDidMount() {
        this.obterLocalizacao()
    }
    componentDidUpdate() {

    }
    componentWillUnmount() {

    }

    obter_estacao = (data, latitude) => {
        const anoAtual = data.getFullYear()
        // representa o intervalo 21/06
        const d1 = new Date(anoAtual, 5, 21)
        const d2 = new Date(anoAtual, 8, 24) // 24/09 
        const d3 = new Date(anoAtual, 11, 22) // 22/12
        const d4 = new Date(anoAtual, 2, 21) // 21/03 
        const sul = latitude < 0
        if (data >= d1 && data < d2)
            return sul ? 'Inverno' : 'Verão'
        if (data >= d2 && data < d3)
            return sul ? 'Primavera' : 'Outono'
        if (data >= d3 && data < d4)
            return sul ? 'Verão' : 'Inverno'
        return sul ? 'Outono' : 'Primavera'
    }
    obterLocalizacao = () => {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                //extrair data do sistema
                let data = new Date()
                //calcular a estação climática do usuário
                let estacao = this.obter_estacao(data, position.coords.latitude)
                //decidir qual ícone usar 
                let icone = this.icones[estacao]
                //atualziar o estado do componente
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    estacao,
                    data: data.toLocaleTimeString(),
                    icone
                })
            },
            (erro) => {
                this.setState({ mensagemDeErro: 'Tente novamente mais tarde' })
            }
        )
    }
    icones = {
        'Primavera': 'fa-seedling',
        'Verão': 'fa-umbrella-beach',
        'Outono': 'fa-tree',
        'Inverno': 'fa-snowman'
    }
    // se estou em primaveira icone fa-seedling 
    // se estou em inverno icone fa-snowman
    render() {
        return (
            <div className="container mt-2">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {
                            (!this.state.mensagemDeErro && !this.state.latitude)?
                            <Loading mensagem = "Autorize o acesso a localização"/>
                            :
                            this.state.mensagemDeErro ? 
                            <p className="border-rounded p-2 fs-1 text-center">
                                É preciso dar permissão
                            </p>
                            :
                            <Estacao_climatica
                                icone={this.state.icone}
                                latitude = {this.state.latitude}
                                longitude = {this.state.longitude}
                                estacao = {this.state.estacao}
                                mensagemDeErro = {this.state.mensagemDeErro}
                                obterLocalizacao={this.obterLocalizacao}
                          />
                        }
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render(
    <App />,
    document.querySelector('#root')
)