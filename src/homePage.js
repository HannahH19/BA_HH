import Top from "./Top";
import TeaserList from "./Teaser";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

function Startpage() {
  //Rolle des Nutzers
  const editor = JSON.parse(sessionStorage.getItem('Nutzer')).editor;

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
  const zuletztGeloeffnetList = JSON.parse(sessionStorage.getItem('Nutzer')).letzte_beitraege;
  const beitragList = useLiveQuery(
    async () => {
      const beitrag = await db.beitrag
        .where('id')
        .anyOf(zuletztGeloeffnetList)
        .toArray();
      return beitrag;
    }
  );

  //Liste der drei zuletzt geöffneten Beiträge, nicht nach Öffnungszeitraum sortiert
  return (
    <div>
      {beitragList && beitragList.length > 0 && <TeaserList beitraege={beitragList} heading="Zuletzt geöffnete Beiträge"></TeaserList>}
    </div>
  )
}

function KontrollBeitraege() {
  const nameNutzer = JSON.parse(sessionStorage.getItem('Nutzer')).name;
  const datum = new Date();
  const tag = String(datum.getDate()).padStart(2, '0');
  const monat = String(datum.getMonth() + 1).padStart(2, '0');
  const jahr = datum.getFullYear();
  //Datum von Heute für Prüfunf, welcher Beitrag sein Kontrolldatum überschritten hat
  const datumHeute = String(jahr) + '-' + String(monat) + '-' + String(tag);


  //Alle Beiträge mit Datum kleiner gleich Autor aus Datenbank holen und nach richtigem Autor filtern
  const beitragList = useLiveQuery(
    async () => {
      const beitrag = await db.beitrag
        .where('kontrolldatum')
        .belowOrEqual(datumHeute)
        .and(beitrag => beitrag.autor === nameNutzer)
        .toArray();
      return beitrag;
    }
  );

  return (
    <div>
      {beitragList && beitragList.length > 0 && <TeaserList beitraege={beitragList} heading="Zu prüfende Beiträge" kontrolldatum={true}></TeaserList>}
    </div>
  )

}