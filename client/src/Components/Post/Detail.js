import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
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
    <div>
        {Flag ?
            <div>
                <div>
                <div className='Post'>
                    <h1>{PostInfo.title} </h1>
                    <p>{PostInfo.content}</p>
                </div>
                </div>
                <div className='BtnDiv'>
                    <button className='edit' type='button'>수정</button>
                    <button className="delete" type='button'>삭제</button>
                </div>
            </div>
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
