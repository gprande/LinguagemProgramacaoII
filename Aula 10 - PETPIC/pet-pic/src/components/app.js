// Baixar a extensão Es7 react 
// rafce ↓ 

// rafce - Instalar o react no vscode
import React from 'react'
import Busca from './Busca'
import env from 'react-dotenv'
import { createClient } from 'pexels'
import ListaImagem from './ListaImagem'
import PexelsLogo from './PexelsLogo'
import PexelsClient from '../utils/PexelsClient'

class App extends React.Component {
  state = {pics: []}
  
  componentDidMount(){
    this.client = createClient(env.PEXELS_KEY)
  }
  //client = null
  // onBuscaRealizada = async (termo) => {
  //   const result = await this.client.photos.search({
  //     query: termo,
  //     per_page: 50
  //   })
  //   this.setState({pics: result.photos})
  // }
  onBuscaRealizada = (termo) => {
    PexelsClient.get('/search', {
      params: {query: termo, per_page: 30}
    })
    .then(result => {
      this.setState({pics: result.data.photos})
    })
    .catch(e=>{
      console.log(e);
    })
  }
    render() {
      return (
        <div className='grid justify-content-center m-auto w-9 border-round border-1 border-400'>
          <div className="col-12">
            <PexelsLogo/>
          </div>
          <div className="col-12">
            <h1>Exibir uma lista de...</h1>
          </div>
          <div className="col-12">
            <Busca onBuscaRealizada={this.onBuscaRealizada} />
          </div>
          <div className="col-12">
            <div className="grid">
              <ListaImagem pics = {this.state.pics}
              imgStyle = {'col-12 md:col-6 lg:col-4 xlg:col-3'}/>
            </div>
          </div>
        </div>
    )
  }
}
export default App
{/* {
  this.state.pics.map((pic,indice) => {
    return(
      <div key={indice}>
        <img src={pic.src.small} alt={pic.alt} />
      </div>
    )
  })
} */}