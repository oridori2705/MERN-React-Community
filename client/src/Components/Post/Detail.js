import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import "../../Style/PostDetailCss.css"
import { useSelector } from "react-redux";
import Avatar from 'react-avatar';

const Detail = (props) => {
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
                <h1>{props.PostInfo.title} </h1>
                <Avatar size="40"
                    round={true}
                    src={`http://localhost:5000/${props.PostInfo.author.photoURL}`}
                    style={{ border: "1px solid #c6c6c6" }}></Avatar>
                <h3>{props.PostInfo.author.displayName}</h3>
                {props.PostInfo.image ? (
                <img
                src={`http://localhost:5000/${props.PostInfo.image}`}
                alt=""
                style={{ width: "100%", height: "auto" }}
                />
                ) : null}
                <p>{props.PostInfo.content}</p>
            </div>
            {user.uid === props.PostInfo.author.uid && (
                <div className='BtnDiv'>
                    <Link to={`/edit/${props.PostInfo.postNum}`}>
                        <button className='edit' type='button'>수정</button>
                    </Link>
                    <button className="delete" onClick={()=>DeleteHandler()} type='button'>삭제</button>
                </div>
            )}
        </>
    </div>
        
        
    )
}

export default Detail;