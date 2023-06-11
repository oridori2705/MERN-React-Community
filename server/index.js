const express = require('express')
const app = express()
const port = 5000
const path = require('path')//path라이브러리 설치해야함

//express에서 static으로 사용할 폴더를 알려주지않아서 그렇다
//static으로 활용할 폴더를 알려줘야한다.
//
app.use(express.static(path.join(__dirname+'../client/build')));
//클라이언트에서 build를 통해 압축해서 서버에서 사용->5000번포트에서 클라이언트사용함
//서버실행
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
//__dirname: 현재 디렉터리 경로 출력하는 명령어
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'../client/build/index.html'));
})

