import React, { useState} from 'react'
import { useClickAway } from "@uidotdev/usehooks";
import { useSelector } from 'react-redux';
import axios from 'axios';

import Avatar from 'react-avatar';

const RepleContent = (props) => {
  const [ModalFlag, setModalFlag] = useState(false);
  const user = useSelector((state) => state.user);
  const [EdifFlag, setEdifFlag] = useState(false);
  const [Reple, setReple] = useState(props.reple.reple)

  const SubmitHandler = (e)=>{
    e.preventDefault();
    let body= {
      uid : user.uid,
      reple : Reple,
      postId : props.reple.postId,
      repleId: props.reple._id

    }
    axios.post("/api/reple/edit",body).then((res)=>{
      if(res.data.success){
        alert("댓글 수정이 성공했습니다.")
      }
      else{
        alert("댓글 수정이 실패했습니다.");
      }
      return window.location.reload();
    })
  }



  const ref = useClickAway(() => {
    setModalFlag(false);
  });
  const handleOpenModal = () => {
    if (ModalFlag=== false) {
      setModalFlag(true);
    }
  };

  const DeleteHandler = (e) => {
    e.preventDefault();
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      let body = {
        repleId: props.reple._id,
        postId: props.reple.postId,
      };
      axios
        .post("/api/reple/delete", body)
        .then((response) => {
          if (response.data.success) {
            alert("댓글이 삭제되었습니다.");
            window.location.reload();
          }
        })
        .catch((err) => {
          alert("댓글 삭제에 실패하였습니다.");
        });
    }
  };


  return (
    <div className='RepleContentDiv'>
      <div className='author'>
        <Avatar
            size="40"
            round={true}
            src={`http://localhost:5000/${props.reple.author.photoURL}`}
            style={{ border: "1px solid #c6c6c6" }}
          />
        <p>{props.reple.author.displayName}</p>
        {props.reple.author.uid == user.uid &&
            <div className='modalControl'>
            <span onClick={()=>handleOpenModal()}>···</span>
            {ModalFlag && (
            <div className='modalDiv' ref={ref}>
              <p onClick={()=> {
                setEdifFlag(true)
                setModalFlag(false)
                }}>수정</p>
              <p className='delete' onClick={(e)=>DeleteHandler(e)}>삭제</p>
            </div>
            )}
          </div>
        }
        
      </div>
      {EdifFlag ? (<div className="RepleUploadDiv">
      <form>
        <input type="text" value={Reple} onChange={(e)=>{
          setReple(e.currentTarget.value)
        }}></input>
        <button onClick={(e)=>{SubmitHandler(e)}}>등록</button>
      </form>
      <div className='cancel'>
        <button onClick={(e)=>{
          e.preventDefault();
          setEdifFlag(false);
        }}>취소</button>
      </div>
      
      
    </div>) : (<p>{props.reple.reple}</p>)}
    </div>
  )
}



export default RepleContent;