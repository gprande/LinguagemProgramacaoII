import React from 'react'

const Feedback = ({funcaoOK,funcaoNOK,textoOK,textoNOK}) => {
  return (
    <div className="d-flex justify-content-evenly m-2">
        <button className="btn-primary btn" 
        type="button"
        onClick = {funcaoOK}>
            {textoOK}
        </button>
        <button className="btn-danger btn" 
        type="button"
        onClick = {funcaoNOK}>
            {textoNOK}
        </button>
    </div>
  )
}

export default Feedback