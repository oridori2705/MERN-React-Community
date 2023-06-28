const express = require('express')
const router = express.Router()

const multer  = require('multer')//이미지 서버에 저장하기위한 multer

//만든 몽구스모델을 불러온다.
const {Post} = require('../Model/Post');
const {Counter} =require('../Model/Counter');
const {User} = require('../Model/User');

/*서버에 데이터를 저장하기위해서
Post할 몽고DB의 모델이 필요함 */
//몽고DB에 데이터 넣는 법
router.post("/submit",(req,res)=>{
    let temp={
        title : req.body.title,
        content : req.body.content,
        image : req.body.image
    }
    Counter.findOne({name:"counter"}).exec().then((x)=>{ 
        //Counter라는 DB를 따로 만들어서 거기에 고유의 번호를 저장하고 
        //만약 데이터가 삭제되더라도 고유의 번호가 변하지 않도록한다.
        temp.postNum=x.postNum;
        //author 추가
        User.findOne({uid : req.body.uid}).exec().then((userInfo)=>{
            temp.author = userInfo._id;
            const CommunityPost= new Post(temp);
            CommunityPost.save().then(()=>{
                Counter.updateOne({name:"counter"},{$inc : {postNum: 1}}).then(()=>{
                    res.status(200).json({success:true});
                });
            });
        })
        
        
    })
    .catch((err)=>{
        res.status(400).json({success:false});
    })
    
})

//DB에서 데이터 가져와서 읽어주기
router.post("/list",(req,res)=>{
    Post.find()
    .populate("author")
    .exec().then((doc)=>{
        res.status(200).json({success:true, postList : doc})
    }).catch((err)=>{
        res.status(400).json({success:false});
    })
    
    
});

//DB에서 데이터 가져와서 읽어주기
router.post("/detail",(req,res)=>{
    Post.findOne({postNum : Number(req.body.postNum)})
    .populate("author")
    .exec().then((doc)=>{
        res.status(200).json({success:true, post : doc})//post라는 이름으로 데이터를 보내줌
    }).catch((err)=>{
        res.status(400).json({success:false});
    })
    
    
});


router.post("/edit",(req,res)=>{

    let temp={
        title: req.body.title,
        content : req.body.content,
        image : req.body.image
    };
    Post.updateOne({postNum : Number(req.body.postNum)},{$set : temp }).exec().then((doc)=>{
        res.status(200).json({success:true})
    }).catch((err)=>{
        res.status(400).json({success:false});
    })
    
    
});

router.post("/delete",(req,res)=>{
    Post.deleteOne({postNum : Number(req.body.postNum)}).exec().then(()=>{
        res.status(200).json({success:true})//post라는 이름으로 데이터를 보내줌
    }).catch((err)=>{
        res.status(400).json({success:false});
    })
});



//이미지 서버에 저장하기
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "image/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+"-"+file.originalname);
    },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image/upload", (req, res) => {
    upload(req, res, (err) => {

        if (err) {
            console.log(err)
            res.status(400).json({ success: false });
        }
        else {
            res.status(200).json({ success: true, filePath : res.req.file});
            
        }
    });
    

});



module.exports = router