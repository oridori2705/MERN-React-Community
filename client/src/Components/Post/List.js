import {React, useEffect, useState } from 'react'
import axios from 'axios';
import "../../Style/ListCss.css"
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

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
            <Link to = {`/post/${x.postNum}`}>
              <p className='title'>
                {x.title}
              </p>
              <Avatar
              size="40"
              round={true}
              src={x.author.photoURL}
              style={{ border: "1px solid #c6c6c6" }}
            />
              <p>{x.author.displayName}</p>
              <p>
                {x.content}
              </p>
            </Link>
          
          </div>
        )
        
      })}
    </div>
  )
}
