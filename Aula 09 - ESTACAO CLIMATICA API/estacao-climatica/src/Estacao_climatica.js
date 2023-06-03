import React, { Component } from 'react'
import ReactDOM from 'react-dom'
export class Estacao_climatica extends Component {

    timer = null
    state = {
        data: null
    }
    componentDidMount(){
        this.timer = setInterval(()=>{
            this.setState({data: new Date().toLocaleTimeString()})
            this.props.obterLocalizacao()
        },1000)
    }
    componentDidUpdate(){
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center border rounded mb-2" style={{ height: '6rem' }}>
                        <i className={`fas fa-5x ${this.props.icone}`}></i>
                        <p className="w-75 ms-3 text-center fs-1">{this.props.estacao}</p>
                    </div>
                    <div>
                        <p className="text-center">
                            {
                                this.props.latitude ?
                                    `Cordenadas: ${this.props.latitude} ${this.props.longitude} Data: ${this.state.data}` : this.props.mensagemDeErro ? this.props.mensagemDeErro : `Clique no botão para saber sua estação climática`
                            }
                        </p>
                    </div>
                    <div>
                        <button className="btn btn-outline-primary w-100 mt-2"
                            onClick={this.props.obterLocalizacao}>
                            Qual a minha estação ?
                        </button>
                        <button className="btn btn-outline-danger w-100 mt-2"
                            onClick={() => ReactDOM.unmountComponentAtNode(
                                document.querySelector('#root')
                            )}>
                            Unmont
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Estacao_climatica