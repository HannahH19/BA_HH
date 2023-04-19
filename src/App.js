import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Menu from './Menu';
import './Styles/App.css';
import Startpage from './HomePage';
import Beitragpage, { AddBeitragForm } from './Beitrag';
import Beitragpage_edit from './Editor';
import { ToastContainer } from 'react-toastify';
import Beitrag_form from './BeitragForm';
import { db } from './db';
import Suche from './Suche';
import AlleBeitraege from './AlleBeitraege';

function App() {
  const [user, setUser] = useState(sessionStorage.getItem('Nutzer'));

  //Nutzer mit Daten aus Datenbank holen
  //Wenn Daten richtig, dann wird Nutzer eingeloggt und kann Seite nutzen
  async function checkNutzerData(nutzername, passwort) {
    if (nutzername === '' || passwort === '') {
      alert('Bitte geben Sie ihre Anmeldedaten ein');
      return
    }
    try {
      const nutzer = await db.benutzer.where({ name: nutzername, passwort: passwort }).first();
      if (nutzer) {
        sessionStorage.setItem('Nutzer', JSON.stringify(nutzer));
        setUser(nutzer);
      } else {
        alert('Nutzername oder Passwort ist falsch!');
      }
    } catch (error) {

    }
  }

  if (!user) {
    return (
      <div className="login_overlay">
        <div className="login_form">
          <label>Name</label>
          <input type="text" id="nutzername"></input>
          <label>Passwort</label>
          <input type="password" id="passwort"></input>
          <button className="open" onClick={() => { checkNutzerData(document.querySelector('#nutzername').value, document.querySelector('#passwort').value) }}>Anmelden</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Menu></Menu>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Startpage></Startpage>}></Route>
        <Route path="/beitrag/:id" element={<Beitragpage></Beitragpage>}></Route>
        <Route path="/beitrag/:id/edit" element={<Beitragpage_edit action="edit"></Beitragpage_edit>}></Route>
        <Route path="/beitrag_neu" element={<Beitrag_form action="add"></Beitrag_form>}></Route>
        <Route path='/suche' element={<Suche></Suche>}></Route>
        <Route path='/alleBeitraege' element={<AlleBeitraege></AlleBeitraege>}></Route>
      </Routes >
    </div >
  );

}
export default App;
