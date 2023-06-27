import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import "../../Style/UploadStyle.css"
import ImageUpload from './ImageUpload';

export const Edit = () => {
    let path=useParams();
    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("")
    const [PostInfo, setPostInfo] = useState({})
    const [Flag, setFlag] = useState(false);
    const [Image, setImage] = useState("")

    let navigate = useNavigate();

    useEffect(() => {
        let body = {
          postNum: path.postNum,
        };
        axios
          .post("/api/post/detail", body)
          .then((response) => {
            if (response.data.success) {
              setPostInfo(response.data.post);
              setTitle(response.data.post.title);
              setContent(response.data.post.content);
              setImage(response.data.post.image);
              setFlag(true);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    
  const onsubmit = (e)=>{
    //데이터가 잘보내지지만 submit을하면 새로고침으로인해 프론트에서 변화가 안나타난다.
    //onclick에서 받아온 이벤트 e로  e.preventDefault()를 해줘야한다.
    e.preventDefault();

    if(Title ==="" || Content ===""){
      return alert("모든 항목을 채워주세요")
    }
    //서버에 보내줄 데이터 객체화
    let body={
      title :Title,
      content : Content,
      postNum : path.postNum,
      image:Image,
    }
    axios.post("/api/post/edit",body).then((res)=>{
      if(res.data.success){
        alert("글 수정이 완료되었습니다.")
        //작성완료후 홈으로
        navigate(`/post/${path.postNum}`)
      }
      else{
        alert("글 수정에 실패하였습니다.")
      }
    }).catch((err)=>{
      console.log(err)
    })
  
  }


  const ContentChange=(e)=>{
    setContent(e.target.value);
  }
  const TitleChange=(e)=>{
    setTitle(e.target.value);
  }

  return (
    <div>
      <div className='uploadForm'>
        <label>제목</label>
        <input className='uploadTitle' id="title" type="text" value={Title || ""} onChange={TitleChange}></input>
        <ImageUpload setImage={setImage} image={Image}/>
        <label>내용</label>
        <textarea className='uploadText' id="content" type="text"  value={Content || ""} onChange={ContentChange}></textarea>
        <div className='uploadBtnDiv'>
        <button className="cancle" onClick={(e)=>{
            e.preventDefault()
            navigate(-1);
            }}>취소</button>
            <button className="uploadBtn" onClick={(e)=>onsubmit(e)}>제출</button>
        </div>
        

        </div>
    </div>
  )
}
