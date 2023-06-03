import React from 'react'
import Imagem from './Imagem'
const ListaImagem = ({pics,imgStyle}) => {
  return (
    pics.map((pic)=>{
        return(
            <Imagem
            imgStyle={imgStyle}
            url = {pic.src.medium}
            alt = {pic.alt}
            />
        )
    })
  )
}

export default ListaImagem