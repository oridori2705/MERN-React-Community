import React, { useState } from 'react'
import "../Style/UploadStyle.css"
export const Upload = (props) => {
  const [Content, setContent] = useState("")
  const onsubmit = ()=>{

  }
  const ContentChange=(e)=>{
    setContent(e.target.value);
  }
  return (
    <div>
      <div className='uploadForm'>
        <label>제목</label>
        <input className='uploadTitle' type="text" value={Content} onChange={ContentChange}></input>
        <label>내용</label>
        <textarea className='uploadText' type="text" ></textarea>
        <div className='uploadBtnDiv'>
          <button className="uploadBtn" onClick={onsubmit()}>제출</button>
        </div>
       
      </div>
    </div>
  )
}
