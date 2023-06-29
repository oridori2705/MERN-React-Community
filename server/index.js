const express = require('express')
const app = express()
const port = 5000;
const path = require('path')//path라이브러리 설치해야함
const mongoose = require('mongoose'); //mongoose 사용법

//ENV 환경변수 사용
const config = require("./config/key.js");


//express에서 static으로 사용할 폴더를 알려주지않아서 그렇다
//static으로 활용할 폴더를 알려줘야한다.
app.use(express.static(path.join(__dirname,'../client/build')));
//이미지를 서버에 저장하려면 static으로 알려줘야한다.
app.use("/image", express.static("./image"));

//body-parser : 클라이언트에서 데이터를 보내면 제대로 받아오기위해 필요
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//Express에서 Router 사용하기
app.use("/api/post",require("./Router/post.js"))
app.use("/api/user",require("./Router/user.js"))
app.use("/api/reple",require("./Router/reple.js"));


//클라이언트에서 build를 통해 압축해서 서버에서 사용->5000번포트에서 클라이언트사용함
//서버실행
app.listen(port, () => {
    mongoose.connect(config.mongoURI)
    .then(()=>{
        console.log(`Example app listening on port ${port}`),
        console.log("Connecting MongoDB")
    }).catch((err)=>{
        console.log(`${err}`);
    }); //몽고DB연결
    
});
//__dirname: 현재 디렉터리 경로 출력하는 명령어
//get("*",~) : 사용자가 어떠한 요청을하든 똑같은 html파일을 열게하기 위해서 -> 리액트는 react-router-dom으로 APP.js에서 라우팅을 해줬다.->서버측에서는 결국 사용자가 어떠한 요청을 보내든 똑같은 html파일을띄워야한다.
//유저가 어떠한 url로 들어오든 index.html을 띄워준다.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../client/build/index.html'));
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../client/build/index.html'));
})

