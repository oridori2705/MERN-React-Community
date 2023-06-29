import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import "../../Style/PostDetailCss.css"
import { useSelector } from "react-redux";
export const Detail = (props) => {
    let path=useParams();

    let navigate = useNavigate();
    const user = useSelector((state) => state.user);
    
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
        <>
            <div className='Post'>
                <h1>{props.title} </h1>
                <h3>{props.author.displayName}</h3>
                {props.image ? (
                <img
                src={`http://localhost:5000/${props.image}`}
                alt=""
                style={{ width: "100%", height: "auto" }}
                />
                ) : null}
                <p>{props.content}</p>
            </div>
            {user.uid === props.author.uid && (
                <div className='BtnDiv'>
                    <Link to={`/edit/${props.postNum}`}>
                        <button className='edit' type='button'>수정</button>
                    </Link>
                    <button className="delete" onClick={()=>DeleteHandler()} type='button'>삭제</button>
                </div>
            )}
        </>
    </div>
        
        
    )
}
