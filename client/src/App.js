import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { List } from './Components/List';
import { Upload } from './Components/Upload';
import { Heading } from './Components/Heading';
function App() {
  const [content, setContent] = useState("")
  return (
    <>
      <Heading />
      <Routes>
        <Route path="/List" element={<List content={content} setContent={setContent} />}></Route>
        <Route path="/Upload" element={<Upload content={content} setContent={setContent} />}></Route>
      </Routes>
    </>

  );
}

export default App;
