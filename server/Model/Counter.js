const mongoose = require('mongoose');
//몽구스 모델 만들기- 서버에 데이터를 저장하기위해
const CounterSchema = new mongoose.Schema({
    title :String,
    postNum : Number,

},{collection:"counter"});//콜렉션이름 정해줄 수 있음

//model 함수에선 기본적으론 두개의 파라미터를 필요로합니다. 첫번째는 파라미터는 해당 스키마의 이름이고, 두번째는 스키마 객체입니다. 스키마의 이름을 정해주면, 이의 복수형태로 컬렉션이름을 만들어줍니다.
const Counter = mongoose.model('Counter', CounterSchema); //model()은 스키마를 통해서 만드는 인스턴스

module.exports = {Counter};//export해줘야 index.js에서 사용가능