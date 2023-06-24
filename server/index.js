const express = require('express')
const app = express()
const port = 5000;
const path = require('path')//path라이브러리 설치해야함
const mongoose = require('mongoose'); //mongoose 사용법

// mongodb+srv://id:<password>@cluster0.zac9yew.mongodb.net/myDB?retryWrites=true&w=majority

//express에서 static으로 사용할 폴더를 알려주지않아서 그렇다
//static으로 활용할 폴더를 알려줘야한다.
app.use(express.static(path.join(__dirname,'../client/build')));



//body-parser : 클라이언트에서 데이터를 보내면 제대로 받아오기위해 필요
app.use(express.json());
app.use(express.urlencoded({ extended:true }));


//만든 몽구스모델을 불러온다.
const {Post} = require('./Model/Post');
const {Counter} =require('./Model/Counter');

//클라이언트에서 build를 통해 압축해서 서버에서 사용->5000번포트에서 클라이언트사용함
//서버실행
app.listen(port, () => {
    
    mongoose.connect
    ('mongodb+srv://oridori2705:wnsgur2705@cluster0.zac9yew.mongodb.net/Community?retryWrites=true&w=majority')
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

/*서버에 데이터를 저장하기위해서
Post할 몽고DB의 모델이 필요함 */
//몽고DB에 데이터 넣는 법
app.post("/api/post/submit",(req,res)=>{
    let temp=req.body;
    Counter.findOne({name:"counter"}).exec().then((x)=>{ 
        //Counter라는 DB를 따로 만들어서 거기에 고유의 번호를 저장하고 
        //만약 데이터가 삭제되더라도 고유의 번호가 변하지 않도록한다.
        temp.postNum=x.postNum;

        const CommunityPost= new Post(temp);

        CommunityPost.save().then(()=>{
            Counter.updateOne({name:"counter"},{$inc : {postNum: 1}}).then(()=>{
                res.status(200).json({success:true});
            });
        });
    })
    .catch((err)=>{
        res.status(400).json({success:false});
    })
    
})

//DB에서 데이터 가져와서 읽어주기
app.post("/api/post/list",(req,res)=>{
    Post.find().exec().then((doc)=>{
        res.status(200).json({success:true, postList : doc})
    }).catch((err)=>{
        res.status(400).json({success:false});
    })
    
    
});

//DB에서 데이터 가져와서 읽어주기
app.post("/api/post/detail",(req,res)=>{
    Post.findOne({postNum : Number(req.body.postNum)}).exec().then((doc)=>{
        console.log(doc);
        res.status(200).json({success:true, post : doc})//post라는 이름으로 데이터를 보내줌
    }).catch((err)=>{
        res.status(400).json({success:false});
    })
    
    
});


app.post("/api/post/edit",(req,res)=>{

    let temp={
        title: req.body.title,
        content : req.body.content
    };
    Post.updateOne({postNum : Number(req.body.postNum)},{$set : temp }).exec().then((doc)=>{
        res.status(200).json({success:true})
    }).catch((err)=>{
        res.status(400).json({success:false});
    })
    
    
});
