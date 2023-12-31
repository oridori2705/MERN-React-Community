import {React, useEffect, useState } from 'react'
import axios from 'axios';
import "../../Style/ListCss.css"
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

export const List = (props) => {

  return (
    <div className='ListDiv'>
      {props.PostList.map((x,idx) =>{     
        return(
          <div key={idx} className='Listitem'>
            <Link to = {`/post/${x.postNum}`}>
              <p className='title'>
                {x.title}
              </p>
              <Avatar
              size="40"
              round={true}
              src={`http://localhost:5000/${x.author.photoURL}`}
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
