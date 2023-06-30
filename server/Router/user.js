const express = require('express')
const router = express.Router()

const {User} = require('../Model/User');
const {Counter} =require('../Model/Counter');
const multer  = require('multer');

router.post("/register", (req, res) => {
    let temp = req.body;
    Counter.findOne({ name: "counter" })
        .then((doc) => {
        temp.userNum = doc.userNum;
        const userData = new User(temp);
        userData.save().then(() => {
            Counter.updateOne({ name: "counter" }, { $inc: { userNum: 1 } }).then(
            () => {
                res.status(200).json({ success: true });
            }
        );
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({ success: false });
    });
});

router.post("/namecheck",(req, res) => {
    User.findOne({displayName: req.body.displayName}).exec().then((user) => {
        let check = true;
        if (user) {
            check = false;
        }
        res.status(200).json({ success: true, check });
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ success: false });
    });
})

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


router.post("/profile/img",(req, res) => {
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


router.post("/profile/update", (req, res) => {
let temp = {
    photoURL: req.body.photoURL,
};
User.updateOne({ uid: req.body.uid }, { $set: temp })
    .exec()
    .then(() => {
    res.status(200).json({ success: true });
    })
    .catch((err) => {
    res.status(400).json({ success: false });
    });
});

module.exports= router