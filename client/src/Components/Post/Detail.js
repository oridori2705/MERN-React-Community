import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import "../../Style/PostDetailCss.css"
export const Detail = () => {
    let path=useParams();
    const [PostInfo, setPostInfo] = useState({})
    const [Flag, setFlag] = useState(false);
    useEffect(() => {
        
        let body={
            postNum : path.postNum
        }
        axios.post("/api/post/detail",body).then((response) => {
            if(response.data.success){
                setPostInfo(response.data.post)
                setFlag(true)
            }

        }).catch((error) => {
            console.log(error);
        });
    }, [])
    
    return (
    <div className='PostDiv'>
        {Flag ?
            <>
                <div className='Post'>
                    <h1>{PostInfo.title} </h1>
                    <p>{PostInfo.content}</p>
                </div>
                
                <div className='BtnDiv'>
                    <Link to={`/edit/${PostInfo.postNum}`}>
                        <button className='edit' type='button'>수정</button>
                    </Link>
                    <button className="delete" type='button'>삭제</button>
                </div>
            </>
        : 
        <div className='SpinnerDiv'>
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
        
        }
    </div>
        
        
    )
}
