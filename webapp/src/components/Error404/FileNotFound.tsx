import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./FileNotFound.css"

function FileNotFound() {

    const navigate = useNavigate();

    return (
        <div className="error-container">
        <h1 className="error-header">Error 404</h1>
        <p className="error-message">Lo siento, la página que buscas no existe.</p>

        <button className="home-button" onClick={x => navigate('/index')}>Página principal</button>
        
        </div>
    )
}

export default FileNotFound