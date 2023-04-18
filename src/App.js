import React from 'react';
import { Routes, Route } from "react-router-dom";
import Menu from "./menu";
import './Styles/App.css';
import Startpage from './homePage';
import Beitragpage, { AddBeitragForm } from './beitrag';
import Beitragpage_edit from './editor';
import { ToastContainer } from 'react-toastify';
import Beitrag_form from './beitrag_form';
import LoginOverlay from './login_overlay';

function App() {

  return (
    <div>
        <Menu></Menu>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Startpage></Startpage>}></Route>
          <Route path="/beitrag/:id" element={<Beitragpage></Beitragpage>}></Route>
          <Route path="/beitrag/:id/edit" element={<Beitragpage_edit action="edit"></Beitragpage_edit>}></Route>
          <Route path="/beitrag_neu" element={<Beitrag_form action="add"></Beitrag_form>}></Route>
        </Routes >
    </div >
  );
}

export default App;
