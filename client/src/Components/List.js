import React, { useEffect, useState } from 'react'
import axios from 'axios';



export const List = (props) => {
  let body={
    text:"hi"
  }
  useEffect(() => {

  axios.post('/api/test',body)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })

  }, [])
  
  const [Content, setContent] = useState("")
  const onsubmit = ()=>{

  }
  const ContentChange=(e)=>{
    setContent(e.target.value);
  }
  return (
    <div>
      <input type="text" value={Content} onChange={ContentChange}></input>
      <button onClick={onsubmit()}>제출</button>
    </div>
  )
}
