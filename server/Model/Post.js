const mongoose = require('mongoose');
//몽구스 모델 만들기- 서버에 데이터를 저장하기위해
const PostSchema = new mongoose.Schema({
    title :String,
    content : String,
    postNum: Number,
    image : String,
    author :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    repleNum: {
        type: Number,
        default: 0,
    },

},{collection:"Posts", timestamps: true});//콜렉션이름 정해줄 수 있음

const Post = mongoose.model('Post', PostSchema );

module.exports = {Post};//export해줘야 index.js에서 사용가능