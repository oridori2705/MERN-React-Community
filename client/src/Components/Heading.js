import React from 'react'
import { Link } from 'react-router-dom'

export const Heading = () => {
  return (
    <div>
        <h1>Heading</h1>
        <div style={{display : "flex", justifyContent : "space-around"}}>
          <Link to="/">Home</Link>
          <Link to="/upload">upload</Link>
          <Link to="/list">list</Link>
        </div>
        
    </div>
  )
}
