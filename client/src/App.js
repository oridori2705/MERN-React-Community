import { Routes, Route } from 'react-router-dom';
import './App.css';
import { List } from './Components/Post/List';
import { Upload } from './Components/Post/Upload';
import { Heading } from './Components/Heading';
import { Detail } from './Components/Post/Detail';
import { Edit } from './Components/Post/Edit';
import Login from './Components/User/Login';
import Register from './Components/User/Register';

function App() {

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/Upload" element={<Upload />}></Route>
        <Route path="/post/:postNum" element={<Detail />}></Route>
        <Route path='/edit/:postNum' element={<Edit />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </>

  );
}

export default App;
