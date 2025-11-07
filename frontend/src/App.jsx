import React from 'react';
import {ToastContainer} from "react-toastify";
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import AllNotes from './pages/AllNotes';
import SingleNote from './pages/SingleNote';
import RegisterLogin from './pages/RegisterLogin';

const App = () => {
  return (
    <div>
      <ToastContainer/>

      <Routes>
        <Route path='/' element={<RegisterLogin/>}/>
        <Route path='/create-note' element={<Home/>}/>
        <Route path='/notes' element={<AllNotes/>}/>
        <Route path='/notes/:id' element={<SingleNote/>}/>
      </Routes>
      
    </div>
  )
}

export default App
