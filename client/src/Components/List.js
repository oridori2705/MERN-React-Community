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
  
 
  return (
    <div>
      list
    </div>
  )
}
