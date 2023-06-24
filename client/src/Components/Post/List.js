import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../../Style/ListCss.css"


export const List = (props) => {
  const [PostList, setPostList] = useState([])
  useEffect(() => {
    axios.post("/api/post/list").then((res)=>{
      if(res.data.success){
        setPostList([...res.data.postList])
      }
    }).catch((err) => {
      console.log(err);
    });
  }, [])
  

  return (
    <div className='ListDiv'>
      <h3>
        list
      </h3>

      {PostList.map((x,idx) =>{
        return(
          <div key={idx} className='Listitem'>
          <p className='title'>
            제목 : {x.title}
          </p>
          <p>
            내용 : {x.content}
          </p>
          </div>
        )
        
      })}
    </div>
  )
}
