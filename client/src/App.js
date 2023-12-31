import { Routes, Route } from 'react-router-dom';
import './App.css';
import { List } from './Components/Post/List';
import { Upload } from './Components/Post/Upload';
import { Heading } from './Components/Heading';
import { Edit } from './Components/Post/Edit';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import React, { useEffect } from "react";

import { loginUser, clearUser } from "./Reducer/userSlice.js";
import { useDispatch} from 'react-redux';
import firebase from "./firebase.js";
import PostArea from './Components/Post/PostArea';
import MyPage from './Components/User/MyPage';
import MainPage from './Components/MainPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
        
      } else {
        dispatch(clearUser());
      }
      
    })
    
  }, []);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/Upload" element={<Upload />}></Route>
        <Route path="/post/:postNum" element={<PostArea />}></Route>
        <Route path='/edit/:postNum' element={<Edit />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>

  );
}

export default App;
