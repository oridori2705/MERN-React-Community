import { Routes, Route } from 'react-router-dom';
import './App.css';
import { List } from './Components/Post/List';
import { Upload } from './Components/Post/Upload';
import { Heading } from './Components/Heading';
import { Detail } from './Components/Post/Detail';
function App() {

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/Upload" element={<Upload />}></Route>
        <Route path="/post/:postNum" element={<Detail />}></Route>
      </Routes>
    </>

  );
}

export default App;
