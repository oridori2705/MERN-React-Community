import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import "../../Style/PostDetailCss.css"

export const Detail = () => {
    let path=useParams();
    const [PostInfo, setPostInfo] = useState({})
    const [Flag, setFlag] = useState(false);

    let navigate = useNavigate();


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
    
    const DeleteHandler=() => {
        if(window.confirm("정말로 삭제하시겠습니까?")){
            let body={
                postNum : path.postNum,
            }
            axios.post('/api/post/delete',body).then((res)=>{
                if(res.data.success){
                    alert("게시글이 삭제되었습니다.");
                    navigate("/");
                }
            }).catch((err)=>{
                alert("게시글 삭제를 실패하였습니다.");
            });
        }
    }




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
                    <button className="delete" onClick={()=>DeleteHandler()} type='button'>삭제</button>
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
