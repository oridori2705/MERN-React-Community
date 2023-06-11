import React, { useEffect, useState } from 'react'

export const List = (props) => {
  useEffect(() => {
    //컴포넌트가 등장할때
  
    return () => {
      //컴포넌트가 사라질 때
    }
  }, [])//컴포넌트안의 값이 변경될 때
  
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
