import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const RepleUpload = (props) => {

  const [Reple, setReple] = useState("")
  const user = useSelector((state)=>state.user);

  const submiHandelr = (e)=>{
    e.preventDefault();
    if(!Reple){
      return alert("댓글 내용을 작성해주세요!")
    }
    let body={
      reple:Reple,
      uid: user.uid,
      postId: props.postID
    }
    axios.post("/api/reple/submit",body).then((res)=>{
      if(res.data.success){
        setReple("")
        alert("댓글 작성에 성공했습니다.")
      }
      else{
        alert("댓글 작성에 실패했습니다.")
      }
    })
  }
  return (
    <div>
      <form>
        <input type="text" value={Reple} onChange={(e)=>{
          setReple(e.currentTarget.value)
        }}></input>
        <button onClick={(e)=>{submiHandelr(e)}}>등록</button>
      </form>
      
    </div>
  )
}
export default RepleUpload;