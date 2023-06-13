import React from 'react'
import { Link } from 'react-router-dom'

export const Heading = () => {
  return (
    <div>
        <h1>Heading</h1>
        <div style={{display : "flex", justifyContent : "space-around"}}>
          <Link to="/App">Home</Link>
          <Link to="/Upload">upload</Link>
          <Link to="/List">list</Link>
        </div>
        
    </div>
  )
}
