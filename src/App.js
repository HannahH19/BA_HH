import React, {useContext} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Menu from "./menu";
import "./App.css";
import Startpage from './StartPage';




function App() {

  return (
    <div className="App">
      <Menu></Menu>
      <Routes>
        <Route path="/" element={<Startpage></Startpage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
