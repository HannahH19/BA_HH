import Top from "./Top";
import TeaserList from "./Teaser";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import { useState } from "react";

function Startpage() {
  //Rolle des Nutzers
  const nutzer = JSON.parse(sessionStorage.getItem('Nutzer'));
  const editor = nutzer.editor;

  return (
    <main>
      <Top heading="EWS Wissen"></Top>
      <div className="content">
        {!editor && <Einarbeitungsleitfaden></Einarbeitungsleitfaden>}
        {editor && <KontrollBeitraege></KontrollBeitraege>}
        <ZuletzGeoeffnet></ZuletzGeoeffnet>
      </div>
    </main>
  );
}


export default Startpage;

function Einarbeitungsleitfaden() {
  return (
    <div className="einarbeitung_teaser">
      <div className="teaser">
        <h4>
          <a href={`/leitfaden`}>Leitfaden</a>
        </h4>
        <p>In diesem Leitfaden finden Sie alle relevanten Information und Abläufe für ihren Arbeitsalltag</p>
      </div>
    </div>
  )
}

function ZuletzGeoeffnet() {
  const [beitragList, setBeitragList] = useState([]);
  const zuletztGeoeffnetList = JSON.parse(sessionStorage.getItem('Nutzer')).letzte_beitraege;

  async function getBeitragList(zuletztGeoeffnetList) {
    try {
      const beitrag = await db.beitrag
        .where('id')
        .anyOf(zuletztGeoeffnetList)
        .toArray();
      setBeitragList(beitrag);
    } catch {

    }
  }

  getBeitragList(zuletztGeoeffnetList);

  //Liste der drei zuletzt geöffneten Beiträge, nicht nach Öffnungszeitraum sortiert
  return (
    <div>
      {beitragList && beitragList.length > 0 && <TeaserList beitraege={beitragList} heading="Zuletzt geöffnete Beiträge"></TeaserList>}
    </div>
  )
}

function KontrollBeitraege() {
  const [beitragList, setBeitragList] = useState([]);
  const nameNutzer = JSON.parse(sessionStorage.getItem('Nutzer')).name;
  const datum = new Date();
  const tag = String(datum.getDate()).padStart(2, '0');
  const monat = String(datum.getMonth() + 1).padStart(2, '0');
  const jahr = datum.getFullYear();
  //Datum von Heute für Prüfunf, welcher Beitrag sein Kontrolldatum überschritten hat
  const datumHeute = String(jahr) + '-' + String(monat) + '-' + String(tag);

  //Alle Beiträge mit Datum kleiner gleich Autor aus Datenbank holen und nach richtigem Autor filtern
  async function getBeitragList(datumHeute, nameNutzer) {
    try {
      const beitrag = await db.beitrag
        .where('kontrolldatum')
        .belowOrEqual(datumHeute)
        .and(beitrag => beitrag.autor === nameNutzer)
        .toArray();
      setBeitragList(beitrag);
    } catch {

    }
  }

  getBeitragList(datumHeute, nameNutzer);

  console.log({beitragList})
  return (
    <div>
      {beitragList && beitragList.length > 0 && <TeaserList beitraege={beitragList} heading="Zu prüfende Beiträge" kontrolldatum={true}></TeaserList>}
    </div>
  )

}