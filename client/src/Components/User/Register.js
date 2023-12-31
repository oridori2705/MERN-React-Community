import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import firebase from "../../firebase.js";
import axios from "axios";



import "../../Style/UserCSS.css";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [Flag, setFlag] = useState(false);
  const [NameCheck, setNameCheck] = useState(false);
  const [NameInfo, setNameInfo] = useState("");

  let navigate = useNavigate();


  const RefisterFunc = async (e) => {
    setFlag(true); //회원가입 반복클릭 막기위해
    e.preventDefault();
    if (!(Name && Email && PW && PWConfirm)) {
      setFlag(false);
      return alert("모든 값을 채워주세요!");
    }
    if (PW !== PWConfirm) {
      setFlag(false);
      return alert("비밀번호와 비밀번호 확인 값은 같아야 합니다.");
    }
    if (!NameCheck) {
      setFlag(false);
      return alert("닉네임 중복검사를 진행해 주세요.");
    }
    await firebase
    .auth()
    .createUserWithEmailAndPassword(Email, PW)
    .then(async (userCredential)=>{
      await userCredential.user.updateProfile({
        displayName: Name,
        photoURL:
        "image\\default_image.jpg",
        });
        let body = {
          email: userCredential.user.multiFactor.user.email,
          displayName: userCredential.user.multiFactor.user.displayName,
          uid: userCredential.user.multiFactor.user.uid,
          photoURL:
            "image\\default_image.jpg",
        };
        axios.post("/api/user/register", body).then((response) => {
          setFlag(false);
          if (response.data.success) {
            //회원가입 성공시
            navigate("/login");
          } else {
            //회원가입 실패시
            setFlag(false);
            return alert("회원가입이 실패하였습니다.");
          }
        });
    }).catch((e)=>{
      if(e.code==="auth/email-already-in-use"){
        setFlag(false);
        return alert("Email already in use");
      }
    });

    
  };



  const NameCheckFunc = async (e) => {
    e.preventDefault();
    if (!Name) {
      return alert("닉네임을 입력해주세요");
    }

    let body = {
      displayName: Name,
    };
    
    await axios.post("/api/user/namecheck", body).then((response) => {
      if (response.data.success) {
        if (response.data.check) {
          setNameCheck(true);
          setNameInfo("사용가능한 닉네임입니다.");
        } else {
          setNameInfo("사용불가능한 닉네임입니다.");
        }
      }
    }).catch((err)=>{
      console.error(err);
    });
  };

  return (
    <div className="LoginDiv">
      <form>
        <label>닉네임</label>
        <input
          type="name"
          value={Name}
          onChange={(e) => setName(e.currentTarget.value)}
          disabled={NameCheck}
        />
        {NameInfo}
        <button disabled={NameCheck} onClick={(e) => NameCheckFunc(e)}>닉네임 중복검사</button>
        <label>이메일</label>
        <input
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label>비밀번호</label>
        <input
          type="password"
          value={PW}
          minLength={8}
          onChange={(e) => setPW(e.currentTarget.value)}
        />
        <label>비밀번호확인</label>
        <input
          type="password"
          value={PWConfirm}
          minLength={8}
          onChange={(e) => setPWConfirm(e.currentTarget.value)}
        />
        <button disabled={Flag} onClick={(e)=>RefisterFunc(e)}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Register;
